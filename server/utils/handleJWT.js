const jwt = require("jsonwebtoken")
const jwt_key = "asdajkhkl123"
// const jwt_key = process.env.jwt_secret
const tokenSign = async(user, time) => {
    console.log("User jwt_key:", user, jwt_key)
    return jwt.sign(user, jwt_key, { expiresIn: time })
}

const tokenVerify = async(token) => {
    try {
        return jwt.verify(token, jwt_key)
    } catch (error) {
        return error
    }
}

module.exports = { tokenSign, tokenVerify }