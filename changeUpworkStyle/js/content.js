$(function(){
  chrome.runtime.sendMessage({todo: "showPageAction"});

  var originalImagesSrc = [];

  changeImagesSrc();

  

  
var re = new RegExp("(http|https):\/\/www.upwork.com\/messages\/rooms\/.*");

  if(re.test(location.href))
  {
  
    setTimeout(() => {
      //$(".room-list-name-span, .leftnav-menu, .nav-left").append("<custome-mark-unread>Mark Unread</custome-mark-unread>");
      //$( "custome-mark-unread" ).click(setItemReadUnread);
      setSavedRoomUnread();
    }, 8000);
  }

  function setItemReadUnread() {
    $(this).parent().addClass("my-custom-test-class");
    var currentRoomID = $(this).parent().parent().parent().parent().attr("data-roomid");
    var dataMarkStatus = $(this).attr("data-mark-status");
    console.log(dataMarkStatus);
    //data-mark-status

    if (dataMarkStatus == "mark-as-read") {
      // remove from from local storage
      $(this).attr("data-mark-status", "mark-as-unread").text("Mark as unread").removeClass("mark-as-read");
    }
    else{
      // add to local storage
      $(this).attr("data-mark-status", "mark-as-read").text("Mark as read").addClass("mark-as-read");

    }


    chrome.storage.sync.get('roomIds', function(roomIdsObj) {
      var roomIds = roomIdsObj.roomIds;
      if (typeof roomIds !== "undefined" && roomIds != null) {

        console.log(`Room ids length befor = ${roomIds.length}`);
        if (dataMarkStatus == "mark-as-read") {
          console.log("Removing from");
          roomIds.splice(roomIds.indexOf(currentRoomID),1);

        } else {
          console.log("Adding to . . ");

          roomIds.push(currentRoomID);
        }

        console.log(`Room ids length after = ${roomIds.length}`);
      }
      else
      {
          roomIds = [currentRoomID];
      }
      console.log(roomIds);
      return false;
      // Saving roomIds to array
      chrome.storage.sync.set({"roomIds": roomIds}, function(){
        console.log("Room ID Saved to local storage");
        console.log(roomIds);
      });
    }); // End saving roomIds 

  }  // End setItemReadUnread



  // Getting saved room IDs
  function setSavedRoomUnread()
  {
    var allRoomIDs = [];

    //$(".room-list-name-span, .leftnav-menu, .nav-left").append("<custome-mark-unread>Mark Unread</custome-mark-unread>");
    //

        // Getting all rom ids from list
        $('.room-list-item').each(function(){
          console.log(`Room Of List IDs = ${$(this).attr("data-roomid")}`);
          allRoomIDs.push($(this).attr("data-roomid"));
       }); // End getting all room ids


    chrome.storage.sync.get(["roomIds"], function(roomIdsObj){
      let savedRoomIds =  roomIdsObj.roomIds;



      allRoomIDs.forEach(function (value, index) {
          if (savedRoomIds.includes(value)) {
          console.log(`ID Found in our data ${index} = ${ value}`);
          $("ul.room-list").find(`[data-roomid='${value}']`).find('.room-list-name-span').addClass("my-custom-test-class").append("<custome-mark-unread class='mark-as-read' data-mark-status='mark-as-read'>Mark as read</custome-mark-unread>");
          }
          else
          {
            $("ul.room-list").find(`[data-roomid='${value}']`).find('.room-list-name-span').append("<custome-mark-unread  data-mark-status='mark-as-unread'>Mark as unread</custome-mark-unread>");
          }
        }); // End For each

        $( "custome-mark-unread" ).click(setItemReadUnread);
  });
}


  $(".input-group.input-group-search .input-group-btn>span.btn-primary, span.mentions, .badge-verified span, .badge-unverified span, .air-icon-verified, .nav-v2 .nav-right>li.active .nav-item, .nav-dropdown .active, .nav-v2 .nav-dot, .nav-v2 .nav-bubble, .blueberry-text, .opening-counts-value a, .nav-dot").addClass("extensionCss");


  chrome.storage.sync.get(["bg_color", "font_color", "applyAEtCss", "messages_bg_color", "messages_font_color"], function (styles) {

    if (styles.applyAEtCss == "addExtensionCss") {
      var request = {"todo": "addExtensionCss", "clickedColor": styles.bg_color, "fontColor": styles.font_color, delaytime: 3000, "mclickedColor": styles.messages_bg_color, "mfontColor": styles.messages_font_color };
      isAddExtensioChecked(request);
    }
});






  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var addColor = "#" + request.clickedColor;

    if (request.todo == "changeColor") {
        $(".pulse-dot .glyphicon, .pulse-dot").css({
          "background-color": addColor,
          "border": "2px solid " +addColor,
        });
    }
    else
    if (request.todo == "changeTextColor") {
      $(".pulse-dot .glyphicon, .pulse-dot, span.mentions").css("color", addColor);
    }
    else
    if (request.todo == "messagesChangeColor") {
      $("span.mentions").css("background-color", addColor);

    }
    else
    if (request.todo == "messagesChangeTextColor") {
      $("span.mentions").css("color", addColor);

    }
    else
    {
      console.log("IN ANOTHER CALL");
      // Check if extension Css checkd or not
      isAddExtensioChecked(request);
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

function isAddExtensioChecked (request){

  if (request.todo == "addExtensionCss") {

    var bgColor = "#" + request.clickedColor;
    var fontColor = "#" + request.fontColor;
    var mbgColor = "#" + request.mclickedColor;
    var mfontColor = "#" + request.mfontColor;
    
    addCommonStyles(bgColor, fontColor, bgColor, request.delaytime, mbgColor, mfontColor);

  }
else{
    addCommonStyles("#14BFF4", "#FFFFFF", "#37A000", request.delaytime, "#37A000", "#FFFFFF" );
  }
}

function addCommonStyles(bg, fnt, tb, delay, mbg, mfnt)
{

setTimeout(() => {
  $(".pulse-dot .glyphicon, .pulse-dot").css({
    "background-color": bg,
    "border": "2px solid "+bg,
    "color": fnt
  }); 
}, delay);




$(".span.mentions").css({
  "background-color": mbg,
  "color": mfnt,
});

}