const express = require("express");
const {
    createTaskController,
    fetchAllTasksController,
    fetchOneTaskController,
    updateOneTaskController,
    deleteOneTaskController
} = require("../controllers/todoController");

const router = express.Router();

// ! Create a task
router.post("/create", createTaskController);

//! Fetch all tasks
router.get("/all", fetchAllTasksController);

// ! Fetch 1 task by Id
router.get("/detail/:id", fetchOneTaskController);

// ! Update 1 task by Id
router.patch("/update/:id", updateOneTaskController);

// ! Delete 1 task by Id
router.delete("/delete/:id", deleteOneTaskController);


module.exports = router;
