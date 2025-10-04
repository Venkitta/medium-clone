import { Link, Navigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { blogByIdSelector } from "../../recoil/selectors/blogByIdSelector"
import { blogCacheAtom } from "../../recoil/atoms/blogCacheAtom";
import { useEffect } from "react";
import { FullBlog } from "../components/FullBlog.tsx";
import { Appbar } from "../components/Appbar";

export const Blog = () =>{
    const {id} = useParams();

    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    const blog = useRecoilValue(blogByIdSelector(id || ""));
    const [cache, setCache] = useRecoilState(blogCacheAtom);
    

    useEffect(() => {

        if (id && blog && !cache[id]) {

            setCache({
        ...cache,
        [id]: blog,
      });

    }
  }, [id, blog]);

    if (!blog) {
  return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
                    <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
                    <Link to="/blogs" className="text-blue-600 hover:text-blue-800 underline">
                        Back to Blogs
                    </Link>
                </div>
            </div>
        </div>
    );
}

return (
  <div>
    <FullBlog blog={blog}/>
  </div>
);
} 