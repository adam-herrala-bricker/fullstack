import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const userID = newObject.id

  const response = await axios.put(`${baseUrl}/${userID}`, newObject, config)
  return response.data
}

const erase = async (blogToRemove) => {
  const config = {
    headers: { Authorization: token },
  }

  const blogID = blogToRemove.id

  const response = await axios.delete(`${baseUrl}/${blogID}`, config)
  return response

}

export default { getAll, create, setToken, update, erase }