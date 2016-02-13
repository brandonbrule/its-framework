// Functions
var Dynamic = (function() {
  
  var init = function(data) {
    if(data.control === 'new'){
      var view = data.element.parentNode.parentNode;
      var div = document.createElement('div');
      div.setAttribute('class', 'dynamic-row');
      div.innerHTML='<input type="text" its-control="dynamic">';
      view.appendChild(div);
      Views.cacheViews();
    }
    
  };

  return {
    init: init
  };

})();