$(function(){

    chrome.storage.sync.get("total", function(budget){
          
        $("#total").text(budget.total);
    });


    $("#spendBtn").click(function(){
        $("#total").text("sdfasfasff");
        chrome.storage.sync.get("total", function(budget){
            
            newTotal = 0;
            if(budget.total)
            {
                newTotal += parseInt(budget.total);
            }

            var spendAmount = $("#spendAmount").val();
            if(spendAmount)
            {
                newTotal += parseInt(spendAmount);
            }

            chrome.storage.sync.set({"total": newTotal}, function(){
                console.log("updated");
            });
            $("#total").text(newTotal);
            $("#spendAmount").val("");
        });
    });
});