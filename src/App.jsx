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

// Components
import NavBar from "./components/NavBar/NavBar"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

// Services
import * as authService from "./services/authService"
import * as blogService from "./services/blogService"

const App = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())

  const handleLogout = () => {
    setUser(null)
    authService.logout()
    navigate("/logout")
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
const fetchAllBlogs=async()=>{
  const data= await blogService.index()
  console.log(data);
}
fetchAllBlogs()
  },[])

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
              <BlogList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
