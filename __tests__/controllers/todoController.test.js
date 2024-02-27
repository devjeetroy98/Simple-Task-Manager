const {
    createTaskController,
    fetchAllTasksController,
    fetchOneTaskController,
    updateOneTaskController,
    deleteOneTaskController,
} = require("../../controllers/todoController");
const {
    createFunction,
    findAllFunction,
    findOneByIdFunction,
    updateOneFunction,
    deleteOneFunction,
} = require("../../services/todoService");


jest.mock("../../services/todoService")

let request
let response

describe("Task Routes: ", () => {

    beforeEach(() => {
        request = {
            params: {
                id: "65d9f7951fe113d1c77b01e4"
            },
            user: "John Doe",
            body: {
                "taskName": "Play Forza Horizon 5",
                "taskDescription": "Play games in PS5"
            }
        }

        response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        }
    });

    it("[Create Task] should create a task and return status 201", (async () => {

        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        createFunction.mockImplementationOnce(() => dummyResponse)

        // Act
        await createTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(201)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": dummyResponse
        })

    }))


    it("[Create Task] should not create a task and return status 500", (async () => {

        // Arrange
        const dummyResponse = {}
        createFunction.mockImplementationOnce(() => { throw dummyResponse })

        // Act
        await createTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Failure",
            "error": dummyResponse
        })

    }))


    it("[Fetch All Tasks - With Data] should fetch all tasks and return status 200", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        findAllFunction.mockImplementationOnce(() => [dummyResponse])

        // Act
        await fetchAllTasksController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": [dummyResponse]
        })
    }))

    it("[Fetch All Tasks - Without Data] should fetch all tasks and return status 200", (async () => {
        // Arrange
        const dummyResponse = undefined
        findAllFunction.mockImplementationOnce(() => dummyResponse)

        // Act
        await fetchAllTasksController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": []
        })
    }))


    it("[Fetch All Tasks] should throw error and return status 500", (async () => {
        // Arrange
        const dummyResponse = {}

        findAllFunction.mockImplementationOnce(() => { throw dummyResponse })

        // Act
        await fetchAllTasksController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Failure",
            "error": dummyResponse
        })
    }))


    it("[Fetch One Task - With Data] should fetch one task by id and return status 200", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        findOneByIdFunction.mockImplementationOnce(() => dummyResponse)

        // Act
        await fetchOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": dummyResponse
        })
    }))

    it("[Fetch One Task - Without Data] should fetch one task by id and return status 200", (async () => {
        // Arrange
        const dummyResponse = undefined
        findOneByIdFunction.mockImplementationOnce(() => dummyResponse)

        // Act
        await fetchOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": {}
        })
    }))

    it("[Fetch One Task] should not fetch one task by id and return status 500", (async () => {
        // Arrange
        const dummyResponse = {}

        findOneByIdFunction.mockImplementationOnce(() => { throw dummyResponse })

        // Act
        await fetchOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Failure",
            "error": dummyResponse
        })
    }))


    it("[Update One Task] should update & fetch one task by id and return status 200", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        updateOneFunction.mockImplementationOnce(() => dummyResponse)

        // Act
        await updateOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": dummyResponse
        })
    }))


    it("[Update One Task] should not update & fetch one task by id and return status 500", (async () => {
        // Arrange
        const dummyResponse = {}

        updateOneFunction.mockImplementationOnce(() => { throw dummyResponse })

        // Act
        await updateOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Failure",
            "error": dummyResponse
        })
    }))


    it("[Delete One Task] should delete & fetch one task by id and return status 200", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        deleteOneFunction.mockImplementationOnce(() => dummyResponse)

        // Act
        await deleteOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Success",
            "response": dummyResponse
        })
    }))


    it("[Delete One Task] should not delete & fetch one task by id and return status 500", (async () => {
        // Arrange
        const dummyResponse = {}
        deleteOneFunction.mockImplementationOnce(() => { throw dummyResponse })

        // Act
        await deleteOneTaskController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith({
            "message": "Failure",
            "error": dummyResponse
        })
    }))
})