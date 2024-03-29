import * as tokenService from "./tokenService"

//http://localhost:3001/api/blogs
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/blogs`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (id) => {
  try {
    //GET localhost/3001/api/blog/:id
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (blogData) => {
  try {
    //POST LOCALHOST:3001/api/blogs
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (blogData) => {
  try {
    const res = await fetch(`${BASE_URL}/${blogData._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export { index, show, create, update, deleteBlog as delete }
