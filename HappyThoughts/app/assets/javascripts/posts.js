document.addEventListener("DOMContentLoaded", function(event) { 
	//my_data is defined in index.html.erb script tag. (to use ruby variables in js)
	console.log(my_data)
	
	d3.json("/d3_data", function(error, data){
		console.log(data) //returns an objcet

		var width = 1100
		var height = 600

		var container = d3.select("#visual_container").append("svg")
										.attr("width", width)
										.attr("height", height)
										.attr("class", "bubble")
										.style("border", "1px solid black");

		var circle = container.selectAll("circle")
								 .data(data)
								 .enter()
								 .append("circle");

	 							 circle.attr("cx", function(d,i){ return i * 51 * Math.random() })
								 .attr("cy", function(d,i){ return i * 25 * Math.random() })
								 .attr("r", function(d){ 
								 	if (d.count * 45 > 120) {
								 		return 9
								 	}	else {
								 		return d.count * 25 
								 	}})
								 .attr("style", "border: 1px solid red; fill: orange;")
								 .text( function (d) {return d.word });
	})

});