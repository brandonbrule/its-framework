// Functions
var Export = (function() {

  var last_control=[{control: null, event_type: null}];

  var stateEvent = function(data, element){
    if (element.getAttribute('its-view') === 'state'){
      var str = JSON.stringify(data, null, 4);
      element.innerHTML=str;
    }
  }

  var viewEvents = function(data, element){
    if (element.getAttribute('its-view') === 'event'){
      var str = JSON.stringify(data, null, 4);
      var pre = document.createElement('pre');
          pre.innerHTML=str;
      
      if (element.children.length > 1){
        element.removeChild(element.childNodes[1]);
      }
      
      if (data.control === last_control[1].control){
        if (data.event_type === last_control[1].event_type){
          element.innerHTML = '';
        }
        element.insertBefore(pre, element.firstChild);
      } else {
        element.innerHTML = '';
        element.insertBefore(pre, element.firstChild);
      }
    }
  };

  var init = function(data, element) {
    var event_type;
    var control;

    if(data.event_type){
      event_type = data.event_type;
    } else {
      event_type = null;
    }

    if(data.control){
      control = data.control;
    } else {
      control = null;
    }
    // For Demo Display
    // Let user know data.element is the same as e.target
    if(data.element){
      data.element = 'e.target';
    }

    last_control.unshift( 
      { 
        control: control, 
        event_type: event_type
      }
    );

    if (last_control.length === 3){
      last_control.pop();
    }
    
    viewEvents(data, element);
    stateEvent(data, element);

    //its.a(last_control);

  };

  return {
    init: init
  };

})();