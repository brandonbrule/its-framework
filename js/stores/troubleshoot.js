// Functions
var Troubleshoot = (function() {
  
  var control = function(data) {

  	if (data.control === 'wut'){
    	if (its_container_wrapper.parentNode.style.display === 'block'){
    		its_container_wrapper.parentNode.style.display = 'none';
    	} else {
    		its_container_wrapper.parentNode.style.display = 'block';
    	}
    }

    if(data.control){
    	if (its_container_wrapper.parentNode.style.display === 'block'){
      		its.clearAll();
      		its.a(data);
  		}
    }
    
  };

  return {
    control: control
  };

})();