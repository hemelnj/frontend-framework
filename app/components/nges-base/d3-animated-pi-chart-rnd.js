import Component from '@ember/component';
import d3 from 'd3'

export default Component.extend({

  didInsertElement() {

    var div = d3.select("body").append("div").attr("class", "toolTip");
    var dataset = [
      { name: 'Product A', total: 2500, percent: 30.9 },
      { name: 'Product B', total: 1500, percent: 20.1 },
      { name: 'Product C', total: 1800, percent: 33 },
      { name: 'Product D', total: 1000, percent: 16 }
    ];

    var width = 400,
      height = 320,
      radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(["#22d5ee", "#65aaf7", "#7b6888", "#c182c1", "#a04c6d"]);

    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 90);

    var pie = d3.pie()
      .sort(null)
      .startAngle(1.1*Math.PI)
      .endAngle(3.1*Math.PI)
      .value(function(d) { return d.total; });

    var svg = d3.select("#pi-anim-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    var g = svg.selectAll(".arc")
      .data(pie(dataset))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .style("fill", function(d) { return color(d.data.name); })
      .transition().delay(function(d,i) {
      return i * 700; }).duration(500)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d)
        }
      });
    g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .transition()
      .delay(2500)
      .text(function(d) { return d.data.name; });

    d3.selectAll("path").on("mousemove", function(d) {
      div.style("left", d3.event.pageX+10+"px");
      div.style("top", d3.event.pageY-25+"px");
      div.style("display", "inline-block");
      div.html((d.data.name)+"<br>"+(d.data.total) + "<br>"+(d.data.percent) + "%");
    });

    d3.selectAll("path").on("mouseout", function(d){
      div.style("display", "none");
    });


//d3.select("body").transition().style("background-color", "#d3d3d3");
    function type(d) {
      d.total = +d.total;
      return d;
    }

  }


});
