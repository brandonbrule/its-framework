// -- Export Module -- //
// Presentational helper
// For Demo Purposes
// It Prints out the Optional State Module and Event Chain 
var Help = (function() {

  var last_control=[{control: null, event_type: null, value: null}];

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
      var pre = document.createElement('pre');
      var event_type;
      var control;

      // For Demo Only
      // Don't do this unless
      // You want to lose reference to the element
      // Let user know data.element is the same as e.target
      if(data.element){
        if (data.element !== 'window'){
          data.element = 'e.target';
        }
      }

      

      // If it's an event remember what type it was
      if(data.event_type){
        event_type = data.event_type;
      } else {
        event_type = null;
      }

      // If its a its-control remember what control
      if(data.control){
        control = data.control;
      } else {
        control = null;
      }

      // Most recent event and control Event
      last_control.unshift( 
        { 
          control: control, 
          event_type: event_type,
          value: data.value
        }
      );

      // Remove after 2 events.
      // So we can show
      // Click && Change
      if (last_control.length === 3){
        last_control.pop();
      }

      // Remove display element if theres more than 2
      if (element.children.length > 1){
        element.removeChild(element.childNodes[0]);
      }
      
      // If the this control and the last control are the same
      // We want to show both events
      if (data.control === last_control[1].control){

        // If the last event type is the same
        // for example clicked twice without change
        if (data.event_type === last_control[1].event_type){
          element.innerHTML = '';
        }

        if (data.value !== last_control[1].value){
          element.innerHTML = '';
        }

        pre.innerHTML=JSON.stringify(data, null, 4);
        //element.insertBefore(pre, element.firstChild);
        element.appendChild(pre);

      // If the controls are different all together
      // Clear Display and show new event
      } else {
        pre.innerHTML=JSON.stringify(data, null, 4);
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