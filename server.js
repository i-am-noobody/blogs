const express = require("express")
const cors = require("cors")

const app = express()
require("dotenv").config()
require("./dbConnect")
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/blog", require("./routes/blogRoutes"))

app.listen(process.env.PORT, (() => {
    console.log(`Server is running on port ${process.env.PORT}`)
}))