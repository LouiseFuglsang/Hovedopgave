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
//const passport = require("passport");
//const LocalStrategy = require("passport-local");
//const passportLocalMongoose = require("passport-local-mongoose");
//const collection=require('./MONGODB_CONNECTION_URL');


mongoose.set('strictQuery', false);


// ==========================
// Middlewares
// ==========================

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
mongoose.connect(process.env.MONGODB_CONNECTION_URL, {useNewUrlParser:true,useUnifiedTopology:true});


// ========================
// Data schema
// ========================

const brugerProfilerSchema = {
    brugernavn: String,
    adgangskode: String,
    adgangskodeGodkend: String,
    fuldeNavn: String,
    email: String,
    kortnummer: String,
    expire: String,
    kontrolcifre: String,
}


// ========================
// Data model
// ========================

const Bruger = mongoose.model('brugerProfil', brugerProfilerSchema);



// ================================
// Routes/Read route / handlers
// ================================

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/template/forside.html');
})

app.get('/logind', function(req, res) {
    res.sendFile(__dirname + '/public/template/signIn.html');
})

app.get('/registrer', function(req, res) {
    res.sendFile(__dirname + '/public/template/createProfile.html');
})

app.get('/gaester', function(req, res) {
    res.sendFile(__dirname + '/public/template/gaester.html');
})

app.get('/blivmedlem', function(req, res) {
    res.sendFile(__dirname + '/public/template/blivMedlem.html');
})

app.get('/inspiration', function(req, res) {
    res.sendFile(__dirname + '/public/template/inspiration.html');
})

app.get('/leverandoerer', function(req, res) {
    res.sendFile(__dirname + '/public/template/leverandoerer.html');
})

app.get('/anmeldelser', function(req, res) {
    res.sendFile(__dirname + '/public/template/anmeldelser.html');
})

app.get('/glemtadgangskode', function(req, res) {
    res.sendFile(__dirname + '/public/template/glemtAdgangskode.html');
})

app.get('/shop', function(req, res) {
    res.sendFile(__dirname + '/public/template/shop.html');
})

app.get('/velkommen', function(req, res) {
    res.sendFile(__dirname + '/public/template/velkommen.html');
})

app.get('/vaelgNyAdgangskode', function(req, res) {
    res.sendFile(__dirname + '/public/template/vaelgNyAdgangskode.html');
})

app.get('/tilmeldt', function(req, res) {
    res.sendFile(__dirname + '/public/template/tilmeldt.html');
})




//app.post
app.post('/blivmedlem', function(req, res){
    let newBruger = new Bruger({
        brugernavn: req.body.brugernavn,
        adgangskode: req.body.adgangskode,
        adgangskodeGodkend: req.body.adgangskodeGodkend,
        fuldeNavn: req.body.fuldeNavn,
        email: req.body.email,
        kortnummer: req.body.kortnummer,
        expire: req.body.expire,
        kontrolcifre: req.body.kontrolcifre

    });
    newBruger.save();
    res.redirect('/registrer');
})




app.post('/logind',async (req,res )=>{

    try{

        const check=await Bruger.findOne({brugernavn:req.body.brugernavn})

        if(check.adgangskode===req.body.adgangskode){
            res.redirect('/velkommen')
        }
        else{
            res.send('Du har indtastet en forkert adgangskode')
        }


    }
    catch{
        res.send('Brugernavnet eksisterer ikke')

    }
})


// ========================
// Listen
// ========================

app.listen(4400, function(){
    console.log("server is running on 4400");
})

