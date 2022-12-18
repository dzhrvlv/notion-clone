const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const authRouter = require('./routes/auth.router');
const blockRouter = require('./routes/block.router');

const PORT = 5000
const app = express()

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/blocks", blockRouter)

const url = "mongodb+srv://admin:admin@cluster0.xyymk3h.mongodb.net/?retryWrites=true&w=majority"

const start = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    } catch (e) {
        console.log(`Error before start`)
    }
}

start();