$(function(){
  chrome.runtime.sendMessage({todo: "showPageAction"});

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "changeColor") {
        var addColor = "#" + request.clickedColor;


        $(".pulse-dot .glyphicon, .pulse-dot").css("background-color", addColor);
        $("span.pulse-dot").pseudoStyle("before","background-color",addColor);

    }
});


 

var customLogo = ' <img src="https://raw.githubusercontent.com/sajjad1112ali/google-extension-helloworld/master/changeUpworkStyle/images/Upwork-logo-black.png" class="img-fluid" style="width: 100%;">';
  $("[data-cy='brand']").html(customLogo);
    var images = document.getElementsByTagName('img');
    for (var i = 0, l = images.length; i < l; i++) {
      if (images[i].alt !="Icon community") {
        images[i].src = 'https://raw.githubusercontent.com/sajjad1112ali/google-extension-helloworld/master/changeUpworkStyle/images/Upwork-logo-black.png';
        
      }
    }    

    var ContractsLink = '<a href="https://www.upwork.com/ab/c/2572761/contracts/" class="btn btn-primary custom-links-btn" role="button" target="_blank" aria-pressed="true">Contracts</a>';

    
    var FormLink = '<a href="https://docs.google.com/forms/d/e/1FAIpQLSem00EW9OXfTv9y310KIfiWeBgt3d7-ws5Gr-9EIJ4F_-G7kQ/viewform/" class="btn btn-primary mt-1 custom-links-btn" role="button" target="_blank" aria-pressed="true">Form</a>';
    
    
    var SpreadsheetLink = '<a href="https://docs.google.com/spreadsheets/d/1Uya7gDW3uv_ua7AhFe8SlaCgzEkfV8huWfzjsRKTwUw/edit#gid=890010809" class="btn btn-primary  mt-1 custom-links-btn" role="button" target="_blank" aria-pressed="true">Spreadsheet</a>';






    var popUpWindow = '    <button class="open-button" id="openLinksWindowBtn">+</button>\
    <div class="chat-popup" id="buttonsWindow">\
    <div class="custom-control custom-switch btn-size-m">\
    <input type="checkbox" class="custom-control-input" id="toggleBtnSize">\
    <label class="custom-control-label" for="toggleBtnSize">Button Small</label>\
  </div>\
      <div class="button-container">\
        <div class="link-buttons">\
        '+ContractsLink+'<br>\
        '+FormLink+'<br>\
        '+SpreadsheetLink+'\
        </div>\
        <button type="button" class="btn-cancel"  id="closeLinksWindowBtn" >X</button>\
      </div>\
    </div>';
    
    
    if(location.href === "https://www.upwork.com/ab/c/2572761/home")
    {
      $("body").append(popUpWindow);
    }

   // $("body").append(popUpWindow);

    $( "#openLinksWindowBtn" ).click(function() {
      $("#buttonsWindow").css("display", "block");

    });

    
    $( "#closeLinksWindowBtn" ).click(function() {
      $("#buttonsWindow").css("display", "none");
    });

    $('#toggleBtnSize').click(function() {
       $(".custom-links-btn").toggleClass("btn-sm");
  });    

});

