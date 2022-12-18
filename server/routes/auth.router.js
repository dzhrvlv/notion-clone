const Router = require("express")
const router = new Router()
const controller = require("../controllers/auth.controller")
const authMiddleware = require('../middleware/auth.middleware');

const {check} = require("express-validator")

router.post("/register", [
    check("login", "Field not can be empty").notEmpty(),
    check("password", "Field can be larger than 4 and less than 10").isLength({min: 4, max: 10})
], controller.registration)
router.post("/login", controller.login)
router.get('/auth', authMiddleware, controller.auth);

module.exports = router