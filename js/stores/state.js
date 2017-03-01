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

    // If it's a button and the state isn't changed
    // This sets up button values as toggle-able
    if (data.element_type === 'BUTTON'){
      if (!data.element.value){
        delete state[data.control];
      }
    }

    // If checkbox and its unchecked delete property
    if (data.type === 'checkbox'){
      if (!data.element.checked){
        delete state[data.control];
      }
    }

    if (state['null'] === undefined){
      delete state['null'];
    }

    
    if(data.event_type === 'load'){

      var controls = document.querySelectorAll('[its-control]');
      [].forEach.call(controls, function(control){
          var control_type = control.getAttribute('its-control');

          if (control.nodeName === 'BUTTON'){
            if (control.getAttribute('its-active') === 'true'){
              state[control_type] = control.value;
            }
          } else {

            switch(control.getAttribute('type')) {
              case 'checkbox':
                  if (control.checked){
                    state[control_type] = control.value;
                  }
                  break;
              case 'radio':
                  if (control.checked){
                    state[control_type] = control.value;
                  }
                  break;
              default:

                if (control.getAttribute('type') !== 'submit'){
                  if(control.value.length > 0){
                    state[control_type] = control.value;
                  }

                  if(state[control_type]){
                    control.value = state[control_type];
                  }
                }
                break;
              }

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