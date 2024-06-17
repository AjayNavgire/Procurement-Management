const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        useTempFiles: true
    }));
app.use(cors());

// Route Imports
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const checklist = require("./routes/checklistRoutes");


app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", checklist);

app.get('/', (req, res)=>{
    res.send("Server is working")
})

// Middleware for Errors
app.use(errorMiddleware)

module.exports = app;