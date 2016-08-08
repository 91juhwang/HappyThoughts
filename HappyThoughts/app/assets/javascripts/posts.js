document.addEventListener("DOMContentLoaded", function(event) { 
	//my_data is defined in index.html.erb script tag. (to use ruby variables in js)
	// http://stackoverflow.com/questions/17626555/responsive-d3-chart => making responsive pie chart
	d3.json("/d3_data", function(error, data){
		console.log(data) //returns an objcet
		var top11 = data.sort(function(a,b) { 
			if (a.count < b.count) {
				return 1; //returning bigger one
			} else
				return -1; // returning smaller one
			}).slice(0,11);
		console.log(top11)
		var width = 1000
		var height = 500
		var radius = Math.min(width, height) / 2; 
		var color = d3.scaleOrdinal(d3.schemeCategory20b)

		var container = d3.select("#visual_container").append("svg")
										.attr("width", "100%")
										.attr("height", "100%")
										.attr('viewBox','0 0 '+Math.min(1250)+' '+Math.min(500))
   									.attr('preserveAspectRatio','xMinYMin')
										.append("g")
										.attr("class", "pie")
										.attr("transform", "translate(" + Math.min(1100) / 2 + "," + Math.min(500,500) / 2 + ")");

		var arc = d3.arc()
							.innerRadius(0)
							.outerRadius(radius);

		var pie = d3.pie()
							.value(function(d) { return d.count })
							.sort(null);

		var path = container.selectAll("path")
								.data(pie(top11))
								.enter()
								.append("path")
								.attr("d", arc)
								.attr("fill", function(d,i) { return color(d.data.word); })

		//creating legend
		var legendRect = 30;
		var legendSpace = 6;

		var legend = container.selectAll(".legend")
								 .data(color.domain())
								 .enter()
								 .append("g")
								 .attr("class", "legend")
								 .attr("transform", function(d,i){ 
								 	var height = legendRect + legendSpace;
								  var offset = height * color.domain().length / 2; 
								  var horz = 300 + legendRect;
								  var vert = i * height - offset; 
								 	return "translate(" + horz + "," + vert + ")"; 
								 });

								 legend.append('rect')
								 .attr('width', legendRect)
								 .attr('height', legendRect)
								 .style("fill", color)
								 .style("stroke", color)

								 legend.append("text")
								 .attr("x", legendRect + legendSpace)
								 .attr("y", legendRect - legendSpace)
								 .text(function(d) { return d; })

		// drawign circles to create word bubbles
		// var circle = container.selectAll("circle")
		// 						 .data(data)
		// 						 .enter()
		// 						 .append("circle");

	 // 							circle.attr("cx", function(d,i){ return i * 51 })
		// 						 .attr("cy", function(d,i){ return i * 25 })
		// 						 .attr("r", function(d){ 
		// 						 	if (d.count * 30 > 120) {
		// 						 		return 9
		// 						 	}	else {
		// 						 		return d.count * 15 
		// 						 	}})
		// 						 .attr("fill", "orange")


	});

});