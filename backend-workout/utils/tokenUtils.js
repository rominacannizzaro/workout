const jwt = require('jsonwebtoken')
const User = require('../models/user')


const getUserFromToken = async (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    return user
  }

module.exports = {
    getUserFromToken
}