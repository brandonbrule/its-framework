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
      if (data.element.innerHTML) {
        data.innerHTML = data.element.innerHTML;
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
          if (data.element_type === 'BUTTON'){
            data.changed = false;
            data.value = '';
            control_history[data.control][0].value = '';
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
      data.element_type = null;
      return data;
    }
    
    // If its any other event
    data.element = e.target;
    data.element_type = e.target.nodeName;
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
    }

    return data;
    
  };

  // Receive eventListeners 
  // Distribute to Store
  var init = function(e) {
      var data = Publish(e);
      Store.init(data);
  };
  return {
    init: init
  };
})();