import { useState } from "react"
import type { ChangeEvent } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handlePublish = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing post:", error);
            setLoading(false);
        }
    };

    return <div className="min-h-screen bg-gray-50"> 
        <Appbar />
        <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-10">
            <div className="max-w-screen-lg w-full">
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">

                            Create a new post

                        </h1>
                        <input onChange={(e) => {
                            setTitle(e.target.value)
                        }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 sm:p-4 mb-4" placeholder="Title" />
                        <TextEditor onChange={(e) => {
                            setDescription(e.target.value)}}/>
                <div className="flex justify-end mt-4">     
                        <button onClick={handlePublish} type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Publishing...
                                            </>
                                        ) : (
                                            "Publish post"
                                        )}
                        </button>
                    </div>
                </div>
            </div>    
        </div>
    </div>
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
                <div className="w-full mb-4 border border-gray-300">
                    <div className=" bg-white rounded-b-lg">
                        <label htmlFor="editor" className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="py-2 block w-full px-0 pl-2 text-sm text-gray-800 bg-white border-0 focus:outline-none" placeholder="Write an article..." required />
                    </div>
                </div>
             </div>
}