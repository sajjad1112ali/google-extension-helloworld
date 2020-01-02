$(function(){


    
    chrome.storage.sync.get(["bg_color", "font_color"], function(styles){

        var propertyObj;
        if(styles.bg_color)
        {
            document.getElementById('colorPicker').jscolor.fromString(styles.bg_color);

            
         propertyObj = {todo: "changeColor", clickedColor: styles.bg_color};
        changeColor(propertyObj);

        }

        if(styles.font_color)
        {
            document.getElementById('textColor').jscolor.fromString(styles.font_color);

            
         propertyObj = {todo: "changeTextColor", clickedColor: styles.font_color};
        changeColor(propertyObj);

        }
    });





    $("#colorPicker").on("change paste keyup", function(){
        var bgColor = $(this).val();

        var propertyObj = {todo: "changeColor", clickedColor: bgColor};
        changeColor(propertyObj);

        var toSave = {"bg_color": bgColor };
        saveToChrome(toSave);
    });

    $("#textColor").on("change paste keyup", function(){
        var textColor = $(this).val();

        var propertyObj = {todo: "changeTextColor", clickedColor: textColor};
        changeColor(propertyObj);

        var toSave = {"font_color": textColor };
        saveToChrome(toSave);

    });


    function changeColor(propertyObj){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, propertyObj);
        });
    }

    $('#toggleCss').click(function() {
       var toggleAction =  $(this).prop("checked") ? "addExtensionCss" : "removeExtensionCss";
       var propertyObj = {todo: toggleAction, clickedColor: "#FF2121", fontColor: "000000"};
       changeColor(propertyObj);
   }); 
   
   function saveToChrome (obj){
    chrome.storage.sync.set(obj, function(){
        console.log(obj);
         
     });
   }

});