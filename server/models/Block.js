const {Schema, model} = require("mongoose")

const Block = new Schema({
    object: {type: String, required: true},
    user: {type: Schema.Types.ObjectId,  ref: "User", required: true},
    title: {type: String},
    content: [{type: Schema.Types.ObjectId, ref: "Block"}],
    status: {type: Boolean, default: false},
    focus: {
        // isFocused: {type: Boolean},
        // focusRow: {type: Schema.Types.ObjectId, ref: "Block"}
        focusRow: {type: String}
    }
})

module.exports = model("Block", Block)