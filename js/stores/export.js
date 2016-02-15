// Functions
var Export = (function() {
  var init = function(data, element) {
    if(data.element){
      data.element = 'e.target';
    }
    var str = JSON.stringify(data, null, 4);
    element.innerHTML=str;
  };

  return {
    init: init
  };

})();