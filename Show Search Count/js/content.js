$(function () {
  chrome.runtime.sendMessage({ todo: "showPageAction" });
  console.log("Function is running. . .");

  var timer = setInterval(checkCount, 1000);

  function checkCount() {
    let item = $("span[data-freelancer-count]");
    if (item.length > 0) {
      let counts = item.attr("data-freelancer-count");
      item.text(`Total Counts = ${counts}`).removeClass("d-none").css({
        display: "inline-block",
        paddingTop: "30px",
      });

      clearInterval(timer);
    }
  }
});
