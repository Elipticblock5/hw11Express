// necessary dependencies
const path = require('path');
const express = require('express');
const fs = require('fs');


// setting up server 
const app = express();
const PORT = process.env.PORT || 8800;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: ture }));
app.use(express.json());


//listening to server
app.listen(PORT, () => console.log("Nate your port is on" + PORT));