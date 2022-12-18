const {Schema, model} = require("mongoose")

const User = new Schema({
    login: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    // name: {type: String}
})

module.exports = model("User", User)