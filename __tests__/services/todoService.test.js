const {
    createFunction,
    findAllFunction,
    findOneByIdFunction,
    updateOneFunction,
    deleteOneFunction,
} = require("../../services/todoService");
const TodoModel = require("../../schemas/todoSchema")

jest.mock("../../schemas/todoSchema")


describe("[Create Task] Testing", () => {

    afterEach(() => {
        TodoModel.create.mockClear()
    })


    it("should create a task and return it", (async () => {

        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.create = jest.fn().mockResolvedValueOnce(dummyResponse);

        // Act
        const serverResponse = await createFunction(dummyResponse.taskName, dummyResponse.taskDescription, dummyResponse.taskAuthor)

        // Arrange
        expect(serverResponse).toStrictEqual(dummyResponse)
        expect(TodoModel.create).toHaveBeenCalledTimes(1)
    }))

    it("should not create a task if task name is absent and return error", (async () => {

        // Arrange
        const dummyResponse = {
            "taskName": undefined,
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
        }

        try {
            // Act
            await createFunction(dummyResponse.taskName, dummyResponse.taskDescription, dummyResponse.taskAuthor)
        } catch (e) {
            // Assert
            expect(e.message).toEqual("Something went wrong!");
            expect(TodoModel.create).toHaveBeenCalledTimes(0)
        }
    }))


    it("should not create a task if task description is absent and return error", (async () => {

        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": undefined,
            "taskAuthor": "John Doe",
        }

        try {
            // Act
            await createFunction(dummyResponse.taskName, dummyResponse.taskDescription, dummyResponse.taskAuthor)
        } catch (e) {
            // Assert
            expect(e.message).toEqual("Something went wrong!");
            expect(TodoModel.create).toHaveBeenCalledTimes(0)
        }
    }))

    it("should not create a task if task author is absent and return error", (async () => {

        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": undefined,
        }

        try {
            // Act
            await createFunction(dummyResponse.taskName, dummyResponse.taskDescription, dummyResponse.taskAuthor)
        } catch (e) {
            // Assert
            expect(e.message).toEqual("Something went wrong!");
            expect(TodoModel.create).toHaveBeenCalledTimes(0)
        }
    }))
})




describe("[ Find all task ] Testing: ", () => {

    afterEach(() => {
        TodoModel.find.mockClear()
    })

    it("should return all the task created by the author", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.find = jest.fn().mockResolvedValueOnce([dummyResponse]);

        // Act
        const serverResponse = await findAllFunction(dummyResponse.taskAuthor)

        // Assert
        expect(serverResponse).toStrictEqual([dummyResponse])
        expect(TodoModel.find).toHaveBeenCalledTimes(1)
        expect(TodoModel.find).toHaveBeenCalledWith({ "taskAuthor": dummyResponse.taskAuthor })
    }))



    it("should not return all the task created by the author", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.find = jest.fn().mockRejectedValueOnce(new Error('Async error message'));

        // Act
        try {
            await findAllFunction(dummyResponse.taskAuthor)
        } catch (e) {
            // Assert
            expect(e.message).toEqual("Something went wrong!")
            expect(TodoModel.find).toHaveBeenCalledTimes(1)
            expect(TodoModel.find).toHaveBeenCalledWith({ "taskAuthor": dummyResponse.taskAuthor })
        }

    }))
})



describe("[ Find one task ] Testing: ", () => {

    afterEach(() => {
        TodoModel.findOne.mockClear()
    })

    it("should return the task created by the author for particular id", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.findOne = jest.fn().mockResolvedValueOnce(dummyResponse);

        // Act
        const serverResponse = await findOneByIdFunction(dummyResponse._id, dummyResponse.taskAuthor)

        // Assert
        expect(serverResponse).toStrictEqual(dummyResponse)
        expect(TodoModel.findOne).toHaveBeenCalledTimes(1)
        expect(TodoModel.findOne).toHaveBeenCalledWith({ "_id": dummyResponse._id, "taskAuthor": dummyResponse.taskAuthor })
    }))



    it("should not return the task created by the author for particular id", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.findOne = jest.fn().mockRejectedValueOnce(new Error('Async error message'));

        // Act
        try {
            await findOneByIdFunction(dummyResponse._id, dummyResponse.taskAuthor)
        } catch (e) {
            // Assert
            expect(e.message).toEqual("Something went wrong!")
            expect(TodoModel.findOne).toHaveBeenCalledTimes(1)
            expect(TodoModel.findOne).toHaveBeenCalledWith({ "_id": dummyResponse._id, "taskAuthor": dummyResponse.taskAuthor })
        }

    }))
})



