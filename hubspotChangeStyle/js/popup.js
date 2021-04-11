$(function () {

    $("#error-message").addClass('d-none')
    chrome.storage.sync.get(["UserUniqueID"], function (data) {
        const UserUniqueID = data.UserUniqueID
        if (UserUniqueID) {
            $("#userID").val(UserUniqueID)
        }
    });

    $('#saveId').click(function () {
        const UserUniqueID = $("#userID").val()
        if (UserUniqueID.trim() == "") {
            $("#error-message").removeClass('d-none')
        }
        else {
            let toSave = { "UserUniqueID": UserUniqueID };
            saveToChrome(toSave);
            $("#error-message").addClass('d-none')
            // Sending Unique ID
            let propertyObj = { todo: "UserUniqueID", UserUniqueID };
            sendMessage(propertyObj);

        }
    });

    function saveToChrome(obj) {
        chrome.storage.sync.set(obj, function () {
        });
    }

    function sendMessage(propertyObj) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, propertyObj);
        });
    }
});