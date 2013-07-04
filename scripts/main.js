$(function() {

	
	var d = MYAPP.data;

	var canvas = MYAPP.vis.canvas;
	var draw = MYAPP.vis.draw;


	canvas.init();
	draw.drawMapHeights();

	
	d3.selectAll(".hr").on("mouseover", function(e) {
		that = d3.select(this);
		var y = that.attr("data-y");
		var x = that.attr("data-x");
		console.log("click")
		 if(event.ctrlKey) {
		    var height = this.__data__ - 100;
		  }
		  else
		  {
		  	var height = this.__data__ + 100;
		  }
		
		
		d.setHeight(y,x, height);

		draw.drawMapHeights();


	})


	
	$("#findRoute").on("click", draw.drawRoute);
	

	$("#notes").append($("<p>").append("Height: " + d.gridHeight() + " and width: " + d.gridWidth()));




});