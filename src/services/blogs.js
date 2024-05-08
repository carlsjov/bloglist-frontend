import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const blog = newBlog
  const config = {
    headers: { Authorization: token},
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const like = async likeBlog => {
  const id = likeBlog.id
  const url = baseUrl.concat(`/${id}`)
  const response = await axios.put(url, likeBlog)
  return response.data
}

const del = async deleteBlog => {
  const id = deleteBlog.id
  const url = baseUrl.concat(`/${id}`)
  const response = await axios.delete(url, deleteBlog)
  return response.data
}


export default { getAll, create, setToken, like, del }