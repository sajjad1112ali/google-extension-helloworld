$(function(){
  chrome.runtime.sendMessage({todo: "showPageAction"});

  var originalImagesSrc = [];


  $(".input-group.input-group-search .input-group-btn>span.btn-primary, span.mentions, .badge-verified span, .badge-unverified span, .air-icon-verified, .nav-v2 .nav-right>li.active .nav-item, .nav-dropdown .active, .nav-v2 .nav-dot, .nav-v2 .nav-bubble, .blueberry-text, .opening-counts-value a").addClass("extensionCss");

  changeImagesSrc();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var addColor = "#" + request.clickedColor;
    if (request.todo == "changeColor") {
        $(".pulse-dot .glyphicon, .pulse-dot, span.mentions, .input-group.input-group-search .input-group-btn>.btn-primary").css("background-color", addColor);
    }
    else
    if (request.todo == "changeTextColor") {
      $(".pulse-dot .glyphicon, .pulse-dot, span.mentions").css("color", addColor);
    }
    else
    if (request.todo == "addExtensionCss") {
      var bgColor = "#" + request.fontColor;
      $(".pulse-dot .glyphicon, .pulse-dot").css("background-color", bgColor);

      
  $(".input-group.input-group-search .input-group-btn>span.btn-primary, span.mentions, .badge-verified span, .badge-unverified span, .air-icon-verified, .nav-v2 .nav-right>li.active .nav-item, .nav-dropdown .active, .nav-v2 .nav-dot, .nav-v2 .nav-bubble, .blueberry-text, .opening-counts-value a").addClass("extensionCss");


    }
  else{


    
  $(".input-group.input-group-search .input-group-btn>span.btn-primary, span.mentions, .badge-verified span, .badge-unverified span, .air-icon-verified, .nav-v2 .nav-right>li.active .nav-item, .nav-dropdown .active, .nav-v2 .nav-dot, .nav-v2 .nav-bubble, .blueberry-text, .opening-counts-value a").removeClass("extensionCss");

  
     $("span.pulse-dot").css({
        "background-color": "#14BFF4",
        "border": "2px solid #14BFF4 "
      });


    // var images = document.getElementsByTagName('img');
    // for (var i = 0, l = images.length; i < l; i++) {
    //   if (images[i].alt !="Icon community") {
    //     images[i].src = originalImagesSrc[i];
        
    //   }
    // }

      // $(".pulse-dot .glyphicon, .input-group.input-group-search .input-group-btn>span.btn-primary").css("background-color", "#14BFF4");
      // $(".nav-v2 .nav-right>li.active .nav-item").css("color", "#656565");

      // $("span.pulse-dot").css({
      //   "background-color": "#14BFF4",
      //   "border": "2px solid #14BFF4 "
      // });


      // $("span.air-icon-verified, badge-verified span, badge-unverified span").addClass("removeCss");

    }
});


function changeImagesSrc(){

var customLogo = ' <img src="https://raw.githubusercontent.com/sajjad1112ali/google-extension-helloworld/master/changeUpworkStyle/images/Upwork-logo-black.png" class="img-fluid" style="width: 100%;">';

  $("[data-cy='brand']").html(customLogo);

    var images = document.getElementsByTagName('img');
    for (var i = 0, l = images.length; i < l; i++) {
      if (images[i].alt !="Icon community") {
        originalImagesSrc.push(images[i].src);
        images[i].src = 'https://raw.githubusercontent.com/sajjad1112ali/google-extension-helloworld/master/changeUpworkStyle/images/Upwork-logo-black.png';
        
      }
    }  
    
}
    

    var ContractsLink = '<a href="https://www.upwork.com/ab/c/2572761/contracts/" class="btn btn-primary custom-links-btn" role="button" target="_blank" aria-pressed="true">Contracts</a>';

    
    var FormLink = '<a href="https://docs.google.com/forms/d/e/1FAIpQLSem00EW9OXfTv9y310KIfiWeBgt3d7-ws5Gr-9EIJ4F_-G7kQ/viewform" class="btn btn-primary mt-1 custom-links-btn" role="button" target="_blank" aria-pressed="true">Form</a>';
    
    
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

