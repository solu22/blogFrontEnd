import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObj) => {

  const response = await axios.post(baseUrl, blogObj, config)
  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const update = async(blodId, blogObj) => {
  const response = await axios.put(`${baseUrl}/${blodId}`, blogObj, config)
  return response.data
}


export default { getAll, create, setToken,update, remove }