$(function () {
  chrome.runtime.sendMessage({ todo: "showPageAction" });

  setTimeout(() => {
  // $("h4.user-name").append("<unread-tag class='custom-markup' data-mark-status='mark-as-read'></unread-tag><save-notes class='custom-markup'></save-notes>")
   setReadUnreadIndicator();
  }, 5000);


}); // End JQuery

  // Setting read unread messages indicator symbol
  function setReadUnreadIndicator()
  {
    setTimeout(() => {

    
    var domUserIds = [];

    console.log("getting domUserIds-----------------");
        // Getting all user ids
        $('h4.user-name').each(function(){
          domUserIds.push($(this).attr("title"));
       }); // End getting all user ids

    chrome.storage.sync.get(["userIds"], function(userIdsObj){
      let savedUserIds =  userIdsObj.userIds ? userIdsObj.userIds : [];
      var roomList = ";"
      domUserIds.forEach(function (value, index) {
        roomList =  $("ul.room-list").find(`[data-roomid='${value}']`).find('.room-list-item-div');
        if (savedUserIds.includes(value)) {
          
         roomList.append("<custome-mark-unread class='mark-as-read' data-mark-status='mark-as-read'></custome-mark-unread>");

         roomList.find('.room-list-name-span').addClass("my-custom-test-class");
        }
          else
          {
            roomList.append("<custome-mark-unread  data-mark-status='mark-as-unread'></custome-mark-unread>");
          }
        }); // End For each

        $( "custome-mark-unread" ).click(setItemReadUnread);
  });

}, 1000);  // End time intervel   


}

