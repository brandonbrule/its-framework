var Dispatch = (function() {
  var event;
  var data = {
    changed: null,
    event_type: null,
    element: null,
    type: null,
    value: null,
    text: null,
    control: null,
    view: null,
    history: []
  };
  var Publish = function(e) {
    data.event_type = e.type;
    data.element = e.target;
    data.element_type = e.target.nodeName;

    // Value
    if (e.target.value) {
      if (e.target.getAttribute('type') === 'checkbox') {
        if (e.target.checked){
          data.value = e.target.value;
        } else {
          data.value = null;
        }
      } else {
        data.value = e.target.value;
      }
    } else {
      data.value = null;
    }



    // Text
    if (e.target.innerHTML) {
      data.text = e.target.innerHTML;
    } else {
      data.text = null;
    }

    // If it's a control
    if (e.target.hasAttribute('its-control')) {
      data.control = e.target.getAttribute('its-control');
    } else {
      data.control = false;
    }

    // If it's a view
    if (e.target.hasAttribute('its-view')) {
      data.view = e.target.getAttribute('its-view');
    } else {
      data.view = false;
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

    if (data.value === data.history[0].value || data.innerHTML === data.history[0].innerHTML) {
      data.changed = false;
    } else {
      data.changed = true;
      data.history.unshift({
        value: data.value,
        innerHTML: e.target.innerHTML
      })
    }

    Store.init(data);
  };

  var init = function(e) {
    Publish(e);
  };
  return {
    init: init
  };
})();