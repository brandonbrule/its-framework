// -- State Module -- //
// State Keeps track of all
// its-control properties and values
var State = (function() {
  var state = {};

  // If you want to access the last state
  var Obj = function(){
    return state;
  }


  // Return Arr of Strings like Obj.Prop.obj.prop
  var strFromObj = function(label, obj) {
    var label = label + '.';
    var str = label;
    var arr = [];

    function eachRecursive(obj) {
      for (var k in obj) {
        str = str + k;
        if (typeof obj[k] == "object" && obj[k] !== null) {
          str = str + ".";
          eachRecursive(obj[k]);
        } else {
          arr.push(str);
          str = label;
        }
      }

      return arr;
    }

    return eachRecursive(obj);
  };

  var buildObjectFromString = function(state, str_arr, value){
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
            if(control_value){
            var str_arr = control_type.split('.');
              buildObjectFromString(state, str_arr, control_value);
            }

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

  

  var Set = function(control, value){
    var state = State.Obj();
    state[control] = value;
    
    if(state[control] !== null && typeof state[control] === 'object'){
      var str_arr = strFromObj(control, state[control]);
      [].forEach.call(str_arr, function(obj_str){
        Views.update(control, obj_str, 'views');
      });
    } else {
      Views.update(control, value, 'views');
    }

    
  };

  var init = function(data) {


    if(data.control){
      

      // If there's . in prop name treat it like nested object
      if(data.control.indexOf('.') !== -1){
        var str_arr = data.control.split('.');
        buildObjectFromString(state, str_arr, data.value);
      

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
    Set: Set,
    Obj: Obj,
    updateAll: updateAll
  };

})();