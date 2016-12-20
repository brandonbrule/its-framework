// -- State Module -- //
// State Keeps track of all
// its-control properties and values
var State = (function() {
  var state = {};

  var Obj = function(){
    return state;
  }

  var init = function(data) {
      
    // Don't keep track of submit values
    if(data.type !== 'submit'){
      state[data.control] = data.element.value;
    }

    // If empty delete object property
    if (state[data.control] === '' || state[data.control] !== null){
      delete state[data.control];
    }

    // If it's a button and the state isn't changed
    // This sets up button values as toggle-able
    if (data.element_type === 'BUTTON'){
      if (data.changed === false){
        delete state[data.control];
      }
    }

    // If checkbox and its unchecked delete property
    if (data.type === 'checkbox'){
      if (!data.element.checked){
        delete state[data.control]
      }
    }

    
    if(data.event_type === 'load'){
      var controls = document.querySelectorAll('[its-control]');
      [].forEach.call(controls, function(control){
        if(control.value){
          state[control.getAttribute('its-control')] = control.value;
        }
      });
    }

    return state;
    
  };

  return {
    init: init,
    Obj: Obj
  };

})();