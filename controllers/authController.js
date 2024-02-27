const { ifUserExists, generateToken, registerUser, fetchOneUser } = require("../services/authService")

// TODO : Controller to register a user
async function registerUserController(req, res) {
    const { userName, userPassword, userEmail } = req.body
    let user = await registerUser(userName, userPassword, userEmail)
    if (user && user._id) {
        res.status(201)
        res.json(user)
    } else {
        res.status(500)
        res.json({ message: "Something went wrong!" })
    }
}

// TODO : Controller to login a user
async function loginUserController(req, res) {
    const { userEmail, userPassword } = req.body

    if (await ifUserExists(userEmail, userPassword)) {
        const userName = await fetchOneUser(userEmail)
        const response = await generateToken(userName)
        res.status(200)
        res.json(response)
    } else {
        res.status(500)
        res.json({ message: "Something went wrong!" })
    }
}

module.exports = { registerUserController, loginUserController }