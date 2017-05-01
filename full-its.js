// actions.js
// -- Actions -- //
// Actions Rules **
// All Actions are binded once on the document
// All Actions must be sent to the Dispatcher
// Element specific event listeners should be contained in own module.

// KeyUp Event
document.addEventListener("keydown", function(e) {
	// Tab shift Tab doesn't trigger change (accessibility)
	// Ha, interesting, Spacebar on button registers as click
	// So it sends click and keypress with just keypress - only on buttons.
	if (e.keyCode !== 9 && e.keyCode !== 16 && e.keyCode !== 32) {
  		Dispatch.init(e);
	}
});


// KeyUp Event
document.addEventListener("keyup", function(e) {
	// Tab shift Tab doesn't trigger change (accessibility)
	// Ha, interesting, Spacebar on button registers as click
	// So it sends click and keypress with just keypress - only on buttons.
	if (e.keyCode !== 9 && e.keyCode !== 16 && e.keyCode !== 32) {
  		Dispatch.init(e);
	}
});


// Change Event
document.addEventListener("change", function(e) {
  Dispatch.init(e);
});

// Click Event
document.addEventListener('click', function(e) {
  Dispatch.init(e);
});

window.addEventListener("load", function(e){
	Dispatch.init(e);
});

// Create custom event
var customEvent = (function() {
	var event = document.createEvent("HTMLEvents");
	event.initEvent("its-test", true, true);
	event.eventName = "its-test";
	return event;
})();

document.addEventListener('its-test', function(e) {
	Dispatch.init(e);
});

// dispatcher.js
// -- Dispatcher -- //
// Dispatcher Rules **
// its-framework core
// If you absolutely need events to transfer more data
// Add it here - otherwise don't touch this.
// Add your own modules to the store.
var Dispatch = (function() {
  var event;
  var data = {
    changed: null,
    event_type: null,
    element: null,
    type: null,
    value: null,
    control: null
  };
  var control_history = {};

  // If element is its-control
  // if its-control there's extra data added
  var controlCheck = function(){
    if (data.element.hasAttribute('its-control')) {
      data.control = data.element.getAttribute('its-control');
    } else {
      data.control = null;
    }
  };


  // If Element Has Value
  // Like Button or Input
  var setValue = function(){
      if (data.element.value) {

        // If it's a checkbox
        // Toggle data.value if checked or not
        if (data.type === 'checkbox') {
          if (data.element.checked){
            data.value = data.element.value;
          } else {
            data.value = '';
          }

        // If it's any other type of input of button
        // We just set data.value as the element value
        } else {
          data.value = data.element.value;
        }

      // If the element has no value
      // set value to null;
      } else {
        data.value = null;
      }
  };


  // If Element has innerHTML
  // Textarea, Could be button without value.
  var setInnerHTML = function(){
      if (!data.element.value) {
        if(data.element.nodeName !== 'SELECT'){
          data.innerHTML = data.element.innerHTML;
        }
      } else {
        data.innerHTML = null;
      }
  };


  // controlHistory determines if the value
  // has changed or not and keeps
  // track of the last value.
  var controlHistory = function(){

    // If there's no action history on its-control
    // Create a new array with the value
    if (!control_history[data.control]){
      control_history[data.control] = [{
        value: data.value,
        innerHTML: data.innerHTML
      }];
      data.changed = true;
      return;
    }

    // If a history item has been set.
    if(control_history[data.control].length === 1){

      // If the history item and element value match
      // It hasn't been changed
      if (control_history[data.control][0].value === data.value){
          data.changed = false;
          // Unless it's a button.
          // Buttons can be same, or not even if values match.
          // This sets them as toggleable
          if (data.nodeName === 'BUTTON'){
            data.changed = false;

          }

          // Buttons toggle data change
          // Based off state
          if (data.type === 'checkbox'){
            if (data.element.checked){
              data.changed = true;
            }else{
              data.changed = false;
            }
          }

          // Submit and radio buttons always trigger change
          // Best way to leave them alone.
          if ( data.type === 'submit'){
            data.changed = true;
          }

      // If the history and element don't match
      // there's been a change and update the history with new value
      } else {
        data.changed = true;
        control_history[data.control][0].value = data.value;
        control_history[data.control][0].innerHTML = data.innerHTML;
      }

    }

  };

  var keyPress = function(e){
    if (e.keyCode){
      data.key = e.keyCode;
    } else {
      if (data.key){
        delete data.key;
      }
    }
  };


  // Publish assembles its-framework events
  // Deteremining if values have changed
  // It readys all this data to return
  // for the stores.
  var Publish = function(e) {

    // Event Type
    data.event_type = e.type;

    // If its a window event onload
    if (e.currentTarget === window){
      data.type = null;
      data.changed = true;
      data.control = null;
      data.element = 'window';
      data.nodeName = null;
      return data;
    }
    
    // If its any other event
    data.element = e.target;
    data.nodeName = e.target.nodeName;
    data.value = null;
    data.innerHTML = null;


    if (e.target.getAttribute('type')){
      data.type = e.target.getAttribute('type');
    } else {
      data.type = null;
    }

    // keyCode
    keyPress(e);

    // If the element is a control.
    controlCheck(e);
    if (data.control){
        setValue();
        setInnerHTML();
        controlHistory();
    } else {
      data.changed = null;
      setValue();
    }

    return data;
    
  };

  // Receive eventListeners 
  // Distribute to Store
  var init = function(e) {
      var ev = Publish(e);
      var state = State.init(ev);
      var data = {
        ev: ev,
        state: state
      };

      // State Module
      // State of all its-control
      

      // Update its-view elements 
      // with coorisponding control value.
      Views.init(data);
      
      if (typeof Store != "undefined") {
        Store.init(data);
      }
  };
  return {
    init: init,
  };
})();

// state.js
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

//views.js
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

// dynamic.js
// -- Dynamic Element Module -- //
// Tied to the Optional View Module
// Dynamic elements update Views.cacheView();
var Dynamic = (function() {
  
  var element = function(data) {
    if(data.control === 'new'){
      var view = data.element.parentNode;
      var div = document.createElement('textarea');
      div.setAttribute('class', 'dynamic-row');
      div.setAttribute('its-control', 'dynamic');
      
      if (document.querySelector('[its-control="dynamic"]')){
        div.value = document.querySelector('[its-control="dynamic"]').value;
      }
      
      view.appendChild(div);
      Views.cacheViews();
    }
  };

  return {
    element: element
  };

})();
