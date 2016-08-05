document.addEventListener("DOMContentLoaded", function(event) { 

	console.log(my_data)

	d3.json(d3_data_path, function(){


	})
	var width = 800
	var height = 600

	var container = d3.select("#visual_container").append("svg")
									.attr("width", width)
									.attr("height", height)
									.attr("class", "bubble")
									.style("border", "1px solid black")

	var pack = d3.pack()
						 .size([width, height - 50])
						 .padding(5);

	

});