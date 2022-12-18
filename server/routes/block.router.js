const Router = require("express")
const router = new Router()
const controller = require("../controllers/block.controller")
const authMiddleware = require('../middleware/auth.middleware');

router.get("/pages/getAll", authMiddleware, controller.getAllPages)
router.get('/pages/:id', authMiddleware, controller.getPage)
router.post("/pages/create", authMiddleware, controller.createPage)
router.put('/pages/:id', authMiddleware, controller.editPage)
router.delete('/pages/:id', authMiddleware, controller.deletePage)

router.post("/rows/create", authMiddleware, controller.createBlock)
router.get('/rows/:id', authMiddleware, controller.getPage)
router.put('/rows/:id', authMiddleware, controller.editPage)
router.delete('/rows/:id', authMiddleware, controller.deleteBlock)

module.exports = router