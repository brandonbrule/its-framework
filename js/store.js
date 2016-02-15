// Store Rules
// Every module must go through the store
// Every module must be served the event date
// Your module must decide what's important
var Store = (function() {
  
  var init = function(data) {

    // State Module
    // State of all its-control
    var state = State.init(data);
    
    // Update its-view elements 
    // with coorisponding control value.
    Views.init(data);

    // Button Active
    // Simple module that styles buttons
    Buttons.init(data);

    // Dynamically Added
    // Dynamic added Views will need to update view cache
    // see Dynamic Module for Example - Views.cacheViews();
    Dynamic.init(data);

    // Export Module
    // Mostly for Presenting State in Pre Tags
    // But serves as an example of how to extend modules
    Export.init(state, document.querySelector('[its-view="state"]'));
    Export.init(data, document.querySelector('[its-view="event"]'));
  };

  return {
    init: init
  };

})();