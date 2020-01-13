$(function () {
    chrome.storage.sync.get(["bg_color", "font_color", "applyAEtCss", "messages_bg_color", "messages_font_color"], function (styles) {
        var propertyObj;

        // Checking if question marks style has saved or not
        // if saved then set the color
        if (styles.bg_color && styles.applyAEtCss == "addExtensionCss") {
            document.getElementById('colorPicker').jscolor.fromString(styles.bg_color);
            propertyObj = { todo: "changeColor", clickedColor: styles.bg_color };
           // changeColor(propertyObj);

        }

        if (styles.font_color && styles.applyAEtCss == "addExtensionCss") {
            document.getElementById('textColor').jscolor.fromString(styles.font_color);
        }

        
        // Checking if messages style has saved or not
        // if saved then set the color
        if (styles.messages_bg_color && styles.applyAEtCss == "addExtensionCss") {
            document.getElementById('messagesColorPicker').jscolor.fromString(styles.messages_bg_color);
        }

        if (styles.messages_font_color && styles.applyAEtCss == "addExtensionCss") {
            document.getElementById('messagesTextColor').jscolor.fromString(styles.messages_font_color);
             propertyObj = { todo: "messagesChangeTextColor", clickedColor: styles.messages_font_color };
        }


        // if (styles.applyAEtCss == "addExtensionCss") {
        //     $("#toggleCss").prop("checked", true);
        //     showColorPicker(true);
        // }
        // else {
        //     $("#toggleCss").prop("checked", false);
        //     showColorPicker(false);
        // }
    });




    // Question marks style color pickers
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



    // Messages style color pickers
    $("#messagesColorPicker").on("change paste keyup", function () {
        var mBgColor = $(this).val();

        
        var propertyObj = { todo: "messagesChangeColor", clickedColor: mBgColor };
        changeColor(propertyObj);

        var toSave = { "messages_bg_color": mBgColor };
        saveToChrome(toSave);
       
    });

    $("#messagesTextColor").on("change paste keyup", function () {
        var mtextColor = $(this).val();

        
        var propertyObj = { todo: "messagesChangeTextColor", clickedColor: mtextColor };
        changeColor(propertyObj);


        var toSave = { "messages_font_color": mtextColor };
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
            $("#colorPockersContainer").removeClass("ColorPickerhidden");
        }
        else {
            $("#colorPockersContainer").addClass("ColorPickerhidden");
        }
    }


    function saveToChrome(obj) {
        chrome.storage.sync.set(obj, function () {
            console.log(obj);

        });
    }

    function addRemoveExtensionStyle(action) {
        chrome.storage.sync.get(["bg_color", "font_color", "messages_bg_color", "messages_font_color"], function (styles) {

            var bgClr = "14BFF4";
            var fontClr = "ffffff";

            
            var mbgClr = "37A000";
            var mfontClr = "ffffff";

            if (styles.bg_color && action == "addExtensionCss") {
                bgClr = styles.bg_color;
                document.getElementById('colorPicker').jscolor.fromString(styles.bg_color);

            }

            if (styles.font_color && action == "addExtensionCss") {
                fontClr = styles.font_color;
                
                document.getElementById('textColor').jscolor.fromString(styles.font_color);
            }

            if (styles.messages_bg_color && action == "addExtensionCss") {
                mbgClr = styles.messages_bg_color;
                
                document.getElementById('messagesColorPicker').jscolor.fromString(styles.messages_bg_color);
            }

            if (styles.messages_font_color && action == "addExtensionCss") {
                mfontClr = styles.messages_font_color;
                
                document.getElementById('messagesTextColor').jscolor.fromString(styles.messages_font_color);
            }

            var propertyObj = { todo: action, clickedColor: bgClr, fontColor: fontClr, delaytime: 0, mclickedColor: mbgClr, mfontColor: mfontClr };

            changeColor(propertyObj);

        });
    }
});