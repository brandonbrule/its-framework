// Functions
var Store = (function() {
  
  var init = function(data) {
    Troubleshoot.control(data);
    Views.init(data);
    Buttons.init(data);
    Dynamic.init(data);
    Export.init(State.init(data));
  };

  return {
    init: init
  };

})();