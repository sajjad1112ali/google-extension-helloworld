

$(function(){

    chrome.storage.sync.set({"limit": 100}, function(){});

    chrome.storage.sync.get(["total", "limit"], function(budget){
        $("#total").text(budget.total);
        $("#limit").text(budget.limit);
    });


    $("#spendBtn").click(function(){
        var spendAmount = $("#spendAmount").val();
        addTotal(spendAmount);

    });
});