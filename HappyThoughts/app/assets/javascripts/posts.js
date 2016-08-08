document.addEventListener("DOMContentLoaded", function(event) { 
	//my_data is defined in index.html.erb script tag. (to use ruby variables in js)
	console.log(my_data)
	
	d3.json("/d3_data", function(error, data){
		console.log(data) //returns an objcet

		var width = 1000
		var height = 500
		var radius = Math.min(width, height) / 2; 
		var color = d3.scaleOrdinal(d3.schemeCategory20b)

		var container = d3.select("#visual_container").append("svg")
										.attr("width", width)
										.attr("height", height)
										.append("g")
										.attr("class", "pie")
										.attr("transform", "translate(" + (width / 2) + "," + (height/2) + ")");

		var arc = d3.arc()
							.innerRadius(0)
							.outerRadius(radius);

		var pie = d3.pie()
							.value(function(d) { return d.count })
							.sort(null);

		var path = container.selectAll("path")
								.data(pie(data))
								.enter()
								.append("path")
								.attr("d", arc)
								.attr("fill", function(d,i) { return color(d.data.word); })

		//creating legend
		var legendRect = 18;
		var legendSpace = 4;

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