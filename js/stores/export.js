// Functions
var Export = (function() {
  var init = function(data) {
    var str = JSON.stringify(data, null, 4);
    var el = document.querySelector('[its-view="export"]');
    el.innerHTML=str;
  };

  return {
    init: init
  };

})();