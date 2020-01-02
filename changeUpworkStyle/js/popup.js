$(function(){
    var cssInjected = false;

    $("#colorPicker").on("change paste keyup", function(){
        var bgColor = $(this).val();
        var propertyObj = {todo: "changeColor", clickedColor: bgColor};
        changeColor(propertyObj);

    });

    $("#textColor").on("change paste keyup", function(){
        var textColor = $(this).val();
        var propertyObj = {todo: "changeTextColor", clickedColor: textColor};
        changeColor(propertyObj);
    });


    function changeColor(propertyObj){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, propertyObj);
        });
    }

    $('#toggleCss').click(function() {
       var toggleAction =  $(this).prop("checked") ? "addExtensionCss" : "removeExtensionCss"
       var propertyObj = {todo: toggleAction, clickedColor: "#FF2121", fontColor: "000000"};
       changeColor(propertyObj);
   });  

});