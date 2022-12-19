
/*
$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});





function checkmark() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    if (checkBox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}
*/



// nodemon serverRunning.js
// se resultat på http://localhost:4000/

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

// Set views
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://datSTU:Zealand47@@cluster0.2nzwv.mongodb.net/?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    res.send('Det virker')
})

app.listen(4000, function(){
    console.log("server is running on 4000");
})






/*
var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://datSTU:<password>@cluster0.2nzwv.mongodb.net/test');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req,res){
    var username = req.body.username;
    var pass = req.body.password;
    var name = req.body.name;
    var email =req.body.email;
    var cardnumber =req.body.cardnumber;
    var expire =req.body.expire;
    var cvc =req.body.cvc;



    var data = {
        "username": username,
        "password":pass,
        "name": name,
        "email":email,
        "cardnumber":cardnumber,
        "expire":expire,
        "cvc":cvc
    }

    db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Oplysningerne er registreret");

    });

    return res.redirect('velkommen.html');
})


app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('forside.html');
}).listen(3000)


console.log("server listening at port 3000");

 */