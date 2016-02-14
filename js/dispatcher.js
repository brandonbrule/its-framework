var Dispatch = (function() {
  var event;
  
  var data = {
    changed: null,
    event_type: null,
    element: null,
    type: null,
    value: null,
    control: null,
    history: []
  };

  var Publish = function(e) {
    //its.clearAll();
    data.event_type = e.type;
    data.element = e.target;
    data.element_type = e.target.nodeName;
    data.type = e.target.getAttribute('type');
    

    // If it's a control
    if (e.target.hasAttribute('its-control')) {
      data.control = e.target.getAttribute('its-control');
    } else {
      data.control = null;
    }

    // If It's an input value but not submit.
    // Buttons with values also work here
    if ( data.type !== 'submit') {

      // Value
      if (e.target.value) {
        if (data.type === 'checkbox') {
          if (e.target.checked){
            data.value = e.target.value;
          } else {
            data.value = '';
          }
        } else {
          data.value = e.target.value;
        }
      } else {
        data.value = null;
      }

      // If it's innerHTML Like textarea
      if (e.target.innerHTML) {
        data.innerHTML = e.target.innerHTML;
      } else {
        data.innerHTML = null;
      }


      // History
      // Basically it creates the last value or innerHTML of an input of button
      // By comparing the current value with the history we can determine if there's been a change.

      // Create First History Item - First Action
      if (data.history.length === 0) {
        data.history.push({
          value: e.target.value,
          innerHTML: e.target.innerHTML
        });
        data.changed = true;

      // Now That There is History
      } else {
        
        // Limit history to 1 extra item for comparison.
        if (data.history.length === 2) {
          data.history.pop();
        }

        // Does the value or innerHTML match the last history? 
        //If it does then it hasn't changed.
        if ( (data.value === data.history[0].value || data.innerHTML === data.history[0].innerHTML )) {
          
          // Buttons are a little different
          // We detect if its been changed even if the value is the same
          if (data.element_type === 'BUTTON'){
            if (data.changed){
              data.changed = false;
            } else {
              data.changed = true;
            }

          // Everything else the value is the same
          // So it hasn't changed
          }else{
            data.changed = false;
          }


        // The Value has been Changed from History
        // If the value or innerHTML is different than the last history it's been changed
        // and bump in the new history item
        } else {
          data.changed = true;
          data.history.unshift({
            value: data.value,
            innerHTML: e.target.innerHTML
          });
        }

      }

      // Checkboxes and radio buttons technically always change.
      if (data.type === 'checkbox' || data.type === 'radio'){
        data.changed = true;
      }


    // It's a submit button
    // its-framework leaves submit buttons alone
    // The Dispatch pulse will still give you what you need
    // To set up your own funtions.
    } else {
      data.changed = false;
      data.value = data.element.value;
      data.innerHTML = null;
    }

        
    return data;
    
  };

  var init = function(e) {
      var data = Publish(e);
      Store.init(data);
  };
  return {
    init: init
  };
})();