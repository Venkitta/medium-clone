import { selectorFamily } from "recoil";
import { blogCacheAtom } from "../atoms/blogCacheAtom";
import type { Blog } from "../../src/hooks";

export const blogByIdSelector = selectorFamily<Blog | null, string>({
    key: "blogByIdSelector",
    get: (blogId: string) => async ({ get }) => {
        console.log("Fetching blog with ID:", blogId);
        const cache = get(blogCacheAtom);
        
        if (cache[blogId]){
            console.log("Found in cache");
            return cache[blogId]
        }
    console.log("Fetching from API");
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {};

    if (token) {
        headers.Authorization = token;
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${blogId}`, {
        headers
    });

    const data = await res.json();

    return data.blog;
    }
});