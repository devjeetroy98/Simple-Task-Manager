const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    taskName: {
        type: String,
        require: true
    },
    taskDescription: {
        type: String,
        require: true
    },
    taskAuthor: {
        type: String,
        require: true
    }
})

const TodoModel = mongoose.model("TodoModel", TodoSchema)

module.exports = TodoModel;