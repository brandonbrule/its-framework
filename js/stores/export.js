// Functions
var Export = (function() {
  var exportdata = {};

  var update = function(){
    var str = JSON.stringify(exportdata, null, 4);
    var el = document.querySelector('[its-view="export"]');
    el.innerHTML=str;
  }
  
  var init = function(data) {
    
    if(data.type !== 'submit'){
      exportdata[data.control] = data.element.value;
    }

    // If empty delete object property
    if (exportdata[data.control] === ''){
      delete exportdata[data.control];
    }

    if (data.element_type === 'BUTTON'){
      if (data.changed === false){
        delete exportdata[data.control];
      }
    }

    // If checkbox and its unchecked delete property
    if (data.type === 'checkbox'){
      if (!data.element.checked){
        delete exportdata[data.control]
      }
    }

    // Update Display
    if(data.control === 'exportjson'){
      update();
    }
    
  };

  return {
    init: init
  };

})();