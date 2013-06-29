
MYAPP.astar = (function() {

var heightAt = function() {

	var heights = MYAPP.data.heights;

	return function(point) {
		return heights[point.y][point.x];
	};
}();



})();