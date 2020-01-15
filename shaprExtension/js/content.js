$(function () {
  chrome.runtime.sendMessage({ todo: "showPageAction" });


  var modalPopUp = `<!-- Trigger/Open The Modal -->

  <!-- The Modal -->
  <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p>Add your notes</p>
      <textarea rows="4" cols="50" id="userNotes"></textarea>
    </div>

  </div>`;




  setTimeout(() => {
    console.log("Calling function");
    setReadUnreadIndicator();

    $("body").append(modalPopUp);
    
    // Get the modal
    var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    $("save-notes").click(function() {
      modal.style.display = "block";
    });
    
    // Get the <span> element that closes the modal
    var span = document.getElementById("closeModal");
    
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
$("#userNotes").val("");
  }, 5000); // END SetTimeOut



}); // End JQuery

// Setting read unread messages indicator symbol on page load
function setReadUnreadIndicator() {
  setTimeout(() => {
    var domUserIds = [];
    var userId = "";
    // Getting all user ids
    $('h4.user-name').each(function () {
      userId = $(this).attr("title")
      if (!domUserIds.includes(userId)) {
        domUserIds.push(userId);
      }
    }); // End getting all user ids

    chrome.storage.sync.get(["userIds"], function (userIdsObj) {
      let savedUserIds = userIdsObj.userIds ? userIdsObj.userIds : [];
      var uNameDiv = ""
      domUserIds.forEach(function (value, index) {
        uNameDiv = $(`h4.user-name[title="${value}"]`);
        roomList = "";
        if (savedUserIds.includes(value)) {

          $(uNameDiv).append(`<unread-tag class='custom-markup marked' data-mark-as='unread' data-userId='${value}'></unread-tag><save-notes class='custom-markup'></save-notes>`);
        }
        else {
          $(uNameDiv).append(`<unread-tag class='custom-markup' data-mark-as='read' data-userId='${value}'></unread-tag><save-notes class='custom-markup'></save-notes>`);
        }
      }); // End For each
      $("unread-tag").click(addRemoveUser);


   // Get the modal
   var modal = document.getElementById("myModal");
 
   // Get the button that opens the modal
   $("save-notes").click(function() {
     console.log("PEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEP");
     modal.style.display = "block";
   });


    
    });

  }, 0);  // End time intervel   


} // END setReadUnreadIndicator

// Star clicked
function addRemoveUser() {

  var target = $(this);
  var markAs = target.attr("data-mark-as");
  var userId = target.attr("data-userId");

  if (markAs == "read") {
    target.attr("data-mark-as", "unread").addClass("marked");
  }
  else {
    target.attr("data-mark-as", "read").removeClass("marked");
  }

  chrome.storage.sync.get('userIds', function (userIdsObj) {
    var userIds = userIdsObj.userIds;
    if (typeof userIds !== "undefined" && userIds != null) {

      if (markAs == "unread") {

        userIds.splice(userIds.indexOf(userId), 1);
      } else {
        userIds.push(userId);
      }
    }
    else {
      userIds = [userId];
    }
    // Saving userIds array in storage
    chrome.storage.sync.set({ "userIds": userIds }, function () {
      console.log("userIds Saved to local storage");
    });// End saving userIds 
  }); // getting saved userIds 

}  // End addRemoveUser
