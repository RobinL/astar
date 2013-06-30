MYAPP.vis = {};


MYAPP.vis.globals ={
	svgMargin: {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	},
	squareSize: 30,
	svgHeight: function(){return MYAPP.data.gridHeight()*this.squareSize+this.svgMargin.top+this.svgMargin.bottom;},
	svgWidth: function() {return MYAPP.data.gridWidth()*this.squareSize+this.svgMargin.left+this.svgMargin.right;}
};


MYAPP.vis.canvas = (function(){

	g = MYAPP.vis.globals;

	function init() {

		g.svg = d3.select("#svgholder").append("svg")
				.attr("width", g.svgWidth())
				.attr("height", g.svgHeight())
				.append("g")
				.attr("class","margingroup")
				.attr("transform", "translate(" + g.svgMargin.left + "," + g.svgMargin.top + ")");

		var gridgroup = g.svg.append("g").attr("class", "gridgroup");
		var routeGroup = g.svg.append("g").attr("class","routeTileGroup");




	}

	return {
		init: init
	};

})();


MYAPP.vis.draw = (function(){

	var g = MYAPP.vis.globals;
	var d = MYAPP.data;


	function drawMapHeights() {

		var colScale = d3.scale.linear()
			.domain([d.minHeight(),(d.maxHeight()+d.minHeight())/2, d.maxHeight()])
			.range(["#6AE817","#FFD52D","#B30409"]);

		var gridgroup = d3.select(".gridgroup");

		var grid = gridgroup.selectAll("grid")
			.data(d.heights)
			.enter()
			.append("g")
			.attr("transform", function(d,i) {
				return "translate(0," + i*g.squareSize + ")";});


		var grid2 = grid
			.selectAll("grid2")
			.data(function(d) {return d;})
			.enter()
			.append("rect")
			.attr("height", g.squareSize)
			.attr("width", g.squareSize)
			.attr("x",function(d,i){return i*g.squareSize;})
			.attr("fill", function(d) {return colScale(d);});
	}

	function drawRoute() {
		var as = MYAPP.astar;
		var route = as.findRoute(as.point(0, 0), as.point(19, 19));
		var routeArray = as.routeToArray(route);


		var routeGroup = d3.select(".routeTileGroup");

		var routeSelection = routeGroup
			.selectAll(".routeTiles")
			.data(routeArray);

		routeSelection
			.enter()
			.append("rect")
			.attr("height", g.squareSize/2)
			.attr("width", g.squareSize/2)
			.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
			.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
			.attr("fill", "#1C2DA6");

	}


	return {
		drawMapHeights: drawMapHeights,
		drawRoute: drawRoute
	};

})();





$(function() {

	var d = MYAPP.data;
	
	var canvas = MYAPP.vis.canvas;
	var draw = MYAPP.vis.draw;

	canvas.init();
	draw.drawMapHeights();

	draw.drawRoute();



	

	$("#notes").append($("<p>").append("Height: " + d.gridHeight() + " and width: " + d.gridWidth()));

	


	



});