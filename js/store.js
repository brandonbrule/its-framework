// Functions
var Store = (function() {
  
  var init = function(data) {
    Views.init(data);
    Buttons.init(data);
    Export.init(data);
    Dynamic.init(data);
    Troubleshoot.control(data);
  };

  return {
    init: init
  };

})();