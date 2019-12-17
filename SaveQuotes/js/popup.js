

$(function(){

    chrome.storage.sync.get('quotes', function(quotesObj) {
        const quotesList = document.querySelector('#quotes-list');

        var quotes = quotesObj.quotes;
        if (typeof quotes != "undefined" && quotes != null) {
            $("#resetQuot").css("display", "inline-block");

          quotes.reverse().forEach(element => {
                let li = document.createElement('li');
                li.textContent = element;
                quotesList.appendChild(li);
            });
        }
        else
        {
            $("#resetQuot").css("display", "none");
            let li = document.createElement('li');
            li.textContent = "Quotes list is empty!";
            quotesList.appendChild(li);
        }
      });


    $("#resetQuot").click(function(){
        chrome.storage.sync.set({"quotes": null }, function(){
            close();
        });

    });
});