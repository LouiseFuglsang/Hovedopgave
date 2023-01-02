//npm init (danner package.json)
//npm i express mongoose (danner package-lock.json)
//cd til rette mappe
//node server.js (eller nodemon server.js)

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

//Kodeordet skal sikres!!!
mongoose.connect('mongodb+srv://Louise:GoPikachu78@cluster0.k9wdj.mongodb.net/dinstorefest?retryWrites=true&w=majority', {useNewUrlParser: true}, {useUnifiedTopology: true});


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
    res.sendFile(__dirname + '/signIn.html');
})


//app.post
app.post('/', function(req, res){
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

app.listen(4400, function(){
    console.log("server is running on 4400");
})
