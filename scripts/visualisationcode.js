MYAPP.vis = {};

MYAPP.vis.globals = {
	svgMargin: {
		top: 20,
		right: 20,
		bottom: 50,
		left: 20
	},
	svgHeight: 600,
	svgWidth: 600
};


MYAPP.vis.canvas = (function(){

	g = MYAPP.vis.globals;

	function init() {

	g.svg = d3.select("#svgholder").append("svg")
			.attr("width", g.svgWidth)
			.attr("height", g.svgHeight)
			.append("g")
			.attr("class","margingroup")
			.attr("transform", "translate(" + g.svgMargin.left + "," + g.svgMargin.top + ")");
	}

	return {
		init: init
	};

})();


$(function() {

	
	canvas = MYAPP.vis.canvas;
	canvas.init();




});