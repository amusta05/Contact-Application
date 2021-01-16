
// contains all the libaries that will be for the backend
const express  = require('express');

// initalize express
const app = express();

// varaible for the PORT number
const PORT = process.env.PORT || 3000;

// adding a endpoint to the home page
app.get('/', (req,res) => res.json({msg: 'Welcome to the Contact Application'}) );


// Define routes

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));