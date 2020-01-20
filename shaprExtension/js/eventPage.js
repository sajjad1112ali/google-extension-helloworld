chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.todo == "showPageAction") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });        
        
    }
});

// chrome.tabs.onActiveChanged.addListener(function(activeInfo) {

//   });

//   chrome.tabs.onActivated.addListener( function(info) {
//     var tabId    = info.tabId,
//         windowId = info.windowId;
//         console.log("URL CHANGES 1 ");
//         console.log(activeInfo);
// });
// chrome.tabs.onActiveChanged.addListener( function(tabId, info) {
//     tabId        = tabId;         // For comparison
//     var windowId = info.windowId;
//     console.log("URL CHANGES 2 ");
//     console.log(activeInfo);
// });