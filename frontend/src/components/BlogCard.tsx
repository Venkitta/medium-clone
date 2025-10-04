import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 p-5 w-screen max-w-screen-xl cursor-pointer">
        <div className="flex items-center">
            <Avatar name = {authorName} size = "small" />
            <div className="font-extralight pl-2 text-xl flex justify-center flex-col">{authorName}.</div> 
            <div className="flex justify-center flex-col pl-2">
                <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-xl flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="text-2xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-xl font-thin pt-2">
            {content.slice(0,250) + "..."}
        </div>
        <div className="text-slate-600 text-xl font-thin pt-4">
            {`${Math.ceil(content.length/200)} min read`}
        </div>
    </div>
</Link>

}

export function Avatar({name, size = "small"}: {name: string, size: "small" | "big"}) {
   return <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-blue-700 rounded-full`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} text-white bg-blue-700 hover:bg-blue-800`}>{name[0].toUpperCase()}</span>
    </div>
    }

export function Circle (){
    return <div className="w-1 h-1 rounded-full bg-slate-400">

    </div>
}