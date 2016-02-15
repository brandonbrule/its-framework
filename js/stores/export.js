// Functions
var Export = (function() {
  var init = function(data, element) {
    var str = JSON.stringify(data, null, 4);
    element.innerHTML=str;
  };

  return {
    init: init
  };

})();