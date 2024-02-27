const jwt = require("jsonwebtoken")
require("dotenv").config()
const authModel = require("../schemas/authSchema")
const bcrypt = require("bcrypt")

// TODO : Check if a user exists
const ifUserExists = async (userEmail, _userPassword) => {
    try {
        // By default we don't return password to code, so explicitely doing it
        const user = await authModel.findOne({ userEmail }).select('+userPassword')
        const isPasswordCorrect = await bcrypt.compare(_userPassword, user.userPassword)
        if (user && user._id && isPasswordCorrect) {
            return true
        } else {
            return false
        }
    } catch {
        return false
    }
}

// TODO : Generate Token
const generateToken = async (userName) => {
    const token = jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION })
    return {
        "accessToken": token
    }
}

// TODO : Register User
const registerUser = async (userName, _userPassword, userEmail) => {
    try {
        //! Check if user already exists
        const searchedUser = await authModel.findOne({ userEmail })
        if (searchedUser && searchedUser._id) {
            return false
        } else {
            const hash = await bcrypt.hash(_userPassword, parseInt(process.env.SALT_WORK_FACTOR))
            const userPassword = hash;
            await authModel.create({ userName, userPassword, userEmail })
            const user = await authModel.findOne({ userName, userPassword, userEmail })
            return user
        }

    } catch (e) {
        return false
    }
}

// TODO : Get One User
const fetchOneUser = async (userEmail) => {
    const user = await authModel.findOne({ userEmail })
    return user.userName
}

module.exports = {
    ifUserExists, generateToken, registerUser, fetchOneUser
}