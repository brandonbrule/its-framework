// Functions
var Export = (function() {
  var init = function(data, element) {
    if(data.element){
      data.element = 'e.target but data.element';
    }
    var str = JSON.stringify(data, null, 4);
    element.innerHTML=str;
  };

  return {
    init: init
  };

})();