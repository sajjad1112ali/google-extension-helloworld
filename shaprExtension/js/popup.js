$(function () {


    chrome.storage.sync.get(["key"], function (styles) {

        if (styles.key) {
           console.log(styles.key);
        }
    });
    
});