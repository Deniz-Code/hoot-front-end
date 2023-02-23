// npm modules
import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

// Page components
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Logout from "./pages/Logout/Logout"
import Landing from "./pages/Landing/Landing"
import Profiles from "./pages/Profiles/Profiles"
import ChangePassword from "./pages/ChangePassword/ChangePassword"
import BlogList from "./pages/BlogList/BlogList"
import BlogDetails from "./pages/BlogDetails/BlogDetails"
import NewBlog from "./pages/NewBlog/NewBlog"
import EditBlog from "./pages/EditBlog/EditBlog"
// Components
import NavBar from "./components/NavBar/NavBar"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

// Services
import * as authService from "./services/authService"
import * as blogService from "./services/blogService"

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())
  const [blogs, setBlogs] = useState([])

  const handleLogout = () => {
    setUser(null)
    authService.logout()
    navigate("/logout")
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const data = await blogService.index()
      setBlogs(data)
    }
    if (user) fetchAllBlogs()
  }, [user])

  const handleAddBlog = async (blogData) => {
    const newBlog = await blogService.create(blogData)
    setBlogs([newBlog, ...blogs])
    navigate("/blogs")
  }

  const handleUpdateBlog = async (blogData) => {
    const updatedBlog = await blogService.update(blogData)
    const updatedBlogsData = blogs.map((blog) => {
      return blogData._id === blog.id ? updatedBlog : blog
    })
    setBlogs(updatedBlogsData)
    navigate("/blogs")
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute user={user}>
              <BlogList blogs={blogs} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute user={user}>
              <BlogDetails user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/new"
          element={
            <ProtectedRoute user={user}>
              <NewBlog handleAddBlog={handleAddBlog} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <EditBlog handleUpdateBlog={handleUpdateBlog} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
