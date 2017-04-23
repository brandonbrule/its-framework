// -- State Module -- //
// State Keeps track of all
// its-control properties and values
var State = (function() {
  var state = {};

  // If you want to access the last state
  var Obj = function(){
    return state;
  }


  // A Hard Refresh based off Element Info
  // Queries all its-control elements, and updates
  // state properties with its-control values
  // Can be access State.updateAll(); externally,
  // But is a last resort and should not be needed after load.
  var updateAll = function(){
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
  };

  var init = function(data) {
      
    // Don't keep track of submit values
    if(data.type !== 'submit'){
      state[data.control] = data.element.value;
    }

    // If it's a button and the state isn't changed
    // This sets up button values as toggle-able
    if (data.nodeName === 'BUTTON'){
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

    // If there's nothing, disregard from state.
    // (state obj.prop will still be undefined)
    if (state['null']){
      delete state['null'];
    }
    
    if(state['']){
      its.a('test');
      delete state[''];
    }

    
    // Initial Load
    // Query all the its-control elements
    // If they are a button and it's active,
    // If its checkbox or radio button
    // Let submit go through the event object, value never changes
    // event object lets you know if it was pressed.
    if(data.event_type === 'load'){
      updateAll();
    }

    // Yay Here's the State Object
    // Initial load is a bit, but smarter afterwards matching
    // State/Event Properties.
    return state;
    
  };

  return {
    init: init,
    Obj: Obj,
    updateAll: updateAll
  };

})();