import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const EditBlog = () =>{
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlog(){
            try{
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token") || "",
                        },
                    }
                )
                setTitle(res.data.blog.title);
                setContent(res.data.blog.content)
            } catch (e) {
                alert("Unable to fetch blog")
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
    }, [id])

    async function updateBlog() {
        try{
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
                {
                    id: Number(id),
                    title,
                    content,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    }
                }
            )
            navigate(`/blog/${id}`)
        } catch (e){
            alert("Update failed")
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

            <input
                className="w-full border p-2 mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="w-full border p-2 mb-4 h-60"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                onClick={updateBlog}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Update Blog
            </button>
        </div>
    )
}