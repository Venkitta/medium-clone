import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: {blog?: Blog}) => {

    if(!blog) 
        return <div>Blog does not exist</div>;

    return <div className="min-h-screen bg-gray-50">
        <Appbar />
        <article className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 py-8 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                            {blog.title}
                        </h1>
                        <time className="block text-sm text-gray-500 mt-3">
                           Posted on {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    })}
                        </time>
                        <div className="prose prose-lg max-w-none mt-8 text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {blog.content}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            About the Author
                        </h2>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Avatar name={blog.author.name} size="big" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {blog.author.name || "Anonymous"}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Passionate writer sharing insights and stories that resonate with readers."
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    </div>
}