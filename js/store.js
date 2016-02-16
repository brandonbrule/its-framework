// -- Store -- //
// Store Rules **
// Every module must go through the store
// Every module must be served the event data
// Your module must decide what's important
var Store = (function() {
  

  // All Modules
  // Are Purely Optional
  // Add your own Functions
  // Your funtion must determine if data matters
  var init = function(data) {

    // State Module
    // State of all its-control
    var state = State.init(data);
    
    // Update its-view elements 
    // with coorisponding control value.
    Views.init(data);

    // Dynamically Added
    // Dynamic added Views will need to update view cache
    // see Dynamic Module for Example - Views.cacheViews();
    Dynamic.element(data);

    // Button Active
    // Simple module that styles buttons
    Buttons.init(data);

    
    // Export Module
    // Export.state is tied to the State Module
    // Prints State and Event Chain
    Export.state(state, document.querySelector('[its-view="state"]'));
    Export.view(data, document.querySelector('[its-view="event"]'));
  };

  return {
    init: init
  };

})();