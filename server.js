//npm init (danner package.json)
//npm i express mongoose (danner package-lock.json)
//cd til rette mappe
//node server.js (eller nodemon server.js)

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
    let user = "Get user info from session";
    res.render('welcome', { user: user});

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


    //hash adgangskode (use bcrypt)
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




/*
function generateHash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compareHash(password: string, hashed: string) {
    return bcrypt.compareSync(password, hashed);
}

console.log(compareHash('password123', dsfdfgfdhgf));
*/






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


 /*       const insertResult = await Bruger.create({
            brugernavn: req.body.brugernavn,
            adgangskode: hashedAdgangskode,
        });
*/


        /*
        if (Bruger) {
            const cmp = await bcrypt.compare(req.body.adgangskode, hashedAdgangskode);
            if (cmp) {
                //   ..... further code to maintain authentication like jwt or sessions
                res.send("Auth Successful");
            } else {
                res.send("Wrong username or password.");
            }
        } else {
            res.send("Wrong username or password.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
});

*/


/*
        brugernavn.get(adgangskode)

        function compareHash(password: string, hashed: string) {
            return bcrypt.compareSync(password, hashed);
        }

        console.log(compareHash('password123', fdsdfdsxg))



        // check account found and verify password
        if (!brugerProfil || !bcrypt.compareSync(adgangskode, check.adgangskode)) {
            // authentication failed
            return false;
        } else {
            // authentication successful
            return true;
        }
    }


        //hash pw (use bcrypt)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(adgangskode, salt, (err, hash) => {
                if (err) throw err;
                //Set pw to hashed
                adgangskode = hash;
                    })
                    .catch(err => console.log(err));
            });



        if(check.hash===req.body.adgangskode){
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

*/





// ========================
// Listen
// ========================

app.listen(4400, function(){
    console.log("server is running on 4400");
})

