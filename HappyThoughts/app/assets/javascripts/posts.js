document.addEventListener("DOMContentLoaded", function(event) { 
	//my_data is defined in index.html.erb script tag. (to use ruby variables in js)
	console.log(my_data)
	
	d3.json("/d3_data", function(error, data){
		console.log(data) //returns an objcet
		console.log(data.My)

		var width = 800
		var height = 600

		var container = d3.select("#visual_container").append("svg")
										.attr("width", width)
										.attr("height", height)
										.attr("class", "bubble")
										.style("border", "1px solid black");

		var circle = 		container.selectAll("circle")
										.data(data)
										.enter()
										.append("circle");

		 								circle.attr("cx", function(d,i){ return i * 30 })
										.attr("cy", function(d,i){ return i * 10 })
										.attr("r", function(d){ return d.My * 10 })
										.style("fill", "blue");
	})

	// circles is not appending
	// json object should look like - word: blah count: 3

});