import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken)=> {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blogObj)=>{
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, blogObj, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }