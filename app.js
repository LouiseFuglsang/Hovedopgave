//////////////////////////
function checkmark() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    if (checkBox.checked == true){
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}


////////////////VALIDATER adgangskodefeltet///////////////////////////////////

var brugerInputKode = document.getElementById("adgangskode");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");


// Vis boks, når bruger trykker på adgangskodefeltet
brugerInputKode.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

// Skjul besked, når bruger klikker udenfor besked boks
brugerInputKode.onblur = function() {
    document.getElementById("message").style.display = "none";
}

// Når bruger begynder at skrive i adgangskodefeltet
brugerInputKode.onkeyup = function() {

    // Validerer på små bogstaver
    var lowerCaseLetters = /[a-z]/g;
    if(brugerInputKode.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validerer på STORE bogstaver
    var upperCaseLetters = /[A-Z]/g;
    if(brugerInputKode.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validerer numre
    var numbers = /[0-9]/g;
    if(brugerInputKode.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validerer på længden
    if(brugerInputKode.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}






// Tjek for om adgangskoder matcher
function checkPassword(form) {
    adgangskode = form.adgangskode.value;
    adgangskodeGodkend = form.adgangskodeGodkend.value;

    // Hvis adgangskodefeltet ikke er udfyldt
    if (adgangskode == '')
        alert ("Please enter Password");

    // Hvis Bekræft adgangskodefeltet ikke er udfyldt
    else if (adgangskodeGodkend == '')
        alert ("Please enter confirm password");

    // Hvis adgangskoderne ikke matcher
    else if (adgangskode != adgangskodeGodkend) {
        alert ("\nAdgangskoderne er ikke ens, prøv igen.")
        return false;
    }

    // Når adgangskoderne matcher
    else{
        alert("Adgangskoderne matcher")
        return true;
    }
}