$(function(){
    $("#header").load("public/template/header.html");
    $("#footer").load("template/footer.html");
    console.log('noget bør virke');
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
