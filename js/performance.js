var PerformanceTest = (function() {

	var createElements = function(type, amount) {
		var elements = [];
		for (var i = 0; i<amount; i++) {
			elements.push(document.createElement(type));
		}
		return elements;
	}

	var trigger = function(elem) {
		if (elem) {
			elem.dispatchEvent(customEvent);
		}
	}

	var testXElements = function(size) {
		var elements = createElements("input", size);
		console.time(size + ' elements');
		for (var i = 0; i<size; i++) {
			var elem = elements[i];
			elem.setAttribute("its-control", "test.obj.cool");
			trigger(elem);
		}
		console.timeEnd(size + ' elements');
	}

	var test1000Elements = function() {
		testXElements(1000);
	}

	var test10000Elements = function() {
		testXElements(10000);
	}

	var test100000Elements = function() {
		testXElements(100000);
	}

	var testAll = function() {
		test1000Elements();
		//test10000Elements();
		//test100000Elements();
	}

	return {
		run: testAll
	}
})();
