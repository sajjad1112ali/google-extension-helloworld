$(function(){
    $("#inputTb").keyup(function(){
        $("#name").text($("#inputTb").val());
    });
});