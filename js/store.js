// Functions
var Store = (function() {
  
  var init = function(data) {
    Troubleshoot.control(data);
    Views.init(data);
    Buttons.init(data);
    Export.init(data);
    Dynamic.init(data);
  };

  return {
    init: init
  };

})();