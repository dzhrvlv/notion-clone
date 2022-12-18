const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {validationResult} = require("express-validator");
const {secret} = require("../config");

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {login, password} = req.body
            const candidate = await User.findOne({login})
            if (candidate) {
                return res.status(400).json({message: "User already consists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({login, password: hashPassword})
            await user.save()

            return res.json({message: "Registration success"})
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message: "Registration error!"})
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({login})
            if (!user) {
                return res.status(400).json({message: `User ${login} not found.`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: "Password error"})
            }
            const token = "secret_" + user._id

            return res.json({user: {id: user._id, login: user.login}, token})
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message: "Login error!"})
        }
    }

    async auth(req, res) {
        try {
            const user = await User.findOne({ _id: req.user });
            const token = "secret_" + user._id

            return res.json({user: {id: user._id, login: user.login}, token})
        }
        catch (e) {
            console.log(e)
            return res.status(400).json({message: "Auth error!"})
        }
    }
}

module.exports = new AuthController()