// -- Buttons Module -- //
// Sets Active Attributes to Buttons
// If the Buttons state has changed or not
// [its-active="true"]{ Active Styles }

var Buttons = (function() {

  // If it's a group of buttons
  // Remove active class from all of them
  var resetActive = function(name){
    var grouping = document.querySelectorAll('[its-control="'+ name +'"]');
    [].forEach.call(grouping, function(element){
      if(element.getAttribute('its-active')){
        element.removeAttribute('its-active');
      }
    });
  };


  // If Button has active state
  // Remove or Add Active
  var setActive = function(data){
    if(data.changed){
      data.element.setAttribute('its-active', true);
    } else {
      data.element.removeAttribute('its-active');
    }
  };
  
  // If button and data.changed set active state
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