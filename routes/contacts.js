// File that does all teh CRUD functionality 
const express = require('express');
const router =  express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
// Route to get all users of a specific contact
router.get('/',auth, async (req,res)=>{
    try {
        const contacts = await Contact.find({user:req.user.id}).sort({date:-1});
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Route to add a new  contact
router.post('/',[auth,[
    check('name','Name is required').not().isEmpty()
]], async (req,res)=>{
    const errors  = validationResult(req);
    if (!errors.isEmpty()){
        // returns an error if any of the validation is not met
        return res.status(400).json({errors: errors.array() });
    }
    const {name,email,phone, type} = req.body;
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact = await newContact.save();
        res.json(contact);


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

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