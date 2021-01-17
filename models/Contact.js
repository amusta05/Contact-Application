const mongoose = require('mongoose');
// Creating the mongoose schema
const ContactSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    type:{
        type: String,
        default: 'personal'
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('contact',ContactSchema);