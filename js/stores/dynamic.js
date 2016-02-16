// -- Dynamic Element Module -- //
// Tied to the Optional View Module
// Dynamic elements update Views.cacheView();
var Dynamic = (function() {
  
  var element = function(data) {
    if(data.control === 'new'){
      var view = data.element.parentNode.parentNode;
      var div = document.createElement('textarea');
      div.setAttribute('class', 'dynamic-row');
      div.setAttribute('its-control', 'dynamic');
      
      if (document.querySelector('[its-control="dynamic"]')){
        div.value = document.querySelector('[its-control="dynamic"]').value;
      }
      
      view.appendChild(div);
      Views.cacheViews();
    }
  };

  return {
    element: element
  };

})();