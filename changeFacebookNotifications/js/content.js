$(function(){
  chrome.runtime.sendMessage({todo: "showPageAction"});

  chrome.storage.sync.get(["bg_color", "font_color"], function (styles) {
      
    if (styles.bg_color) {
        changeNotificationStyle("background-color", "#" + styles.bg_color);
    }
    if (styles.font_color) {
      changeNotificationStyle("color", "#" + styles.font_color);
    }
  });


  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var addColor = "#" + request.clickedColor;

    if (request.todo == "changeColor") {
        changeNotificationStyle("background-color", addColor);
        saveToChrom({"bg_color": request.clickedColor});
    }
    else
    {
      changeNotificationStyle("color", addColor);
      saveToChrom({"font_color": request.clickedColor});
    }
  });

});

function changeNotificationStyle(prop, color)
{
  $("._5ugg, ._3z_5").css(prop, color);
}
function saveToChrom(ObjToSave){
  // Saving roomIds to array
  chrome.storage.sync.set(ObjToSave, function(){
    console.log("Room ID Saved to local storage");
    console.log(ObjToSave);
  });
}

