$(function(){


    chrome.storage.sync.get(["bg_color", "font_color"], function (styles) {
      
        if (styles.bg_color) {
            document.getElementById('colorPicker').jscolor.fromString(styles.bg_color);
        }
        if (styles.font_color) {
            document.getElementById('fontColorPicker').jscolor.fromString(styles.font_color);
        }
    });

    $("#colorPicker").on("change paste keyup", function(){
        color = $(this).val();
        var propertyObj = {todo: "changeColor", clickedColor: color};
        changeQuestionColor(propertyObj);
    });

    $("#fontColorPicker").on("change paste keyup", function(){
        color = $(this).val();
        var propertyObj = {todo: "changeFontColor", clickedColor: color};
        changeQuestionColor(propertyObj);
    });

    function changeQuestionColor(toDo){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, toDo);
        });
    }

});