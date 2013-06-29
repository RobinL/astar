MYAPP.util = (function() {

	function forEach(arr, action) {
		for (var i = 0; i < arr.length; i++) {
			action(arr[i]);
		}
	}

	function reduce(combine, base, array) {
		forEach(array,function(element) {
			base = combine(base,element);
		});
		return base;
	}


	function map (func, array) {
		var result = [];
		forEach(array, function (element) {
			result.push(func(element));
		});
		return result;
	}

	var op = {
		"+": function(a, b) {return a + b;},
		"==": function(a, b) {return a == b;},
		"===": function(a, b) {return a === b;},
		"!": function(a) {return !a;}
	};

	function asArray(quasiArray, start) {
		var result = [];
		for (var i = (start || 0); i < quasiArray.length; i++)
			result.push(quasiArray[i]);
		return result;
	}

	function partial(func) {
		var fixedArgs = asArray(arguments, 1);
		return function() {
			return func.apply(null, fixedArgs.concat(asArray(arguments)));
		};
	}

	return {
		forEach: forEach,
		reduce: reduce,
		map:map,
		op:op,
		partial:partial
	};
})();