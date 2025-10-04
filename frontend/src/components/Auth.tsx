import { Link, useNavigate } from "react-router-dom"
import { useState, type ChangeEvent } from 'react'
import type { SignupInput }  from "@venkitta/medium_common"
import axios from "axios";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "", 
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);

    async function sendRequest() {
        setLoading(true);
        try{
            const response = await  axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            localStorage.setItem("name", postInputs.name || postInputs.username);
            window.dispatchEvent(new Event('localStorageUpdated'));
            navigate("/blogs");    
        } catch (e) {
            alert("Error while signing up")
        } finally {
            setLoading(false);
        }
    }

    return <div className="h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center">
            <div className="min-w-md mx-10">
            <div className="px-10 flex flex-col items-center justify-center">
                    <div className="text-4xl xl:text-5xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-xl text-center text-slate-400 mt-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to = {type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
            </div>
                <div className="pt-7">
                    {type === "signup" ? <LabelledInput label= "Name" placeholder="John Smith" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}

                    <LabelledInput label= "Username" placeholder="johnsmith@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />

                    <LabelledInput label= "Password" type = {"password"} placeholder="Enter your password" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest}
                     type="button" 
                     disabled={loading}
                     className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        {loading ? (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />): 
                        (type === "signup" ? "Sign up" : "Sign in"
                        )}
                    </button>
                    </div>
                </div>
            </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}:LabelledInputType) {
    return <div>
        <label className="block mb-2 text-md font-semibold text-black pt-2">{label}</label>
        <input onChange= {onChange} type= {type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}