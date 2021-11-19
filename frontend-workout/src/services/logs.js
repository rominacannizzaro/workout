import axios from 'axios'
const baseUrl = '/api/logs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    // include the token in the request header before making the request to backend
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, contactObject) => {
    const request = axios.put(`${baseUrl}/${id}`, contactObject)
    return request.then(response => response.data)
} 

export default { getAll, create, remove, update, setToken }
