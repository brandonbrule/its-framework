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
      var element = cache[type].element[index];
      
      // Update Values for Controls
      if (type === 'controls'){

        // Inputs, Text Areas, Everything But Buttons So Far
        if (element.nodeName !== 'BUTTON'){

          // Max range adjustments if needed
          if (element.getAttribute('type') === 'number' && element.getAttribute('type') === 'range'){
            if (element.max < data.value && !element.max){
              element.max = data.value;
            }
          }

          // Keep other input types in sync
          if ( element.getAttribute('type') !== 'radio' && element.getAttribute('type') !== 'checkbox' && element.getAttribute('type') !== 'submit'){
            element.value = data.value;
          }

        }

      // If it's a View (Not a Control);
      } else {
        element.innerHTML = data.value;
      }
    });
  };
  
  var init = function(data) {
    if (data.changed && data.control) {
      update(data, 'views');
      update(data, 'controls');
    }

    if (data.element_type === 'BUTTON'){
      update(data, 'views');
    }
  };

  return {
    init: init,
    cacheViews: cacheViews
  };

})();

Views.cacheViews();