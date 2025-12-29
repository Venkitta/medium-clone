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
            console.error("Signup error:", e);

            if (axios.isAxiosError(e)) {
                alert(e.response?.data?.message || "Axios error occurred");
            } else {
                alert("Unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    }

    return <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
                    <div className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-center">
                        {type === "signup" ? "Create an account" : "Welcome back"}
                    </div>
                    <div className="text-base sm:text-xl text-center text-slate-400 mt-2 px-2">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="pl-2 underline" to = {type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
            </div>
                <div className="space-y-4">
                    {type === "signup" ? <LabelledInput label= "Name" placeholder="John Smith" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}

                    <LabelledInput label= "Username" placeholder={type === "signin" ? "Try - anas@gmail.com" : "johnsmith@gmail.com"} onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />

                    <LabelledInput label= "Password" type = {"password"} placeholder={type === "signin" ? "Try - 123456789" : "Enter your password"} onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={sendRequest}
                     type="button" 
                     disabled={loading}
                     className="mt-6 sm:mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
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
        <label className="block mb-2 text-sm sm:text-md font-semibold text-black">{label}</label>
        <input onChange= {onChange} type= {type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}