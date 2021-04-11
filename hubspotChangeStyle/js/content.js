$(function () {
  chrome.runtime.sendMessage({ todo: "showPageAction" });


  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "UserUniqueID") {
      addLinks(request.UserUniqueID)
    }
  });// End OnMessage

  // If ID has already been added

  chrome.storage.sync.get(["UserUniqueID"], function (data) {
    const UserUniqueID = data.UserUniqueID
    if (UserUniqueID) {
      addLinks(UserUniqueID);
    }
  });

  // Adding popup window

  function addLinks(id) {
    let dealsLinkReplace = `https://app.hubspot.com/contacts/REPLACE_ME/deals/board/view/all/`;
    let dealsLink = `<a href="${dealsLinkReplace}"  data-URL="${dealsLinkReplace}" class="uiButton private-button private-button--tertiary private-button--default private-button--non-link extensionAddedButtons" role="button" target="_blank" aria-pressed="true">Form</a>`;


    var popUpWindow = '<button class="open-button" id="openLinksWindowBtn">+</button>\
    <div class="chat-popup" id="buttonsWindow">\
      <div class="button-container">\
        <div class="link-buttons">\
        '+ dealsLink + '<br>\
        </div>\
        <button type="button" class="btn-cancel"  id="closeLinksWindowBtn" >X</button>\
      </div>\
    </div>';

    if ($('#openLinksWindowBtn').length > 0) {
      // links exist.
      replaceUserUniqueId(id)
    }
    else {

      $("body").append(popUpWindow);
      replaceUserUniqueId(id)
    }

    $("#openLinksWindowBtn").click(function () {
      $("#buttonsWindow").css("display", "block");
    });


    $("#closeLinksWindowBtn").click(function () {
      $("#buttonsWindow").css("display", "none");
    });
    $("#buttonsWindow").css("display", "none");
  }

  function replaceUserUniqueId(id) {
    $(".extensionAddedButtons").each(function () {
      var oldUrl = $(this).attr("data-URL"); // Get current url
      var newUrl = oldUrl.replace("REPLACE_ME", id); // Create new url
      $(this).attr("href", newUrl); // Set herf value
    });
  }
});



