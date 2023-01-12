//npm init (danner package.json)
//npm i express mongoose (danner package-lock.json)
//cd til rette mappe
//node server.js (eller nodemon server.js)

require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');


mongoose.set('strictQuery', false);


// ========================
// Middlewares
// ========================

// Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use(bodyParser.urlencoded({extended: true}));



// Set views
app.set('view engine', 'ejs');


// ========================
// Connection to mongoDB
// ========================


//Kodeordet er sikret nu
mongoose.connect(process.env.MONGODB_CONNECTION_URL);


// ========================
// Data schema
// ========================

const brugerProfilerSchema = {
    brugernavn: String,
    adgangskode: String,
}
// ========================
// Data model
// ========================

const Bruger = mongoose.model('brugerProfil', brugerProfilerSchema);




// ================================
// Routes/Read route / handlers
// ================================

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/forside.html');
})

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/signIn.html');
})

app.get('/registrer', function(req, res) {
    res.sendFile(__dirname + '/createProfile.html');
})

//app.post
app.post('/login', function(req, res){
    let newBruger = new Bruger({
        brugernavn: req.body.brugernavn,
        adgangskode: req.body.adgangskode
    });
    newBruger.save();
    res.redirect('/');
})

// ========================
// Listen
// ========================

app.listen(4401, function(){
    console.log("server is running on 4401");
})

