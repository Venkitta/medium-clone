export const UserBlogSkeleton = () => {
    return <div role="status" className="max-w-screen-xl animate-pulse">
        <div className="grid grid-cols-12 px-10 pt-10 w-screen max-w-screen-xl">
                        <div className="col-span-8">
                            <div className="text-5xl font-extrabold">
                                <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                            </div>
                            <div className="text-slate-500 pt-2">
                                <div className="h-1 w-50 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="pt-4">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                        </div>
                        <div className="col-span-4 pl-10">
                            <div className="text-slate-600 text-lg">
                                <div className="h-1 bg-gray-200 rounded-full w-10 mb-2.5"></div>
                            </div>
                            <div className="flex">
                                <div className="pr-4 flex flex-col justify-center">
                                    <div className="h-10 w-10 bg-gray-200 rounded-full mb-2.5"></div>
                                </div>
                                <div>
                                    <div className="h-2 w-25 bg-gray-300 rounded-full mb-2.5"></div>
                                    <div className="h-1 w-50 bg-gray-200 rounded-full mb-2.5"></div>
                                    <div className="h-1 w-50 bg-gray-200 rounded-full mb-2.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
    <span className="sr-only">Loading...</span>
</div>
}