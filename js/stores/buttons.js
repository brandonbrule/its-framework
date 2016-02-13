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


// Functions
var Export = (function() {
  var exportdata = {};

  var update = function(){
    var str = json(exportdata);
    var el = document.querySelector('[its-view="data-export"]');
    el.innerHTML=str;
  }

  var json = function(obj){
    return JSON.stringify(obj);
  };
  
  var init = function(data) {
    
    if(data.control){
      exportdata[data.control] = data.element.value;
      update();
    }
    
  };

  return {
    init: init
  };

})();