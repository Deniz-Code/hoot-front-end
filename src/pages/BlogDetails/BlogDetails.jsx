import { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import styles from "./BlogDetails.module.css"

import * as blogService from "../../services/blogService"

const BlogDetails = (props) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(()=>{
    const fetchBlog=async()=>{
      const data = await blogService.show(id)
      setBlog(data)
    }
    fetchBlog()
  },[id])

  return <main>Details</main>
}

export default BlogDetails
