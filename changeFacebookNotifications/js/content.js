$(function(){
  chrome.runtime.sendMessage({todo: "showPageAction"});

  setTimeout(() => {
    
    var title = $("title").text().replace(/ *\([^)]*\) */g, "");
    $("title").text(title);
    console.log("--------------");
  }, 30000);


  chrome.storage.sync.get(["bg_color", "font_color", "m_bg_color", "m_font_color", "frequest_bg_color", "frequest_font_color"], function (styles) {
     
    // Notifications Color Pickers
    if (styles.bg_color) {
        changeNotificationStyle("background-color", "#" + styles.bg_color, "notificationsCountValue");
    }
    if (styles.font_color) {
      changeNotificationStyle("color", "#" + styles.font_color, "notificationsCountValue");
    }
    // Setting messages Color Pickers
    if (styles.m_bg_color) {
      changeNotificationStyle("background-color", "#" + styles.m_bg_color, "mercurymessagesCountValue");
    }
    if (styles.m_font_color) {
      changeNotificationStyle("color", "#" + styles.m_font_color, "mercurymessagesCountValue");
    }
    // Setting messages Color Pickers
    if (styles.frequest_bg_color) {
      changeNotificationStyle("background-color", "#" + styles.frequest_bg_color, "requestsCountValue");
    }

    if (styles.frequest_font_color) {
      changeNotificationStyle("color", "#" + styles.frequest_font_color, "requestsCountValue");
    }
  });


  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var addColor = "#" + request.clickedColor;

    if (request.todo == "changeColor") { // Notification Bg
        changeNotificationStyle("background-color", addColor, "notificationsCountValue");
        saveToChrom({"bg_color": request.clickedColor});
    }
    else
    if (request.todo == "changeFontColor") { // Notification font
      changeNotificationStyle("color", addColor, "notificationsCountValue");
      saveToChrom({"font_color": request.clickedColor});
    }
    else
    if (request.todo == "changeMsgBg") { // Messages font
      changeNotificationStyle("background-color", addColor, "mercurymessagesCountValue");
      saveToChrom({"m_bg_color": request.clickedColor});
    }
    else
    if (request.todo == "changeMsgFont") { // Messages font
      changeNotificationStyle("color", addColor, "mercurymessagesCountValue");
      saveToChrom({"m_font_color": request.clickedColor});
    }
    else
    if (request.todo == "changeFRequestBg") { // Friend request bg
      changeNotificationStyle("background-color", addColor, "requestsCountValue");
      saveToChrom({"frequest_bg_color": request.clickedColor});
    }
    else{
      changeNotificationStyle("color", addColor, "requestsCountValue");
      saveToChrom({"frequest_font_color": request.clickedColor});
    }
  });

});

function changeNotificationStyle(prop, color, targetDiv)
{
  $(`#${targetDiv}`).css(prop, color);
}
function saveToChrom(ObjToSave){
  chrome.storage.sync.set(ObjToSave, function(){
    
  });
}

