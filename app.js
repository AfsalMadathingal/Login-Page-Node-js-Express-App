const express = require('express')
const app=express();
const path = require('path');
const bodyparser =require("body-parser")
const session = require("express-session")
const {v4:uuidv4}= require("uuid")
const router= require("./router")


const port= process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
    
//static assets
app.use(express.static('public'));


//session
app.use(session({
    secret:uuidv4(),
    resave: false,
    saveUninitialized: true
}))



app.use('/',router)



app.listen(port,()=>
{
    console.log("Listening to the server on http://localhost:3000");
})   