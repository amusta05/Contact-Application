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
router.put('/:id',async (req,res)=>{
    const {name, email,phone,type} = req.body;
    // Creating the contact object
    const contactFields = {};
    if (name){
        contactFields.name = name;
    }
    if(email){
        contactFields.email = email;
    }
    if (phone){
        contactFields.phone = phone;
    }
    if(type){
        contactFields.type = type;
    }
    try {
        let contact = await Contact.findById(req.params.id);
        // checks if the contact exits
        if(!contact){
            // retutn not found if it doesnt exist
            return res.status(404).json({msg:'Contact not found'});

        }
        // make sure user owns contact
        if(contact.user.toString() !== req.user.id ){

            return res.status(401).json({msg:'Not authorizated'});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,{
            $set:contactFields
        },{new:true});
        res.json(contact)


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Route to delete a contact
router.delete('/:id',auth,async (req,res)=>{
    try {
        let contact = await Contact.findById(req.params.id);
        // checks if the contact exits
        if(!contact){
            // retutn not found if it doesnt exist
            return res.status(404).json({msg:'Contact not found'});

        }
        // make sure user owns contact
        if(contact.user.toString() !== req.user.id ){

            return res.status(401).json({msg:'Not authorizated'});
        }
        await Contact.findOneAndDelete(req.params.id);

        res.json({msg:'Contact deleted'});


    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
// export the router, must do
module.exports = router;