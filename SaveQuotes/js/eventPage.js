var contextMenuItem = {
    "id": "SaveQuote",
    "title": "SaveQuote",
    "contexts": ["selection"]
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create(contextMenuItem);
   });


chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "SaveQuote" && clickData.selectionText)
    {
        chrome.storage.sync.get('quotes', function(quotesObj) {
    
            var quotes = quotesObj.quotes;
            if (typeof quotes !== "undefined" && quotes != null) {
                quotes.push(clickData.selectionText);
            }
            else
            {
                quotes = [clickData.selectionText];
            }

            // Saving Quotes to array
            chrome.storage.sync.set({"quotes": quotes}, function(){});
            
          });



    }
});


// chrome.storage.onChanged.addListener(function(change, storageName){
   
//     chrome.browserAction.setBadgeText({"text": change.total.newValue.toString()});
// });



function isInt(value)
{
    return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}


function addTotal(spendAmount)
{

    chrome.storage.sync.get(["total", "limit"], function(budget){
        newTotal = 0;
        if(budget.total)
        {
            newTotal += parseInt(budget.total);
        }
    
        if(spendAmount)
        {
            newTotal += parseInt(spendAmount);
        }
    
        chrome.storage.sync.set({"total": newTotal}, function(){
            if(newTotal && newTotal >= budget.limit)
            {
                var notifOption = {
                    "type": "basic",
                    "iconUrl": "icon48.png",
                    "title": "Limit reached!",
                    "message": "Uh Oh! Looks like you reached your limit!"
                };
                chrome.notifications.create("limitReachedNotif", notifOption);
            }
        });
    });}