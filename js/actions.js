// Actions
document.addEventListener("keyup", function(e) {
	if (event.keyCode !== 9 && event.keyCode !== 16) {
  		Dispatch.init(e);
	}
});

document.addEventListener("change", function(e) {
  Dispatch.init(e);
});

document.addEventListener('click', function(e) {
  Dispatch.init(e);
});