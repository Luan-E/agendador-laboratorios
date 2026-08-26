const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const agendadorRoutes = require("./routes/agendadorRoutes")
const authRoutes = require("./routes/authRoutes")
const { errorHandler } = require("./middleware/errorHandler")

const app = express()

app.use(helmet())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true
}))
app.use(express.json({ limit: "10kb" }))
app.use(agendadorRoutes)
app.use(authRoutes)
app.use(errorHandler)

module.exports = app
