// Functions
var Troubleshoot = (function() {
  
  var control = function(data) {
    if(data.control){
      its.clearAll();
      its.a(data);
    }
  };

  return {
    control: control
  };

})();