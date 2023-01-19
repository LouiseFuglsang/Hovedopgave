// Tjek for om adgangskoder matcher
function checkPassword(form) {
    adgangskode = form.adgangskode.value;
    adgangskodeGodkend = form.adgangskodeGodkend.value;

    // Hvis adgangskodefeltet ikke er udfyldt
    if (adgangskode == '')
        alert ("Indtast adgangskode");

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
        return true;
    }
}