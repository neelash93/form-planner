(function(angular) {
  'use strict';
angular.module('formvisual', [])
.directive("stackChart",function(){  
  console.log("JERJEEJE")
    return {      
      restrict:'E',
      scope: { 
        data: '='
      },
      link: function(scope, element, attrs) {
        console.log(data);
        var dates = ["June-2016","July-2016","Aug-2016","Sep-2016","Oct-2016","Nov-2016","Dec-2016","Jan-2017","Feb-2017","March-2017","Apr-2017","May-2017","June-2017","July-2017","Aug-2017","Sep-2017","Oct-2017","Nov-2017","Dec-2017","Jan-2018","Feb-2018","March-2018","Apr-2018","May-2018","June-2018","July-2018","Aug-2018","Sep-2018","Oct-2018","Nov-2018","Dec-2018","Jan-2019","Feb-2019","March-2019","Apr-2019","May-2019","June-2019","July-2019","Aug-2019","Sep-2019","Oct-2019","Nov-2019","Dec-2019","Jan-2020","Feb-2020","March-2020","Apr-2020","May-2020","June-2020","July-2020","Aug-2020","Sep-2020","Oct-2020","Nov-2020","Dec-2020","Jan-2021","Feb-2021","March-2021","Apr-2021","May-2021","June-2021","July-2021","Aug-2021","Sep-2021","Oct-2021","Nov-2021","Dec-2021"]

        var data = scope.data;
        var h = 500;
        var w = 3500;
        var margin = 20;
        var color = d3.scale.category10();
        var svg = d3.select("#usage")
                  .append("svg")
                  .attr("height", h)
                  .attr("width", w)

        scope.$watch('data', function(newVals, oldVals) {
          scope.render(newVals);   
        }, true);
        scope.render = function(data){
         
        // setup x 
        svg.selectAll("*").remove();
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
          }

      }    
    }
  });
})(window.angular);