
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const saltRounds = 10;

//password encrypt
const bcrypt = require('bcryptjs');


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
    kortholder: String,
    kortnummer: String,
    expireMonth: Number,
    expireYear: Number,
    kontrolcifre: String,
}


// ========================
// Data model
// ========================

const Bruger = mongoose.model('brugerProfil', brugerProfilerSchema);



// ================================
// Routes/Read route
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
    let user = "Get user info from session";
    res.render('velkommen', { user: user});
})

app.get('/vaelgNyAdgangskode', function(req, res) {
    res.sendFile(__dirname + '/public/template/vaelgNyAdgangskode.html');
})

app.get('/tilmeldt', function(req, res) {
    res.sendFile(__dirname + '/public/template/tilmeldt.html');
})

app.get('/persondata', function(req, res) {
    res.sendFile(__dirname + '/public/template/persondata.html');
})

app.get('/medlemsvilkaar', function(req, res) {
    res.sendFile(__dirname + '/public/template/medlemsvilkaar.html');
})



//app.post
app.post('/blivmedlem', function(req, res) {
    let newBruger = new Bruger({
        brugernavn: req.body.brugernavn,
        adgangskode: req.body.adgangskode,
        fuldeNavn: req.body.fuldeNavn,
        email: req.body.email,
        kortholder: req.body.kortholder,
        kortnummer: req.body.kortnummer,
        expireMonth: req.body.expireMonth,
        expireYear: req.body.expireYear,
        kontrolcifre: req.body.kontrolcifre
    });


    //hash adgangskode
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newBruger.adgangskode, salt, (err, hash) => {
            if (err) throw err;
            //Set adgangskode to hashed
            newBruger.adgangskode = hash;
            //save users to DB
            newBruger.save() //when user get saved db
                .then(user => { //give us promise

                    newBruger.save();
                    res.redirect('/registrer');
                })
                .catch(err => console.log(err));
        });
    });
})




app.post('/logind',async (req,res ) => {

    let password;
    let hash;
    try {

        const check = await Bruger.findOne({brugernavn: req.body.brugernavn});
        if (check) {
            password = req.body.adgangskode;
            hash = check.adgangskode

            const match = await bcrypt.compare(password, hash);

            if (match){
                // Set session var (brugernavn osv...)
                res.redirect('/velkommen')
            } else {
                res.send('Fejl ved login, prøv igen.');
            }

        } else {
            res.send('Bruger ikke fundet!')
        }

    } catch {
        res.send('Login fejlede, hvis fejlen fortsætter så kontakt support.')

    }
})



// ========================
// Listen
// ========================

app.listen(4400, function(){
    console.log("server is running on 4400");
})