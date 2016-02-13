var Dispatch = (function() {
  var event;
  
  var data = {
    changed: null,
    event_type: null,
    element: null,
    type: null,
    value: null,
    control: null,
    view: null,
    history: []
  };

  var Publish = function(e) {
    
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

    // If it's a view
    if (e.target.hasAttribute('its-view')) {
      data.view = e.target.getAttribute('its-view');
    } else {
      data.view = false;
    }

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

      // Text
      if (e.target.innerHTML) {
        data.innerHTML = e.target.innerHTML;
      } else {
        data.innerHTML = null;
      }

      // History
      if (data.history.length === 0) {
        data.history.push({
          value: e.target.value,
          innerHTML: e.target.innerHTML
        })
      }

      // Limit history changes
      if (data.history.length === 2) {
        data.history.pop();
      }

      if ( (data.value === data.history[0].value || data.innerHTML === data.history[0].innerHTML ) && data.history.length <= 2) {
        data.changed = false;
      } else {
        data.changed = true;
        data.history.unshift({
          value: data.value,
          innerHTML: e.target.innerHTML
        })
      }

      if (data.type === 'checkbox' || data.type === 'radio'){
        data.changed = true;
      }

    // It's a submit button  
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