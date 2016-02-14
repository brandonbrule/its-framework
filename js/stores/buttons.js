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

  var setActive = function(element){
    if(element.hasAttribute('its-active')){
      element.removeAttribute('its-active');
    } else {
      element.setAttribute('its-active', true);
    }
  };
  
  var init = function(data) {
    if (data.control){
      if (data.element_type === 'BUTTON'){
        if(data.element.hasAttribute('its-active')){
          setActive(data.element);
        } else {
          resetActive(data.control);
          setActive(data.element);
        }
      }
    }
  };

  return {
    init: init
  };

})();