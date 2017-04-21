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

    // Dynamically Added
    // Dynamic added Views will need to update view cache
    // see Dynamic Module for Example - Views.cacheViews();
    Dynamic.element(data.ev);

    // Button Active
    // Simple module that styles buttons
    //Buttons.init(data);

    
    // Export Module
    // Export.state is tied to the State Module
    // Prints State and Event Chain
    Export.state(data.state, document.querySelector('[its-view="state"]'));
    Export.view(data.ev, document.querySelector('[its-view="event"]'));
  };

  return {
    init: init
  };

})();