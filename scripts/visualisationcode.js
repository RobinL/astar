MYAPP.vis = {};


MYAPP.vis.globals ={
	svgMargin: {
		top: 20,
		right: 20,
		bottom: 20,
		left: 20
	},
	squareSize: 50,
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
		
		
		
		var openGroup =   g.svg.append("g").attr("class","openGroup");
		var closedGroup =   g.svg.append("g").attr("class","closedGroup");
		var routeGroup = g.svg.append("g").attr("class","routeTileGroup");



	}

	return {
		init: init
	};

})();


MYAPP.vis.draw = (function(){

	var g = MYAPP.vis.globals;
	var d = MYAPP.data;
	var as = MYAPP.astar;


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

	function drawRoute(route) {
		
		var route = as.findRoute(as.point(0, 0), as.point(19, 19));
		

		

		

	}

	function drawRouteOnly(route) {

		var routeArray = as.routeToArray(route);

			var routeGroup = d3.select(".routeTileGroup");



			var routeSelection = routeGroup
				.selectAll(".routeTiles")
				.remove();

				debugger;

			var routeSelection = routeGroup
				.selectAll(".routeTiles") 
				.data(routeArray);

			routeSelection
				.enter()
				.append("rect")
				.attr("class", "routeTiles")
				.attr("height",  g.squareSize/2)
				.attr("width",  g.squareSize/2)
				.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
				.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
				.attr("fill", "#1C2DA6");

			routeSelection
				.transition()
				.delay(function(d,i){return i*30})
				.attr("height", g.squareSize/2)
				.attr("width", g.squareSize/2)
				.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
				.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
				.attr("fill", "#000000")
				.attr("stroke", "#FAFF2D")
				.attr("stroke-width", "2px");

			routeSelection
				.exit()
				.remove();

	}

	function reDraw(open, reached) {

		var openData = as.openToArray(open);
		var closedData = as.reachedToArray(reached);

		var openGroup = d3.select(".openGroup");

		var openRects = openGroup
			.selectAll(".openRect")
			.data(openData);

		openRects
			.enter()

			.append("rect")
			.attr("height", 0)
			.attr("width", 0)
			.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
			.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
			.attr("fill", "#1C2DA6")
			.attr("class","openRect");


		openRects
			.attr("height", g.squareSize/2)
			.attr("width", g.squareSize/2)
			.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
			.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
			.attr("fill", "#FE25F9");  //open is pink

		openRects
			.exit()
			.remove();


		var closedGroup = d3.select(".closedGroup");

		var closedRects = closedGroup
			.selectAll(".closedRect")
			.data(closedData);

		closedRects
			.enter()

			.append("rect")
			.attr("height", g.squareSize/3)
			.attr("width", g.squareSize/3)
			.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/3;})
			.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/3;})
			.attr("fill", "#1C3DA6")
			.attr("class","closedRect");


		closedRects
			.attr("height", g.squareSize/3)
			.attr("width", g.squareSize/3)
			.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/3;})
			.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/3;})
			.attr("fill", "#4EBE03");  //closed is green

		closedRects
			.exit()
			.remove();

		

		if (open.size() > 1) {
		
			var routeArray = as.routeToArray(open.content[0]);

			var routeGroup = d3.select(".routeTileGroup");



			var routeSelection = routeGroup
				.selectAll(".routeTiles")
				.data(routeArray);

			routeSelection
				.enter()
				.append("rect")
				.attr("class", "routeTiles")
				.attr("height", g.squareSize/2)
				.attr("width", g.squareSize/2)
				.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
				.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
				.attr("fill", "#1C2DA6");

			routeSelection
				.attr("height", g.squareSize/2)
				.attr("width", g.squareSize/2)
				.attr("x",function(d,i){return d.x*g.squareSize + g.squareSize/4;})
				.attr("y",function(d,i){return d.y*g.squareSize + g.squareSize/4;})
				.attr("fill", "#1C2DA6");

			routeSelection
				.exit()
				.remove();

		}
		
		


		

	}


	return {
		drawMapHeights: drawMapHeights,
		drawRoute: drawRoute,
		reDraw: reDraw,
		drawRouteOnly:drawRouteOnly
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