$(function () {



    chrome.storage.sync.get(["bg_color", "font_color", "applyAEtCss"], function (styles) {

        var propertyObj;
        if (styles.bg_color && styles.applyAEtCss == "addExtensionCss") {
            document.getElementById('colorPicker').jscolor.fromString(styles.bg_color);


            propertyObj = { todo: "changeColor", clickedColor: styles.bg_color };
            changeColor(propertyObj);

        }

        if (styles.font_color && styles.applyAEtCss == "addExtensionCss") {
            document.getElementById('textColor').jscolor.fromString(styles.font_color);


            propertyObj = { todo: "changeTextColor", clickedColor: styles.font_color };
            changeColor(propertyObj);

        }

        if (styles.applyAEtCss == "addExtensionCss") {
            $("#toggleCss").prop("checked", true);
            addRemoveExtensionStyle("addExtensionCss");
            showColorPicker(true);
        }
        else {
            $("#toggleCss").prop("checked", false);
            addRemoveExtensionStyle("removeExtensionCss");
            showColorPicker(false);

        }
    });





    $("#colorPicker").on("change paste keyup", function () {
        var bgColor = $(this).val();

        var propertyObj = { todo: "changeColor", clickedColor: bgColor };
        changeColor(propertyObj);

        var toSave = { "bg_color": bgColor };
        saveToChrome(toSave);
    });

    $("#textColor").on("change paste keyup", function () {
        var textColor = $(this).val();

        var propertyObj = { todo: "changeTextColor", clickedColor: textColor };
        changeColor(propertyObj);

        var toSave = { "font_color": textColor };
        saveToChrome(toSave);

    });


    function changeColor(propertyObj) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, propertyObj);
        });
    }

    $('#toggleCss').click(function () {

        var toggleAction = $("#toggleCss").is(':checked') ? "addExtensionCss" : "removeExtensionCss";

        showColorPicker($("#toggleCss").is(':checked'));

        var toSave = { "applyAEtCss": toggleAction };
        saveToChrome(toSave);

        addRemoveExtensionStyle(toggleAction);

    });

    function showColorPicker(applyCssStyle) {
        if (applyCssStyle) {
            $("#colorPickerContainer").removeClass("ColorPickerhidden");
        }
        else {
            $("#colorPickerContainer").addClass("ColorPickerhidden");

        }
    }
    function saveToChrome(obj) {
        chrome.storage.sync.set(obj, function () {
            console.log(obj);

        });
    }

    function addRemoveExtensionStyle(action) {
        chrome.storage.sync.get(["bg_color", "font_color"], function (styles) {

            var bgClr = "14BFF4";
            var fontClr = "ffffff";

            if (styles.bg_color && action == "addExtensionCss") {
                bgClr = styles.bg_color;

            }

            if (styles.font_color && action == "addExtensionCss") {
                fontClr = styles.font_color;
            }

            var propertyObj = { todo: action, clickedColor: bgClr, fontColor: fontClr };

            changeColor(propertyObj);

        });
    }
});