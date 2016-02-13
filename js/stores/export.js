// Functions
var Export = (function() {
  var exportdata = {};

  var update = function(){
    var str = JSON.stringify(exportdata);
    var el = document.querySelector('[its-view="data-export"]');
    el.innerHTML=str;
  }
  
  var init = function(data) {
    
    if(data.element.getAttribute('type') !== 'submit'){
      exportdata[data.control] = data.element.value;
    }

    if (exportdata[data.control] === ''){
      delete exportdata[data.control]
    }

    if(data.control === 'data-exportjson'){
      update();
    }
    
  };

  return {
    init: init
  };

})();