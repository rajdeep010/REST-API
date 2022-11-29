const express = require('express');
const router = new express.Router();
const Student = require("../models/students");

// create a new student
router.get("/", (req, res) => {
    res.send("Hello from other side");
});


// 2. We need to define the router
router.get("/rajdeep", (req, res) => {
    res.send("Hello World");
});


// ---*** Handling Promise using then and catch ***---

// it should be written router,, after we shift all the paths
// from the app.js page to this page

// app.post("/students", (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);

//     user.save()
//     .then( () => {
//         res.status(201).send(user);
//     })
//     .catch( (err) => {
//         res.status(400).send(err);
//     })
// });


// ---*** Using ASYNC - AWAIT ***---

router.post("/students", async (req, res) => {

    try
    {
        const user = new Student(req.body);

        const createUser = await user.save();
    
        res.status(201).send(createUser);


    }catch(err){
        res.status(400).send(err);
    }
});


// read the data of registered Students
router.get("/students", async (req, res) => {
    try{

        const studentsData = await Student.find();
        res.send(studentsData);

    }catch(err){
        console.log(err);
        res.send(err);
    }
});

// get the individual Student data using id
router.get("/students/:id", async (req, res) => {
    try{

        const id = req.params.id;

        // for finding by name use findOne({name: name});
        const user = await Student.findById(id);

        if(!user)
            return res.status(404).send();

        console.log(user);

        res.status(201).send(user);

    }catch(err){
        res.status(400).send(err);
    }
});

//  Delete the Student by id
router.delete("/students/:id", async (req, res) => {
    try{

        const id = req.params.id;
        const user = await Student.findByIdAndDelete(id);

        if(!user)
            return res.status(404).send();

        res.status(201).send(user);

    }catch(err){
        res.status(500).send(err);
    }
});


// Update data for a particular id
router.patch("/students/:id", async (req, res) => {

    try{
        const _id = req.params.id;
        const user = await Student.findByIdAndUpdate(_id, req.body, {
            new : true
        });

        if(!user)
            return res.status(404).send();

        res.status(201).send(user);

    }catch(err){
        res.status(500).send(err);
    }

});


module.exports = router;