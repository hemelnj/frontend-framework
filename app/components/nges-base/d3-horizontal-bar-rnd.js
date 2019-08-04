import Component from '@ember/component';
import d3 from 'd3'

export default Component.extend({

  didInsertElement() {
    let datasetTotal = [
      {label:"Category 1", value:19},
      {label:"Category 2", value:5},
      {label:"Category 3", value:13},
      {label:"Category 4", value:17},
      {label:"Category 5", value:21},
      {label:"Category 6", value:25}
    ];

    let datasetOption1 = [
      {label:"Category 1", value:22},
      {label:"Category 2", value:33},
      {label:"Category 3", value:4},
      {label:"Category 4", value:15},
      {label:"Category 5", value:36},
      {label:"Category 6", value:0}
    ];

    let datasetOption2 = [
      {label:"Category 1", value:10},
      {label:"Category 2", value:20},
      {label:"Category 3", value:30},
      {label:"Category 4", value:5},
      {label:"Category 5", value:12},
      {label:"Category 6", value:23}
    ];


    var margin = {top: (parseInt(d3.select('#hor-bar-area').style('height'), 10)/20), right: (parseInt(d3.select('#hor-bar-area').style('width'), 10)/20), bottom: (parseInt(d3.select('#hor-bar-area').style('height'), 10)/20), left: (parseInt(d3.select('#hor-bar-area').style('width'), 10)/5)},
      width = parseInt(d3.select('#hor-bar-area').style('width'), 10) - margin.left,
      height = parseInt(d3.select('#hor-bar-area').style('height'), 10) - margin.top - margin.bottom-50;

    var div = d3.select("body").append("div").attr("class", "toolTip");

    var formatPercent = d3.format("");

    var y = d3.scaleBand()
      .range([0, height],)
      .padding(.2, 0.5);

    var x = d3.scaleLinear()
      .range([0, width]);


    var xAxis = d3.axisBottom(x).tickSize(-height);
    var yAxis = d3.axisLeft(y);

    //.tickFormat(formatPercent);

    var svg = d3.select("#hor-bar-area").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);


    d3.selectAll("#dataset1").on("change", selectDataset);
    //d3.select("#dataset1[value=\"total\"]").property("checked", true);

    change(datasetTotal);

    function selectDataset()
    {
      let value = this.value;
      if (value === "total")
      {
        change(datasetTotal);
      }
      else if (value === "option1")
      {
        change(datasetOption1);
      }
      else if (value === "option2")
      {
        change(datasetOption2);
      }
    }



    function change(dataset) {

      y.domain(dataset.map(function(d) { return d.label; }));
      x.domain([0, d3.max(dataset, function(d) { return d.value; })]);

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg.select(".y.axis").remove();
      svg.select(".x.axis").remove();

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("x", 50)
        .attr("dx", ".1em")
        .style("text-anchor", "end")
        .text("Option %");


      var bar = svg.selectAll(".bar")
        .data(dataset, function(d) { return d.label; });
      // new data:
      bar.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.value); })
        .attr("y", function(d) { return y(d.label); })
        .attr("width", function(d) { return width-x(d.value); })
        .attr("height", y.bandwidth());

      bar
        .on("mousemove", function(d){
          div.style("left", d3.event.pageX+10+"px");
          div.style("top", d3.event.pageY-25+"px");
          div.style("display", "inline-block");
          div.html((d.label)+"<br>"+(d.value)+"%");
        });
      bar
        .on("mouseout", function(d){
          div.style("display", "none");
        });


      // removed data:
      bar.exit().remove();

      // updated data:
      bar.transition()
        .duration(750)
        .attr("x", function(d) { return 0; })
        .attr("y", function(d) { return y(d.label); })
        .attr("width", function(d) { return x(d.value); })
        .attr("height", y.bandwidth());

    }
  }

});
