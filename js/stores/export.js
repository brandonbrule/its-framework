// Export
// Is a presentational helper
// For Demo Purposes
// It Prints out the Optional State Module and Event Chain 
var Export = (function() {

  var last_control=[{control: null, event_type: null}];

  // For Demo
  // Shows Optional State Module
  var state = function(data, element){
    if (element.getAttribute('its-view') === 'state'){
      var str = JSON.stringify(data, null, 4);
      element.innerHTML=str;
    }
  }

  // For Demo
  // Shows Events
  // Shows Same Event Order
  var view = function(data, element){
    if (element.getAttribute('its-view') === 'event'){

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

      // If the controls are different all together
      // Clear Display and 
      } else {
        element.innerHTML = '';
        element.insertBefore(pre, element.firstChild);
      }
    }
  };

  return {
    view: view,
    state: state
  };

})();