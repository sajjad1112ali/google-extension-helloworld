
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