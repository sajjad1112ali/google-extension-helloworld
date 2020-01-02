$(function(){
  chrome.runtime.sendMessage({todo: "showPageAction"});

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "changeColor") {
      console.log("aaaaaaaaaaaaaa");
        var addColor = "#" + request.clickedColor;

       
        $("._5ugg, ._3z_5").css("background-color", addColor);

    }
});


   



  
    
    

     

});

