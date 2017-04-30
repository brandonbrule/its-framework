// Functions
var Views = (function() {
  var cache = {
    views: {
      type: [],
      element: []
    },
    controls: {
      type: [],
      element: []
    },
  };

  var returnIndexes = function(array, value) {
    var i = -1,
      arr = [];
    while ((i = array.indexOf(value, i + 1)) !== -1) {
      arr.push(i);
    }
    return arr;
  }


  // Called on Load and as an Emergency 
  var cacheViews = function() {
    var views = document.querySelectorAll('[its-view]');
    var controls = document.querySelectorAll('[its-control]');

    cache.views.type = [];
    cache.views.element = [];
    [].forEach.call(views, function(view) {
      cache.views.type.push(view.getAttribute('its-view'));
      cache.views.element.push(view);
    });

    cache.controls.type = [];
    cache.controls.element = [];
    [].forEach.call(controls, function(control) {
      cache.controls.type.push(control.getAttribute('its-control'));
      cache.controls.element.push(control);
    });

  };


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


  // Get Reference Element From Cache Array
  // This is called twice, for its-control and its-view elements.
  // This needs to run twice because its possible to have uneven view/control ratio
  var update = function(control, value, type) {
    var indexes;
    if(value !== null && value.indexOf('.') !== -1){
      indexes = returnIndexes(cache[type].type, value);
      value = returnNestedProperty(value, State.Obj());
    } else {
      indexes = returnIndexes(cache[type].type, control);
    }


    // Updates the value of the elements from cache array
    // called twice for views and controls.
    [].forEach.call(indexes, function(index){
      var element = cache[type].element[index];
      
      // Update Values for Controls
      if (type === 'controls'){

        // Inputs, Text Areas, Everything But Buttons So Far
        if (element.nodeName !== 'BUTTON'){

          // Max range adjustments if needed
          if (element.getAttribute('type') === 'number' && element.getAttribute('type') === 'range'){
            if (element.max < value && !element.max){
              element.max = value;
            }
          }

          // Keep other input types in sync
          if ( element.getAttribute('type') !== 'radio' && element.getAttribute('type') !== 'checkbox' && element.getAttribute('type') !== 'submit'){
            element.value = value;
          }

          if (element.getAttribute('type') === 'radio' || element.getAttribute('type') === 'checkbox'){
            forButtons(element, control, value);
          }

      } else {
        forButtons(element, control, value);
      }

    } else {
      element.innerHTML = value;
    }
    });
  };


  // Set Active State on Buttons
  var forButtons = function(element, control_type, control_value){
      var indexes = returnIndexes(cache['controls'].type, control_type);
      var active_value = element.value;
      var active_group = element.getAttribute('its-control');
      [].forEach.call(indexes, function(index){
        var element = cache['controls'].element[index];
        if(element.getAttribute('its-control') === control_type){
          element.removeAttribute('its-active');
          element.checked = false;
        }
        if(element.value === control_value){
          if(element.nodeName === 'BUTTON'){
            element.setAttribute('its-active', true);
          }

          if (element.getAttribute('type') === 'radio' || element.getAttribute('type') === 'checkbox'){
            element.checked = true;
          }
        }
        
      });
  };


  // Update Control and View Elements From Cache Array
  // Update Values from a Fresh Reference to the State Object.
  var updateAll = function(ITS){
    state = ITS.state;

    // Update Control Elements
    [].forEach.call(cache.controls.element, function(element){
      var control = element.getAttribute('its-control');
      var value = state[control];
      
      if(control !== null && control.indexOf('.') !== -1){
        value = returnNestedProperty(control, state);
      }

      // If theres a value
      if (value){
      // Inputs, Text Areas, Everything But Buttons So Far
        if (element.nodeName !== 'BUTTON'){

          // Max range adjustments if needed
          if (element.getAttribute('type') === 'number' && element.getAttribute('type') === 'range'){
            if (element.max < value && !element.max){
              element.max = value;
            }
          }

          // Keep other input types in sync
          if ( element.getAttribute('type') !== 'radio' && element.getAttribute('type') !== 'checkbox' && element.getAttribute('type') !== 'submit'){
            element.value = value;
          }


        // If any of the elements is active,
        // Update other elements
        } else {
          if(element.hasAttribute('its-control') && element.getAttribute('its-active') === 'true'){
            var indexes = returnIndexes(cache['controls'].type, element.getAttribute('its-control'));
            var active_value = element.value;
            var active_group = element.getAttribute('its-control');
            [].forEach.call(indexes, function(index){
              var element = cache['controls'].element[index];
              if(element.getAttribute === active_group){
                element.removeAttribute('its-active');
              }
              if(element.value === active_value){
                if(element.nodeName === 'BUTTON'){
                  element.setAttribute('its-active', true);
                }
              }
              
            });
          }
          
        }

      }

    });

    // Update View Elements
    [].forEach.call(cache.views.element, function(element){
      var control = element.getAttribute('its-view');
      var value = state[control];

      if(control !== null && control.indexOf('.') !== -1){
        value = returnNestedProperty(control, state);
      }
      
      // If the state has a coorisponding value
      // Update the innerHTML, or value if its an input
      if(value){
        if (element.nodeName === 'TEXTAREA' || element.nodeName === 'INPUT'){
          element.value = value;
        } else {
          element.innerHTML = value;
        }
      }
    });
  };
  
  var init = function(ITS) {
    if (ITS.ev.changed && ITS.ev.control) {
      update(ITS.ev.control, ITS.ev.value, 'views');
      update(ITS.ev.control, ITS.ev.value, 'controls');
    }

    if (ITS.ev.nodeName === 'BUTTON'){
      update(ITS.ev.control, ITS.ev.value, 'views');
    }

    if (ITS.ev.event_type === 'load'){
      cacheViews();
      updateAll(ITS);
    }

  };

  return {
    init: init,
    cacheViews: cacheViews,
    update: update,
    updateAll: updateAll
  };

})();