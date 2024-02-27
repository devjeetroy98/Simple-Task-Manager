const TodoModel = require("../schemas/todoSchema")

/**
 * 
 * @param {string} taskName 
 * @param {string} taskDescription 
 * @param {string} taskAuthor 
 * @returns {Object} Created task
 */

const createFunction = async (taskName, taskDescription, taskAuthor) => {
    try {
        if (taskName && taskDescription && taskAuthor) {
            const serverResponse = await TodoModel.create({
                taskName, taskDescription, taskAuthor
            })
            return serverResponse
        } else {
            throw new Error("Something went wrong!")
        }
    } catch {
        throw new Error("Something went wrong!")
    }
}

/**
 * 
 * @param {string} taskAuthor 
 * @returns An array of tasks created by the taskAuthor
 */
const findAllFunction = async (taskAuthor) => {
    try {
        return await TodoModel.find({ taskAuthor })
    } catch {
        throw new Error("Something went wrong!")
    }
}

/**
 * 
 * @param {ObjectId} _id 
 * @param {string} taskAuthor 
 * @returns A particular task
 */
const findOneByIdFunction = async (_id, taskAuthor) => {
    try {
        return await TodoModel.findOne({ _id, taskAuthor })
    } catch {
        throw new Error("Something went wrong!")
    }
}

/**
 * 
 * @param {ObjectId} _id 
 * @param {string} taskName 
 * @param {string} taskDescription 
 * @param {string} taskAuthor 
 * @returns The updated task
 */
const updateOneFunction = async (_id, taskName = null, taskDescription = null, taskAuthor = "") => {
    let payload = {}
    try {
        if (taskName || taskDescription) {
            if (taskName) {
                payload = { ...payload, taskName }
            }
            if (taskDescription) {
                payload = { ...payload, taskDescription }
            }
            let previousTask = await TodoModel.findOne({ _id })
            if (previousTask.taskAuthor === taskAuthor) {
                await TodoModel.findByIdAndUpdate(_id, payload)
                let serverResponse = await TodoModel.findOne({ _id, taskAuthor })
                return serverResponse
            } else {
                throw new Error("You are not authorized to perform this task.")
            }

        } else {
            throw new Error("Something went wrong!")
        }
    } catch (e) {
        throw new Error(e.message)
    }
}

/**
 * 
 * @param {ObjectId} _id 
 * @param {string} taskAuthor 
 * @returns The deleted task
 */
const deleteOneFunction = async (_id, taskAuthor) => {
    try {
        let previousTask = await TodoModel.findOne({ _id, taskAuthor })
        if (_id && previousTask._id) {
            const serverResponse = await TodoModel.findByIdAndDelete(_id)
            return serverResponse
        } else {
            throw new Error("Something went wrong!")
        }
    } catch {
        throw new Error("Something went wrong!")
    }
}

module.exports = { createFunction, findAllFunction, findOneByIdFunction, updateOneFunction, deleteOneFunction }