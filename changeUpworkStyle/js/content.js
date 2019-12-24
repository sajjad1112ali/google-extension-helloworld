$(function(){

  var customLogo = ' <img src="https://raw.githubusercontent.com/sajjad1112ali/google-extension-helloworld/master/changeUpworkStyle/images/Upwork-logo-black.png" class="img-fluid" style="width: 100%;">';
  $("[data-cy='brand']").html(customLogo);
    var images = document.getElementsByTagName('img');
    for (var i = 0, l = images.length; i < l; i++) {
      images[i].src = 'https://raw.githubusercontent.com/sajjad1112ali/google-extension-helloworld/master/changeUpworkStyle/images/Upwork-logo-black.png';
    }    

});