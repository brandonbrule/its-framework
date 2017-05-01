var PerformanceTest = (function() {

	var createElements = function(type, amount, attribute, value) {
		var elements = [];
		for (var i = 0; i<amount; i++) {
			var element = document.createElement(type);
			if (attribute && value) {
				element.setAttribute(attribute, value);
			}
			elements.push(element);
		}
		return elements;
	}

	var rand = function() {
		return Math.random().toString(36).substring(7);
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
		test10000Elements();
		test100000Elements();
	}

	var testFor = function(element_name) {
		var elements = document.getElementsByName(element_name);
		if (!elements || !elements.length) {
			console.error('No elements with name "%s" were found.', element_name);
			return;
		}
		[].forEach.call(elements, function(e) {
			var result_cont = e.getElementsByClassName('result')[0];
			var div = e.children[e.children.length - 1];
			div.classList.add('hidden');

			var chosen = null;
			[].forEach.call(e.children, function(element) {
				var its_function = element.getAttribute('its-test');
				var its_amount = element.getAttribute('its-test-amount');
				if (!its_function || !its_amount) {
					return;
				}

				var new_elements = createElements('input', its_amount, its_function, rand());
				[].forEach.call(new_elements, function(new_elem) {
					if (!chosen) {
						chosen = new_elem;
					}
					element.appendChild(new_elem);
				});
			});

			chosen.value = rand() + rand() + rand();
			
			var start = window.performance.now();
			chosen.dispatchEvent(customEvent);
			var end = window.performance.now();
			
			var result_str = "Time: " + (end - start) + " ms";
			if (result_cont) {
				var result = document.createElement('div');
				result.innerHTML = result_str;
				result_cont.appendChild(result);
			} else {
				console.debug(result_str);
			}
		});
	}

	return {
		run: testAll,
		start: testFor
	}
})();
