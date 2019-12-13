var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create(contextMenuItem);
   });


chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText)
    {
    
        if(isInt(clickData.selectionText))
        {
            addTotal(clickData.selectionText);
        
        }
    }
});


chrome.storage.onChanged.addListener(function(change, storageName){
   
    chrome.browserAction.setBadgeText({"text": change.total.newValue.toString()});
});



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
        $("#total").text(newTotal);
        $("#spendAmount").val("");
    });}