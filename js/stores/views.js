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
      
      // Update Values for Controls
      if (type === 'controls'){

        // Inputs, Text Areas, Everything But Buttons So Far
        if (cache[type].element[index].nodeName !== 'BUTTON'){


          if (cache[type].element[index].max < data.value && !cache[type].element[index].max && cache[type].element[index].getAttribute('type') !== 'text'){
            cache[type].element[index].max = data.value;
          }


          cache[type].element[index].value = data.value;
        }


      // Everything that isn't a control. AKA Views.
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