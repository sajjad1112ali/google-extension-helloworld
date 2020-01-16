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
      <button type="button" id="saveNotesBtn" class="btn btn-secondary mt">Save</button>
    </div>

  </div>`;




  setTimeout(() => {
    console.log("Calling function");
    setReadUnreadIndicator();

    $("body").append(modalPopUp);
    
    // Get the modal
    var modal = document.getElementById("myModal");
    
    $("#saveNotesBtn").click(saveNotes);


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

    chrome.storage.sync.get(["userIds", "usersIdsForSavedNotes", "usersSavedNotes"], function (userIdsObj) {
      let savedUserIds = userIdsObj.userIds ? userIdsObj.userIds : [];
      let SavedNotes = userIdsObj.usersSavedNotes ? userIdsObj.usersSavedNotes : [];
      let SavedIds = userIdsObj.usersIdsForSavedNotes ? userIdsObj.usersIdsForSavedNotes : [];
      var uNameDiv = ""
      domUserIds.forEach(function (value, index) {
        uNameDiv = $(`h4.user-name[title="${value}"]`);



        var index = SavedIds.indexOf(value);
        var notes = index > -1 ? SavedNotes[index] : "";
        var is_saved_notes_class = index > -1 ? "noteactive" : "";

        

        if (savedUserIds.includes(value)) {

          $(uNameDiv).append(`<unread-tag class='custom-markup marked' data-mark-as='unread' data-userId='${value}'></unread-tag><save-notes data-notesUserId='${value}' class='custom-markup ${is_saved_notes_class}' data-notes='${notes}'></save-notes>`);
        }
        else {
          $(uNameDiv).append(`<unread-tag class='custom-markup' data-mark-as='read' data-userId='${value}'></unread-tag><save-notes data-notesUserId='${value}' class='custom-markup ${is_saved_notes_class}' data-notes='${notes}></save-notes>`);
        }
      }); // End For each
      $("unread-tag").click(addRemoveUser);
      $("save-notes").click(getUserIDForNote);


   // Get the modal
   var modal = document.getElementById("myModal");
 
   // Get the button that opens the modal
   $("save-notes").click(function() {
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
var userIdForNote ="";
function getUserIDForNote(){

  var target = $(this);
   userIdForNote = target.attr("data-notesUserId");
   $("#userNotes").val(target.attr("data-notes"));

  } // END getUserIDForNote

function saveNotes(){
  var userNotes = $("#userNotes").val();

  if ($.trim(userNotes) == "") {
    alert("Kindly enter your notes for processing.");
    return;
  }

  $(`save-notes[data-notesuserid="${userIdForNote}"]`).attr("data-notes", userNotes);
  
 
  $("#myModal").css("display", "none");

  chrome.storage.sync.get(['usersSavedNotes', 'usersIdsForSavedNotes'], function (usersSavedNotesObj) {
    var usersSavedNotes = usersSavedNotesObj.usersSavedNotes;
    var usersIdsForSavedNotes = usersSavedNotesObj.usersIdsForSavedNotes;
    console.log("_-----------------");
    console.log(usersSavedNotes);
    console.log("_-----------------");
    console.log(usersIdsForSavedNotes);

    if (typeof usersSavedNotes !== "undefined" && usersSavedNotes != null) {
      var index = usersIdsForSavedNotes.indexOf(userIdForNote);
      if (index > -1) {
        console.log("User aready exist");
        usersSavedNotes[index] = userNotes;
      } else {
        console.log("Not FOUND");
        usersSavedNotes.push(userNotes);
        usersIdsForSavedNotes.push(userIdForNote);
      }
    }
    else {
      console.log("ADDING NEW RECORD....");
      usersSavedNotes = [userNotes];
      usersIdsForSavedNotes = [userIdForNote];
    }

    // Saving usersSavedNotes array in storage
    chrome.storage.sync.set({ "usersSavedNotes": usersSavedNotes,  "usersIdsForSavedNotes": usersIdsForSavedNotes }, function () {
      console.log("usersSavedNotes Saved to local storage");
    });// End saving userIds 

  }); // getting saved Notest 

}