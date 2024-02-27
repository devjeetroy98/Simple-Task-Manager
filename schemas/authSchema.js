const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    userPassword: {
        type: String,
        require: true,
        select: false
    },
    userEmail: {
        type: String,
        require: true,
        unique: true
    },
}, {
    timestamps: true
})

const authModel = new mongoose.model("authModel", authSchema)

module.exports = authModel;