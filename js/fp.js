
/*
	an iteration on this bl.ock
	http://bl.ocks.org/ZJONSSON/2975320
	barStack - stacking with negative values
*/

function barStack(seriesData) {
	var l = seriesData[0].length
	while (l--) {
		var posBase = 0; // positive base
		var negBase = 0; // negative base

		seriesData.forEach(function(d) {
			d = d[l]
			d.size = Math.abs(d.y)
			if (d.y < 0) {
				d.y0 = negBase
				negBase -= d.size
			} else
			{
				d.y0 = posBase = posBase + d.size
			}
		})
	}
	seriesData.extent = d3.extent(
		d3.merge(
			d3.merge(
				seriesData.map(function(e) {
					return e.map(function(f) { return [f.y0,f.y0-f.size] })
				})
			)
		)
	)
}

/* Here is an example */

// each series is an array of objects
// our data is in turn an array of those series arrays
// which is to say
// an array of arrays of objects
var data;
var dates;

d3.json("/ajax/usage.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  d3.json("/ajax/dates.json", function(error1, json1) {
    if (error1) return console.warn(error1);
    dates = json1;


var h = 500;
var w = 800;
var margin = 20;
var color = d3.scale.category10();

var x = d3.scale.ordinal()
	.domain(dates)
	.rangeRoundBands([ margin, w - margin ], .1)

var y = d3.scale.linear()
	.range([h-margin,0+margin]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickSize(6, 0);

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

barStack(data);
y.domain(data.extent);

svg = d3.select("#usage")
	.append("svg")
	.attr("height", h)
	.attr("width", w)

svg.selectAll(".series")
	.data(data)
	.enter()
	.append("g")
	.classed("series", true)
	.style("fill", function(d,i) { return d[i].color })
	.style("opacity", 0.8)
		.selectAll("rect")
		.data(Object)
		.enter()
		.append("rect")
			.attr("x", function(d, i) { return x(x.domain()[i]) })
			.attr("y", function(d) { return y(d.y0) })
			.attr("height", function(d) { return y(0) - y(d.size) })
			.attr("width", x.rangeBand())
			.on("mouseover", function() { tooltipz.style("display", null); })
  		.on("mouseout", function() { tooltipz.style("display", "none"); })
  		.on("mousemove", function(d) {
    		var xPosition = d3.mouse(this)[0] - 55;
    		var yPosition = d3.mouse(this)[1] - 5;
    		tooltipz.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    		tooltipz.select("text").text(d.y + ' : ' + d.label);
  		});

//console.log("y(0)", y(0));
//console.log("margin", margin);

svg.append("g")
	.attr("class", "axis x")
	.attr("transform", "translate(0 " + y(0) + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis y")
	.attr("transform", "translate(" + margin + " 0)")
	.call(yAxis);

/* Here we add tooltips */

// Prep the tooltip bits, initial display is hidden
var tooltipz = svg.append("g")
  .attr("class", "tooltipz")
  .style("display", "none");

tooltipz.append("rect")
  .attr("width", 0)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltipz.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");

})});

(function ($) {
  $('.spinner .btn:first-of-type').on('click', function() {
    $('.spinner input').val( parseInt($('.spinner input').val(), 10) + 1);
  });
  $('.spinner .btn:last-of-type').on('click', function() {
    $('.spinner input').val( parseInt($('.spinner input').val(), 10) - 1);
  });
})(jQuery);
