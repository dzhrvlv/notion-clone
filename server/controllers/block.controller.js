const Block = require("../models/Block")
const User = require("../models/User")


class BlockController {
    async getAllPages(req, res) {
        try {
            const user = await User.findOne({_id: req.user})

            const pages = await Block.find({user: user, object: "page"})
            return res.json(pages)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Get error!"})
        }
    }

    async getPage(req, res) {
        try {
            const page = await Block.findById(req.params.id)
            return res.json(page)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "get error!"})
        }
    }

    async createPage(req, res) {
        try {
            const page = new Block({object: "page", user: req.user, title: "", content: [], focus: { focusRow: "title"}})
            await page.save()

            return res.json(page)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Create error!"})
        }
    }

    async editPage(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(412)
                    .json({message: "Page с таким id не существует"});
            }
            const updatedPage = await Block.findByIdAndUpdate(
                id,
                {...req.body},
                {new: true}
            );
            return res.status(200)
                .json({
                    message: "Page успешно обновлен",
                    page: updatedPage
                });
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Edit error!"})
        }
    }


    async deletePage(req, res) {
        try {
            const id = req.params.id;
            const deletedPage = await Block.findByIdAndDelete(id);
            if (!deletedPage) {
                return res.status(412)
                    .json({message: "Ошибка при удалении page"});
            }
            res.json({message: "Page успешно удален"});
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Delete error!"})
        }
    }

    async createBlock(req, res) {
        try {

            const {object, index, parentId} = req.body

            const block = new Block({object, user: req.user, title: ""})
            await block.save()

            if (parentId) {
                const parentBlock = await Block.findById(parentId)

                parentBlock.content.splice(Number(index) + 1, 0, block._id)
                parentBlock.focus.focusRow = block._id
                await parentBlock.save()
            }

            return res.json(block)
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Create error!"})
        }
    }

    async deleteBlock(req, res) {
        try {
            const id = req.params.id;
            const deletedBlock = await Block.findByIdAndDelete(id);
            if (!deletedBlock) {
                return res.status(412)
                    .json({message: "Ошибка при удалении block"});
            }

            const parentBlock = await Block.findOne({content: deletedBlock._id})
            if (parentBlock) {
                const index = parentBlock.content.indexOf(deletedBlock._id)

                if (index > -1) {
                    parentBlock.content.splice(index, 1)
                    parentBlock.focus.focusRow = index === 0 ? "title" : parentBlock.content[index - 1]
                }

                parentBlock.save()
            }

            res.json({message: "Block успешно удален", block: deletedBlock});
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: "Delete error!"})
        }
    }
}

module.exports = new BlockController()