$(function () {


    chrome.storage.sync.get(["bg_color", "font_color", "m_bg_color", "m_font_color", "frequest_bg_color", "frequest_font_color"], function (styles) {


        // Notifications Pickers
        if (styles.bg_color) {
            document.getElementById('colorPicker').jscolor.fromString(styles.bg_color);
        }
        if (styles.font_color) {
            document.getElementById('fontColorPicker').jscolor.fromString(styles.font_color);
        }

        // Messages Pickers
        if (styles.m_bg_color) {
            document.getElementById('messagesBgColor').jscolor.fromString(styles.m_bg_color);
        }
        if (styles.m_font_color) {
            document.getElementById('messagesFontColor').jscolor.fromString(styles.m_font_color);
        }

        // Messages Pickers
        if (styles.frequest_bg_color) {
            document.getElementById('friendRequestBgColor').jscolor.fromString(styles.frequest_bg_color);
        }
        if (styles.frequest_font_color) {
            document.getElementById('friendRequestFontColor').jscolor.fromString(styles.frequest_font_color);
        }


    });

    // Notifications Pickers
    $("#colorPicker").on("change paste keyup", function () {
        color = $(this).val();
        var propertyObj = { todo: "changeColor", clickedColor: color };
        changeQuestionColor(propertyObj);
    });

    $("#fontColorPicker").on("change paste keyup", function () {
        color = $(this).val();
        var propertyObj = { todo: "changeFontColor", clickedColor: color };
        changeQuestionColor(propertyObj);
    });

    // Messages Pickers
    $("#messagesBgColor").on("change paste keyup", function () {
        color = $(this).val();
        var propertyObj = { todo: "changeMsgBg", clickedColor: color };
        changeQuestionColor(propertyObj);
    });
    $("#messagesFontColor").on("change paste keyup", function () {
        color = $(this).val();
        var propertyObj = { todo: "changeMsgFont", clickedColor: color };
        changeQuestionColor(propertyObj);
    });

    // Friend request Pickers
    $("#friendRequestBgColor").on("change paste keyup", function () {
        color = $(this).val();
        var propertyObj = { todo: "changeFRequestBg", clickedColor: color };
        changeQuestionColor(propertyObj);
    });
    $("#friendRequestFontColor").on("change paste keyup", function () {
        color = $(this).val();
        var propertyObj = { todo: "changeFRequestFont", clickedColor: color };
        changeQuestionColor(propertyObj);
    });

    function changeQuestionColor(toDo) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, toDo);
        });
    }

});