// -- Actions -- //
// Actions Rules **
// All Actions are binded once on the document
// All Actions must be sent to the Dispatcher
// Element specific event listeners should be contained in own module.

// KeyUp Event
document.addEventListener("keyup", function(e) {
	// Tab shift Tab doesn't trigger change (accessibility)
	// Ha, interesting, Spacebar on button registers as click
	// So it sends click and keypress with just keypress - only on buttons.
	its.a(e.keyCode);
	if (e.keyCode !== 9 && e.keyCode !== 16 && e.keyCode !== 32) {
  		Dispatch.init(e);
	}
});

// Change Event
document.addEventListener("change", function(e) {
  Dispatch.init(e);
});

// Click Event
document.addEventListener('click', function(e) {
  Dispatch.init(e);
});

window.addEventListener("load", function(e){
	Dispatch.init(e);
});