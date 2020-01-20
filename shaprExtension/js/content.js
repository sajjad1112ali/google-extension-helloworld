$(function () {
  chrome.runtime.sendMessage({ todo: "showPageAction" });

  var modalPopUp = `
  <div id="myModal" class="modal">
    <div class="modal-content">
      <span class="close" id="closeModal">&times;</span>
      <p>Add your notes</p>
      <textarea rows="4" cols="50" id="userNotes"></textarea>
      <button type="button" id="saveNotesBtn" class="btn btn-secondary mt">Save</button>
    </div>

  </div>`;

  setTimeout(() => {
    alert("Going to add custom buttons");
    setReadUnreadIndicator();

    $("body").append(modalPopUp);
    
    // Get the modal
    var modal = document.getElementById("myModal");
    
    $("#saveNotesBtn").click(saveNotes);

    $("save-notes").click(function() {
      modal.style.display = "block";
    });
    
    var span = document.getElementById("closeModal");

    span.onclick = function() {
      modal.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
$("#userNotes").val("");
  }, 5000); // END SetTimeOut
}); // End JQuery


var windowLocation = location.href;
console.log(windowLocation )

// Setting read unread messages indicator symbol on page load
function setReadUnreadIndicator() {
  console.log($(this));
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
        uNameDiv = $(`h4.user-name[title="${value}"]`).closest("li");
        uNameDiv.find('a:first').addClass("userLiTags");

        var is_id_exist = SavedIds.indexOf(value);
        var notes = "";

        if (is_id_exist > -1) {
          notes = $.trim(SavedNotes[is_id_exist]) != "" ? SavedNotes[is_id_exist] : "";
        }
        var is_saved_notes_class = notes != "" ? "noteactive" : "";

        if (savedUserIds.includes(value)) {

          $(uNameDiv).append(`<unread-tag class='custom-markup marked' data-mark-as='unread' data-userId='${value}'></unread-tag>`);
        }
        else {
          $(uNameDiv).append(`<unread-tag class='custom-markup' data-mark-as='read' data-userId='${value}'></unread-tag>`);
        }
        $(uNameDiv).append(`<save-notes data-notesUserId='${value}' class='custom-markup ${is_saved_notes_class}' data-notes='${notes}'></save-notes>`);

      }); // End For each
      $("unread-tag").click(addRemoveUser);
      $("save-notes").click(getUserIDForNote);

      if (location.href == "https://webapp.shapr.net/") {
      $(".userLiTags").click(setReadUnreadIndicator);
        
      }


   // Get the modal
   var modal = document.getElementById("myModal");
 
   // Get the button that opens the modal
   $("save-notes").click(function() {
     modal.style.display = "block";
   });

    });

  }, 5000);  // End time intervel   


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
  var userNotes = $.trim($("#userNotes").val());
  var notesTag = $(`save-notes[data-notesuserid="${userIdForNote}"]`);
  
  if (userNotes == "") {
    if(!confirm("Do you want to add an empty note?")){
      return;
    }
    notesTag.removeClass("noteactive");
  }
  else{
    notesTag.addClass("noteactive")
  }

  notesTag.attr("data-notes", userNotes);
  
 
  $("#myModal").css("display", "none");

  chrome.storage.sync.get(['usersSavedNotes', 'usersIdsForSavedNotes'], function (usersSavedNotesObj) {
    var usersSavedNotes = usersSavedNotesObj.usersSavedNotes;
    var usersIdsForSavedNotes = usersSavedNotesObj.usersIdsForSavedNotes;

    if (typeof usersSavedNotes !== "undefined" && usersSavedNotes != null) {
      var index = usersIdsForSavedNotes.indexOf(userIdForNote);
      if (index > -1) {
        usersSavedNotes[index] = userNotes;
      } else {
        usersSavedNotes.push(userNotes);
        usersIdsForSavedNotes.push(userIdForNote);
      }
    }
    else {
      usersSavedNotes = [userNotes];
      usersIdsForSavedNotes = [userIdForNote];
    }

    // Saving usersSavedNotes array in storage
    chrome.storage.sync.set({ "usersSavedNotes": usersSavedNotes,  "usersIdsForSavedNotes": usersIdsForSavedNotes }, function () {
      console.log("User Notes Saved to local storage");
    });// End saving userIds 

  }); // getting saved Notest 
}

function pageChange(){
  
  setTimeout(() => {
    setReadUnreadIndicator();
  }, 10000);
}