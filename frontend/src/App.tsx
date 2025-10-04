import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Appbar } from "./components/Appbar"
import { Blog } from "./pages/Blog";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish"
import { Suspense } from "react"
import { UserBlogSkeleton } from "./components/UserBlogSkeleton"

function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/signin" element = {<Signin />} />
          <Route path = "/blog/:id"
             element = {
              <Suspense fallback={
                <div>
                  <Appbar />
                  <div className="flex justify-center">
                    <UserBlogSkeleton />
                  </div>
                </div>
              }>
                <Blog />
              </Suspense>} />
          <Route path = "/blogs" element = {<Blogs />} />
          <Route path = "/publish" element = {<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App