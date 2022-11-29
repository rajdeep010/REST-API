const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/students-api")
.then( () => {
    console.log("Connection is succesful");
})
.catch((err) => {
    console.log("No connection with error : " + err);
});

