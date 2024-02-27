const { registerUserController, loginUserController } = require("../../controllers/authController")
const { ifUserExists, generateToken, registerUser, fetchOneUser } = require("../../services/authService")

jest.mock("../../services/authService")

let request
let response

describe("Register Route:", () => {

    beforeEach(() => {
        request = {
            body: {
                "userName": "Test User",
                "userPassword": "Pass@123",
                "userEmail": "test-user@gmail.com"
            }
        }

        response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        }
    });

    it("should return new user object with status 200", (async () => {

        // Arrange
        const dummyResponse = {
            "_id": "65d8b9d14ebcf333439e4941",
            "userName": "Test User",
            "userEmail": "test-user@gmail.com",
            "createdAt": "2024-02-23T15:29:21.741Z",
            "updatedAt": "2024-02-23T15:29:21.741Z",
            "__v": 0
        }
        registerUser.mockImplementationOnce(() => (dummyResponse))

        // Act
        await registerUserController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(201)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith(dummyResponse)
    }))


    it("should return error message with status 500", (async () => {

        // Arrange
        const dummyResponse = { message: "Something went wrong!" }
        registerUser.mockImplementationOnce(() => (dummyResponse))

        // Act
        await registerUserController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith(dummyResponse)
    }))
})


describe("Login Route:", () => {

    beforeEach(() => {
        request = {
            body: {
                "userPassword": "Pass@123",
                "userEmail": "test-user@gmail.com"
            }
        }

        response = {
            status: jest.fn((x) => x),
            json: jest.fn((x) => x)
        }
    });

    it("should return access token for login with status 200", (async () => {
        // Arrange
        const dummyResponse = {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4NzgyMzgyLCJleHAiOjE3MDg3ODU5ODJ9.r-Ye-kuRx0U6ouBpdb7uat1zK5j9zwKF00s-OOMYcJA"
        }
        ifUserExists.mockImplementationOnce(() => true)
        fetchOneUser.mockImplementationOnce(() => "Test User")
        generateToken.mockImplementationOnce(() => dummyResponse)

        // Act
        await loginUserController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith(dummyResponse)
    }))

    it("should return error for login with status 500", (async () => {

        // Arrange
        const dummyResponse = { message: "Something went wrong!" }
        ifUserExists.mockImplementationOnce(() => false)

        // Act
        await loginUserController(request, response)

        // Assert
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledTimes(1)
        expect(response.json).toHaveBeenCalledWith(dummyResponse)
    }))
})