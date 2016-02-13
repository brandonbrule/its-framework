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
  // new message: raise newMessage event
  var Publish = function(e) {

    data.event_type = e.type;
    data.element = e.target;
    data.type = e.target.nodeName;

    // Value
    if (e.target.value) {
      data.value = e.target.value;
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

    Stores.init(data);
  };

  var init = function(e) {
    Publish(e);
  };
  return {
    init: init
  };
})();

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

  var cacheViews = function() {
    var views = document.querySelectorAll('[its-view]');
    var controls = document.querySelectorAll('[its-control]');

    [].forEach.call(views, function(view) {
      cache.views.type.push(view.getAttribute('its-view'));
      cache.views.element.push(view);
    });

    [].forEach.call(controls, function(control) {
      cache.controls.type.push(control.getAttribute('its-control'));
      cache.controls.element.push(control);
    });

  };

  var update = function(data, type) {
    var indexes = returnIndexes(cache[type].type, data.control);
    [].forEach.call(indexes, function(index){
      if (type === 'controls'){
        if (cache[type].element[index].nodeName !== 'BUTTON'){
          cache[type].element[index].value = data.value;
        }
      } else {
        cache[type].element[index].innerHTML = data.value;
      }
    });
  };
  
  var init = function(data) {
    if (data.changed && data.control) {
      update(data, 'views');
      update(data, 'controls');
    }
  };

  return {
    init: init,
    cacheViews: cacheViews
  };

})();

Views.cacheViews();





// Functions
var Stores = (function() {
  
  var init = function(data) {
    Views.init(data);
  };

  return {
    init: init
  };

})();





// Actions

document.addEventListener("keyup", function(e) {
  Dispatch.init(e);
});

document.addEventListener("change", function(e) {
  Dispatch.init(e);
});

document.addEventListener('click', function(e) {
  Dispatch.init(e);
});