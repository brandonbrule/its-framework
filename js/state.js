// -- State Module -- //
// State Keeps track of all
// its-control properties and values
var State = (function() {
  var state = {};

  // If you want to access the last state
  var Obj = function(){
    return state;
  }

  var propObj = function(state, str_arr, value){
    lastKeyIndex = str_arr.length-1;
   for (var i = 0; i < lastKeyIndex; ++ i) {
     key = str_arr[i];

     if (!(key in state)){
       state[key] = {}
     }
     state = state[key];
     
   }
   state[str_arr[lastKeyIndex]] = value;
  }

  var buildObjectFromString = function(str, value){
    var str_arr = str.split('.');
    propObj(state, str_arr, value);
  };

  // This function will return a property inside a nested object by string.
  // This function needs two arguments
  // The property "prop", "prop.prop", "prop.obj.prop" - as a string.
  // The master object the properties are referencing.
  var returnNestedProperty = function(str, master_object) {
    
    // Break String Up by Period
    // This will form a new array of each "property"
    var str_array = str.split('.');
    
    // Hold a copy of each nested object properties.
    var tmp_obj = null;

    // Iterate over the input properties
    for (var i = 0; i < str_array.length; i++) {
      var current = str_array[i];
      
      // If tmp_obj initially is null
      // On the first iteration of object properties
      // We assign the first property of the State object to tmp_object
      if (!tmp_obj) {
        tmp_obj = master_object[current];
        
      // If tmp_obj is an object already
      // We will be on the next level of the object
      // At this level we're going to set tmp_obj
      // To the next nested object property.
      } else {
        tmp_obj = tmp_obj[current];
      }
      
    }

    return tmp_obj;

  };


  // A Hard Refresh based off Element Info
  // Queries all its-control elements, and updates
  // state properties with its-control values
  // Can be access State.updateAll(); externally,
  // But is a last resort and should not be needed after load.
  var updateAll = function(){
    var controls = document.querySelectorAll('[its-control]');
      [].forEach.call(controls, function(control){
          var control_type = control.getAttribute('its-control');
          var control_value = control.value;
          
          // its-control="OBJ.obj.prop"
          if(control_type.indexOf('.') !== -1){
            buildObjectFromString(control_type, control_value);


          // Standard state.prop relationship
          } else {

            if (control.nodeName === 'BUTTON'){
              if (control.getAttribute('its-active') === 'true'){
                state[control_type] = control_value;
              }
            } else {

              switch(control.getAttribute('type')) {
                case 'checkbox':
                    if (control.checked){
                      state[control_type] = control_value;
                    }
                    break;
                case 'radio':
                    if (control.checked){
                      state[control_type] = control_value;
                    }
                    break;
                default:

                  if (control.getAttribute('type') !== 'submit'){
                    if(control_value.length > 0){
                      state[control_type] = control_value;
                    }

                    if(state[control_type]){
                      control_value = state[control_type];
                    }
                  }
                  break;
                }

            }
          }
      });
  };

  var init = function(data) {


    if(data.control){
      

      // If there's . in prop name treat it like nested object
      if(data.control.indexOf('.') !== -1){
        buildObjectFromString(data.control, data.value);
      

      // Just a regular property item value
      }  else {

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
          delete state[''];
        }

      }
      
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