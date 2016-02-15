// Functions
var State = (function() {
  var state = {};

  var init = function(data) {
    
    if(data.type !== 'submit'){
      state[data.control] = data.element.value;
    }

    // If empty delete object property
    if (state[data.control] === ''){
      delete state[data.control];
    }

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

    return state;
    
  };

  return {
    init: init
  };

})();