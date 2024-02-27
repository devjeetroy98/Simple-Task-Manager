const todoService = require("../services/todoService");

// TODO: Function to create a task
async function createTaskController(req, res) {
    const { taskName, taskDescription } = req.body;
    try {
        const response = await todoService.createFunction(
            taskName,
            taskDescription,
            req.user
        );
        res.status(201);
        res.json({
            message: "Success",
            response,
        });
    } catch (e) {
        res.status(500);
        res.json({
            message: "Failure",
            error: e,
        });
    }
}

// TODO: Function to fetch all tasks
async function fetchAllTasksController(req, res) {
    try {
        const data = await todoService.findAllFunction(req.user);
        res.status(200);
        res.json({
            message: "Success",
            response: data ? data : [],
        });
    } catch (e) {
        res.status(500);
        res.json({
            message: "Failure",
            error: e,
        });
    }
}

// TODO: Function to fetch a task by its id
async function fetchOneTaskController(req, res) {
    const _id = req.params.id;
    try {
        const data = await todoService.findOneByIdFunction(_id, req.user);
        res.status(200);
        res.json({
            message: "Success",
            response: data ? data : {},
        });
    } catch (e) {
        res.status(500);
        res.json({
            message: "Failure",
            error: e,
        });
    }
}

// TODO : Function to update a task by its id
async function updateOneTaskController(req, res) {
    const { taskName, taskDescription } = req.body
    const _id = req.params.id
    try {
        const response = await todoService.updateOneFunction(_id, taskName, taskDescription, req.user)
        res.status(200)
        res.json({
            message: "Success",
            response
        })
    } catch (e) {
        res.status(500)
        res.json({
            message: "Failure",
            error: e
        })
    }
}

// TODO: Function to delete a task by its id
async function deleteOneTaskController(req, res) {
    const _id = req.params.id;
    try {
        const response = await todoService.deleteOneFunction(_id, req.user);
        res.status(200)
        res.json({
            message: "Success",
            response,
        });
    } catch (e) {
        res.status(500)
        res.json({
            message: "Failure",
            error: e,
        });
    }
}

module.exports = {
    createTaskController,
    fetchAllTasksController,
    fetchOneTaskController,
    updateOneTaskController,
    deleteOneTaskController
};
