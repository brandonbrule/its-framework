// Functions
var Store = (function() {
  
  var init = function(data) {
    Views.init(data);
    Buttons.init(data);
  };

  return {
    init: init
  };

})();