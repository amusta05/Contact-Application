
// contains all the libaries that will be for the backend
const express  = require('express');
const connect  = require('mongoose');
const connectDB = require('./config/db');
const path = require('path')
// initalize express
const app = express();

// Calling function to connect to the database
connectDB();

// Initalize middleware
app.use(express.json({extended: false}));
// varaible for the PORT number
const PORT = 5000;

// adding a endpoint to the home page
app.get('/', (req,res) => res.json({msg: 'Welcome to the Contact Application'}) );

i
// Define routes

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));
f(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res) =>
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    );

}
app.listen(PORT, () => console.log(`Server started on ${PORT}`));