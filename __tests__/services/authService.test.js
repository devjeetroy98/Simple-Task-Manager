const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authModel = require("../../schemas/authSchema")
const { ifUserExists, generateToken, registerUser, fetchOneUser } = require("../../services/authService")

require("dotenv").config()

jest.mock("../../schemas/authSchema")
jest.mock('bcrypt')
jest.mock("jsonwebtoken")

describe("Testing services for Authentication & Authorization", () => {


    afterEach(() => {
        authModel.findOne.mockClear()
        authModel.create.mockClear()
        bcrypt.compare.mockClear()
        bcrypt.hash.mockClear()
        jwt.sign.mockClear()
    })

    it("should return true if a user exists and password matches", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "userPassword": "Pass@123",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockImplementationOnce(() => ({ select: jest.fn().mockResolvedValueOnce(userResponse) }));
        bcrypt.compare.mockImplementationOnce(() => true)

        // Act
        let response = await ifUserExists(userResponse.userEmail, userResponse.userPassword)

        // Assert
        expect(authModel.findOne).toHaveBeenCalledTimes(1)
        expect(authModel.findOne).toHaveBeenCalledWith({ "userEmail": userResponse.userEmail })
        expect(bcrypt.compare).toHaveBeenCalledTimes(1)
        expect(bcrypt.compare).toHaveBeenCalledWith(userResponse.userPassword, userResponse.userPassword)
        expect(response).toBe(true)

    }))


    it("should return false if a user doesn't exists", (async () => {

        // Arrange
        const userResponse = {}
        authModel.findOne = jest.fn().mockImplementationOnce(() => ({ select: jest.fn().mockResolvedValueOnce(userResponse) }));

        // Act
        let response = await ifUserExists("doejohn@gmail.com", "Pass@123")

        // Assert
        expect(authModel.findOne).toHaveBeenCalledTimes(1)
        expect(authModel.findOne).toHaveBeenCalledWith({ "userEmail": "doejohn@gmail.com" })
        expect(response).toBe(false)

    }))


    it("should return false if a user exists and but password doesn't matches", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "userPassword": "Pass@123",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockImplementationOnce(() => ({ select: jest.fn().mockResolvedValueOnce(userResponse) }));
        bcrypt.compare.mockImplementationOnce(() => false)

        // Act
        let response = await ifUserExists(userResponse.userEmail, userResponse.userPassword)

        // Assert
        expect(authModel.findOne).toHaveBeenCalledTimes(1)
        expect(authModel.findOne).toHaveBeenCalledWith({ "userEmail": userResponse.userEmail })
        expect(bcrypt.compare).toHaveBeenCalledTimes(1)
        expect(bcrypt.compare).toHaveBeenCalledWith(userResponse.userPassword, userResponse.userPassword)
        expect(response).toBe(false)

    }))


    it("should return false if any error occurs", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "userPassword": "Pass@123",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockImplementationOnce(() => ({ select: jest.fn().mockResolvedValueOnce(userResponse) }));
        bcrypt.compare.mockImplementationOnce(() => { throw {} })

        // Act
        let response = await ifUserExists(userResponse.userEmail, userResponse.userPassword)

        // Assert
        expect(authModel.findOne).toHaveBeenCalledTimes(1)
        expect(authModel.findOne).toHaveBeenCalledWith({ "userEmail": userResponse.userEmail })
        expect(bcrypt.compare).toHaveBeenCalledTimes(1)
        expect(bcrypt.compare).toHaveBeenCalledWith(userResponse.userPassword, userResponse.userPassword)
        expect(response).toBe(false)

    }))



    it("should generate access token", (async () => {

        // Arrange
        const userName = "John Doe"
        jwt.sign.mockImplementationOnce(() => "dummy-token")

        // Act
        let response = await generateToken(userName)

        // Assert
        expect(jwt.sign).toHaveBeenCalledTimes(1)
        expect(jwt.sign).toHaveBeenCalledWith({ userName }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURATION })
        expect(response).toStrictEqual({ accessToken: 'dummy-token' })

    }))


    it("should register a user and return user details if not exists", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockResolvedValueOnce(undefined).mockResolvedValueOnce(userResponse);
        authModel.create = jest.fn().mockResolvedValueOnce(userResponse);
        bcrypt.hash.mockImplementationOnce((x) => x)

        // Act
        let response = await registerUser(userResponse.userName, userResponse.userPassword, userResponse.userEmail)

        // Assert
        expect(authModel.findOne).toHaveBeenCalled()
        expect(authModel.create).toHaveBeenCalledTimes(1)
        expect(bcrypt.hash).toHaveBeenCalledTimes(1)
        expect(response).toStrictEqual(userResponse)
    }))


    it("should not register a user and return user details if exists", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockResolvedValueOnce(userResponse);
        authModel.create = jest.fn().mockResolvedValueOnce(userResponse);
        bcrypt.hash.mockImplementationOnce((x) => x)

        // Act
        let response = await registerUser(userResponse.userName, userResponse.userPassword, userResponse.userEmail)

        // Assert
        expect(authModel.findOne).toHaveBeenCalled()
        expect(authModel.create).toHaveBeenCalledTimes(0)
        expect(bcrypt.hash).toHaveBeenCalledTimes(0)
        expect(response).toStrictEqual(false)
    }))



    it("should not register a user if any error occurs while checking if user already exists", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockRejectedValue(new Error('Async error message'));
        authModel.create = jest.fn().mockResolvedValueOnce(userResponse);
        bcrypt.hash.mockImplementationOnce((x) => x)

        // Act
        let response = await registerUser(userResponse.userName, userResponse.userPassword, userResponse.userEmail)

        // Assert
        expect(authModel.findOne).toHaveBeenCalled()
        expect(authModel.create).toHaveBeenCalledTimes(0)
        expect(bcrypt.hash).toHaveBeenCalledTimes(0)
        expect(response).toStrictEqual(false)
    }))

    it("should return user details if exists", (async () => {

        // Arrange
        const userResponse = {
            "_id": "65da0a6706493c9889cc7b48",
            "userName": "John Doe",
            "userEmail": "doe1john@gmail.com",
            "createdAt": "2024-02-24T15:25:27.290Z",
            "updatedAt": "2024-02-24T15:25:27.290Z",
            "__v": 0
        }
        authModel.findOne = jest.fn().mockResolvedValueOnce(userResponse);

        // Act
        let response = await fetchOneUser(userResponse.userEmail)

        // Assert
        expect(response).toStrictEqual(userResponse.userName)
    }))
})