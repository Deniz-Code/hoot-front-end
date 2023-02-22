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

export { index }
