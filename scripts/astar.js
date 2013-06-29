
MYAPP.astar = (function() {

//Dependencies
var fu = MYAPP.functionalUtilities;
var u = MYAPP.utilities;
var d = MYAPP.data;




//Point functions
function point(x, y) {
	return {x: x, y: y};
}

function addPoints(a, b) {
	return point(a.x + b.x, a.y + b.y);
}

function samePoint(a, b) {
	return a.x == b.x && a.y == b.y;
}

function weightedDistance(pointA, pointB) {
	var heightDifference = d.heightAt(pointB) - d.heightAt(pointA);
	var climbFactor = (heightDifference < 0 ? 1 : 2);
	var flatDistance = (pointA.x == pointB.x || pointA.y == pointB.y ? 100 : 141);
	return flatDistance + climbFactor * Math.abs(heightDifference);
}




function possibleDirections(from) {
	var mapSize = 20;
	function insideMap(point) {
		return point.x >= 0 && point.x < mapSize &&
					 point.y >= 0 && point.y < mapSize;
	}

	var directions = [point(-1, 0), point(1, 0), point(0, -1),
										point(0, 1), point(-1, -1), point(-1, 1),
										point(1, 1), point(1, -1)];
	return fu.filter(insideMap, fu.map(fu.partial(addPoints, from),
															 directions));
}

function estimatedDistance(pointA, pointB) {
	var dx = Math.abs(pointA.x - pointB.x),
			dy = Math.abs(pointA.y - pointB.y);
	if (dx > dy)
		return (dx - dy) * 100 + dy * 141;
	else
		return (dy - dx) * 100 + dx * 141;
}


function pointID(point) {
	return point.x + "-" + point.y;
}

function makeReachedList() {
	return {};
}

function storeReached(list, point, route) {
	list[pointID(point)] = route;
}

function findReached(list, point) {
	return list[pointID(point)];
}


function findRoute(from, to) {
	var open = new u.BinaryHeap(routeScore);
	var reached = makeReachedList();

	function routeScore(route) {
		if (route.score == undefined)
			route.score = estimatedDistance(route.point, to) +
										route.length;
		return route.score;
	}
	function addOpenRoute(route) {
		open.push(route);
		storeReached(reached, route.point, route);
	}
	addOpenRoute({point: from, length: 0});

	while (open.size() > 0) {
		var route = open.pop();
		if (samePoint(route.point, to))
			return route;
		
		fu.forEach(possibleDirections(route.point), function(direction) {
			var known = findReached(reached, direction);
			var newLength = route.length +
											weightedDistance(route.point, direction);
			if (!known || known.length > newLength){
				if (known)
					open.remove(known);        
				addOpenRoute({point: direction,
											from: route,
											length: newLength});
			}
		});
	}
	return null;
}


function routeToArray(route) {


}

return {
	point: point,
	findRoute: findRoute,
	routeToArray
}


})();

