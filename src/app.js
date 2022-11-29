const express = require('express');
require("./db/conn");
const Student = require("./models/students");
const studentRouter = require("./routers/student");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(port, (req, res) => {
    console.log(`Server is up and running on port : ${port}`);
});
