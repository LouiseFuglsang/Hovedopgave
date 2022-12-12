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
