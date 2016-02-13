// Functions
var Buttons = (function() {

  var resetActive = function(name){
    var grouping = document.querySelectorAll('[its-control="'+ name +'"]');
    [].forEach.call(grouping, function(element){
      if(element.classList.contains('active')){
        element.classList.remove('active');
      }
    });
  };

  var setActive = function(element){
    if(!element.classList.contains('active')){
      element.classList.add('active');
    }
  };
  
  var init = function(data) {
    if (data.element_type === 'BUTTON' && data.changed === true){
      resetActive(data.control);
      setActive(data.element);
    }
  };

  return {
    init: init
  };

})();