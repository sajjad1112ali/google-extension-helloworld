$(function(){

    chrome.storage.sync.get(['quotes', 'likedQuotes'], function(quotesObj) {
        const quotesList = document.querySelector('#quotes-list');
        const likedQuotesList = document.querySelector('#liked-quotes-list');

        var quotes = quotesObj.quotes;

        var likedQuotes = typeof quotesObj.likedQuotes != "undefined" && quotesObj.likedQuotes != null ? quotesObj.likedQuotes : [];

        if (typeof quotes != "undefined" && quotes != null) {
            $("#resetQuot").css("display", "inline-block");
            addToList("showLiked", likedQuotes, quotesList, quotes);
        }
        else
        {
            // Adding List empty message
            $("#resetQuot").css("display", "none");
            addEmptyToList(quotesList, "There is nothing!");
        }

      });// End getting and showing saved quotes

    // Liked Tab clicked
    $("#likedTab").click(showLikedQuotes);  

    $("#resetQuot").click(function(){
        chrome.storage.sync.set({"quotes": null, "likedQuotes": null }, function(){
            close();
        });
    });


function showLikedQuotes()
{    
    chrome.storage.sync.get(['quotes', 'likedQuotes'], function(quotesObj) {
    const likedQuotesList = document.querySelector('#liked-quotes-list');
    likedQuotesList.innerHTML="";
    var quotes = quotesObj.quotes;

    var likedQuotes = typeof quotesObj.likedQuotes != "undefined" && quotesObj.likedQuotes != null ? quotesObj.likedQuotes : [];

    // Displaying Liked Quotes
    if (likedQuotes.length) {
        addToList('showLikedQuotes', quotes, likedQuotesList, likedQuotes);
    }
    else
    {
        // Adding List empty message
        addEmptyToList(likedQuotesList, "You have not liked any quote");
    } 

  }); // Getting Saved Quotes End    
}


function heartClicked(i, element){

    chrome.storage.sync.get('likedQuotes', function(likedQuotesObj) {


        var likedQuotes = likedQuotesObj.likedQuotes;

        if($(element).attr('class') == 'like')
        {
            $(element).addClass('liked');
            if (typeof likedQuotes !== "undefined" && likedQuotes != null) {
                likedQuotes.push(i);
            }
            else
            {
                likedQuotes = [i];
            }
    
            updateLiked(likedQuotes);
                       
        }
        else
        {
            likedQuotes.splice(likedQuotes.indexOf(i),1);
            console.log("Before removing");
            console.log(likedQuotes);
            updateLiked(likedQuotes);
            
            $(element).removeClass('liked');
        } // End check class

      }); // END get likedQuotes



}// End heartClicked 

    function updateLiked(likedQuotes)
    {
        
        console.log("In function ");
        console.log(likedQuotes);
        chrome.storage.sync.set({"likedQuotes": likedQuotes}, function(){}); 
    }

    
    function addEmptyToList(addTo, msg)
    {
       
        let li = document.createElement('li');
        li.textContent = msg;
        addTo.appendChild(li);
    }    

    function addToList(quoteIndicator, likedQuotes, addToOrderList, quotesToShow)
    {
        console.log(quotesToShow);
        console.log(likedQuotes);
        quotesToShow.reverse().forEach(function (value, index) {
                
            let li = document.createElement('li');
            let span = document.createElement('span');
            
            if (quoteIndicator != "showLikedQuotes") {
             span.className = likedQuotes.includes(index) ? "like liked pointer" : "like pointer";
             span.title = likedQuotes.includes(index) ? "Remove from like" : "like this quote";
             li.textContent = value;
            }
            else
            {
                span.className = "like liked";
                li.textContent = likedQuotes[quotesToShow[index]];
                span.onclick = function() { heartClicked(index, span); };
            }
            span.textContent = '\u2665';
            span.onclick = function() { heartClicked(index, span); };
            li.appendChild(span);
            addToOrderList.appendChild(li);  
        });
    }

});