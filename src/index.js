//Only inject script if swagger ui is available

var s = document.createElement("script");
s.src = chrome.runtime.getURL("src/script.js");
s.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);