describe("[Update One Task] Testing", () => {

    afterEach(() => {
        TodoModel.findOne.mockClear()
        TodoModel.findByIdAndUpdate.mockClear()
    })

    it("should return the updated task", (async () => {

        // Arrange
        const oldResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        const newResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5 with friends!!",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.findOne = jest.fn().mockResolvedValueOnce(oldResponse).mockResolvedValueOnce(newResponse);
        TodoModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce({});

        // Act
        const response = await updateOneFunction(oldResponse._id, newResponse.taskName, newResponse.taskDescription, oldResponse.taskAuthor)

        // Assert
        expect(TodoModel.findOne).toHaveBeenCalledTimes(2)
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledTimes(1)
        expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(oldResponse._id, {
            "taskDescription": "Play games in PS5 with friends!!",
            "taskName": "Play Forza Horizon 5"
        })
        expect(response).toStrictEqual(newResponse)
    }))


    it("should not return the updated task if author is not same", (async () => {

        // Arrange
        const oldResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Wick",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        const newResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5 with friends!!",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.findOne = jest.fn().mockResolvedValueOnce(oldResponse)

        // Act
        try {
            await updateOneFunction(oldResponse._id, newResponse.taskName, newResponse.taskDescription)
        } catch (e) {

            // Assert
            expect(TodoModel.findOne).toHaveBeenCalledTimes(1)
            expect(TodoModel.findOne).toHaveBeenCalledWith({ "_id": oldResponse._id })
            expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledTimes(0)
            expect(e.message).toEqual("You are not authorized to perform this task.")
        }

    }))
})



describe("[Delete One Task] Testing: ", () => {

    afterEach(() => {
        TodoModel.findOne.mockClear()
        TodoModel.findByIdAndDelete.mockClear()
    })

    it("should delete a task by its id and author and then return it", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.findOne = jest.fn().mockResolvedValueOnce(dummyResponse);
        TodoModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce(dummyResponse);

        // Act
        const response = await deleteOneFunction(dummyResponse._id, dummyResponse.taskAuthor)

        // Assert
        expect(response).toStrictEqual(dummyResponse)
        expect(TodoModel.findOne).toHaveBeenCalledTimes(1)
        expect(TodoModel.findOne).toHaveBeenCalledWith({ "_id": dummyResponse._id, "taskAuthor": dummyResponse.taskAuthor })
        expect(TodoModel.findByIdAndDelete).toHaveBeenCalledTimes(1)
        expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(dummyResponse._id)

    }))



    it("should not delete a task by its id and author and then return it", (async () => {
        // Arrange
        const dummyResponse = {
            "taskName": "Play Forza Horizon 5",
            "taskDescription": "Play games in PS5",
            "taskAuthor": "John Doe",
            "_id": "65d9f7951fe113d1c77b01e4",
            "__v": 0
        }
        TodoModel.findOne = jest.fn().mockRejectedValueOnce(new Error('Async error message'));
        TodoModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce(dummyResponse);

        // Act
        try {
            await deleteOneFunction(dummyResponse._id, dummyResponse.taskAuthor)
        }
        catch (e) {
            // Assert
            expect(TodoModel.findOne).toHaveBeenCalledTimes(1)
            expect(TodoModel.findOne).toHaveBeenCalledWith({ "_id": dummyResponse._id, "taskAuthor": dummyResponse.taskAuthor })
            expect(TodoModel.findByIdAndDelete).toHaveBeenCalledTimes(0)
            expect(e.message).toEqual("Something went wrong!")
        }


    }))
})