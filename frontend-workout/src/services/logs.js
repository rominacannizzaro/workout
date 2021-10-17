import axios from 'axios'
const baseUrl = '/api/logs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, contactObject) => {
    const request = axios.put(`${baseUrl}/${id}`, contactObject)
    return request.then(response => response.data)
} 

export default { getAll, create, remove, update }
