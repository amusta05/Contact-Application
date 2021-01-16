// File that does all teh CRUD functionality 
const express = require('express');
const router =  express.Router();

// Route to get all users of a specific contact
router.get('/',(req,res)=>{
    res.send("Get all contacts" );
});

// Route to add a new  contact
router.post('/',(req,res)=>{
    res.send("Add new contact" );
});

// Route to update a contact
router.put('/:id',(req,res)=>{
    res.send("Update a contact");
});

// Route to delete a contact
router.delete('/:id',(req,res)=>{
    res.send("Delete a contact");
});
// export the router, must do
module.exports = router;