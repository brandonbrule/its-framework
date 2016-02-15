var Dispatch = (function() {
  var event;
  var data = {
    changed: null,
    event_type: null,
    element: null,
    type: null,
    value: null,
    control: null
  };
  var control_history = {};

  // If it's a control
  var controlCheck = function(){
    if (data.element.hasAttribute('its-control')) {
      data.control = data.element.getAttribute('its-control');
    } else {
      data.control = null;
    }
  };

  var setValue = function(){
    // Value
      if (data.element.value) {
        if (data.type === 'checkbox') {
          if (data.element.checked){
            data.value = data.element.value;
          } else {
            data.value = '';
          }
        } else {
          data.value = data.element.value;
        }
      } else {
        data.value = null;
      }
  };

  var setInnerHTML = function(){
      // If it's innerHTML Like textarea
      if (data.element.innerHTML) {
        data.innerHTML = data.element.innerHTML;
      } else {
        data.innerHTML = null;
      }
  };

  var controlHistory = function(){

    if (!control_history[data.control]){
      control_history[data.control] = [{
        value: data.value,
        innerHTML: data.innerHTML
      }];
      data.changed = true;
      return;
    }


    if(control_history[data.control].length === 1){
      if (control_history[data.control][0].value === data.value){

          if (data.element_type === 'BUTTON'){
            data.changed = false;
            data.value = '';
            control_history[data.control][0].value = '';
          }else{
            data.changed = false;
          }

      } else {
        data.changed = true;
        control_history[data.control][0].value = data.value;
        control_history[data.control][0].innerHTML = data.innerHTML;
      }
    }

  };


  var Publish = function(e) {
    data.event_type = e.type;
    data.element = e.target;
    data.element_type = e.target.nodeName;
    data.type = e.target.getAttribute('type');
    
    
    controlCheck(e);

    if (data.control){
        setValue();
        setInnerHTML();
        controlHistory();
        if ( data.type === 'checkbox' || data.type === 'radio' || data.type === 'submit' ){
          data.changed = true;
        }
    } else {
      data.value = null;
      data.innerHTML = null;
    }

       
    
    return data;
    
  };

  var init = function(e) {
      //its.clearAll();
      var data = Publish(e);
      Store.init(data);
  };
  return {
    init: init
  };
})();