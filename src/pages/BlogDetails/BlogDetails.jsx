import { useState, useEffect } from "react"

import { Link, useParams } from "react-router-dom"

import styles from "./BlogDetails.module.css"

import Loading from "../Loading/Loading"
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo"

import * as blogService from "../../services/blogService"

const BlogDetails = (props) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      const data = await blogService.show(id)
      setBlog(data)
    }
    fetchBlog()
  }, [id])

  if (!blog) return <Loading />

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>
            {blog.category.toUpperCase()}
            <h1>{blog.title}</h1>
          </h3>
          <span>
            <AuthorInfo content={blog} />
            {/* when && the last truthy value is returned */}
            {blog.author._id === props.user.profile && (
              <>
                <Link to={`/blogs/${id}/edit`} state={blog}>
                  Edit
                </Link>
                <button onClick={() => props.handleDeleteBlog(id)}>
                  Delete
                </button>
              </>
            )}
          </span>
        </header>
        <p>{blog.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
      </section>
    </main>
  )
}

export default BlogDetails
