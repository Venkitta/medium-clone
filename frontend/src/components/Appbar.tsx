import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useEffect, useState } from "react"

export const Appbar = () => {
    const [name, setName] = useState("A")
    const [loaded, setLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const signOutUser = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const updateName = () => {
            const signedInUser = localStorage.getItem("name");
            setName(signedInUser || "U");
        };

        updateName();
        setLoaded(true);

        window.addEventListener('localStorageUpdated', updateName);

        return () => {
            window.removeEventListener('localStorageUpdated', updateName);
        };
    },[])

    if(!loaded){
        return null;
    }

    return <div className="border-b border-b-gray-200 shadow-md flex justify-between px-10 py-4 ">
        <Link to={'/blogs'} className="flex flex-col justify-center">
                <span className="cursor-pointer text-2xl font-semibold">Medium™</span>
        </Link>
        <div>
            <Link to={`/publish`} className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New
            </Link>
            <button type="button" onClick={() => {setShowMenu(!showMenu)}} className="cursor-pointer">
                <Avatar size={"big"} name={name} />
            </button>

            {showMenu && (
                <div className="absolute right-0 m-2 z-10 bg-white border border-gray-400 divide-y divide-gray-100 rounded-lg shadow-md w-44">
                        <ul className="py-2 text-sm text-gray-700">
                            <li>
                                <Link to={"/blogs"} className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                            </li>
                            <li>
                                <Link to={"/signin"} onClick={signOutUser} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</Link>
                            </li>
                        </ul>
                </div>
                    )}
        </div>
    </div>
}