// Functions
var Buttons = (function() {

  var resetActive = function(name){
    var grouping = document.querySelectorAll('[its-control="'+ name +'"]');
    [].forEach.call(grouping, function(element){
      if(element.getAttribute('its-active')){
        element.removeAttribute('its-active');
      }
    });
  };

  var setActive = function(data){
    if(data.changed){
      data.element.setAttribute('its-active', true);
    } else {
      data.element.removeAttribute('its-active');
    }
  };
  
  var init = function(data) {
    if (data.control){
      if (data.element_type === 'BUTTON'){
        if(data.changed === true){
          resetActive(data.control);
          setActive(data);
        } else {
          setActive(data);
        }
      }
    }
  };

  return {
    init: init
  };

})();