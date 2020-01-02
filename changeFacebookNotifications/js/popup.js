$(function(){
    var color = $("#colorPicker").val();
    $("#colorPicker").on("change paste keyup", function(){
        color = $(this).val();
        changeQuestionColor();
    });


    function changeQuestionColor(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color});
        });
    }

});