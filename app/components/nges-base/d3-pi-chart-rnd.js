import Component from '@ember/component';
import d3 from 'd3'

export default Component.extend({

  didInsertElement() {

    const width = 250;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#pi-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(["#E85B55", "#844F9A", "#349EDA",
      "#3FAD84", "#FBCD4B", "#E85B55"]);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0.5)
      .outerRadius(radius);

    function type(d) {
      d.apples = Number(d.apples);
      d.oranges = Number(d.oranges);
      return d;
    }

    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(1);
      return (t) => arc(i(t));
    }

    let data = {
      "apples": [
        {"region": "North", "count": "53245"},
        {"region": "South", "count": "28479"},
        {"region": "East", "count": "19697"},
        {"region": "West", "count": "24037"},
        {"region": "Central", "count": "40245"}
      ],
      "oranges": [
        {"region": "North", "count": "400"},
        {"region": "South", "count": "300"},
        {"region": "East", "count": "400"},
        {"region": "West", "count": "200"},
        {"region": "Central", "count": "100"}
      ]
    };


    d3.selectAll("input")
      .on("change", update);

    function update(val = this.value) {
      // Join new data
      const path = svg.selectAll("path")
        .data(pie(data[val]));

      // Update existing arcs
      path.transition().duration(250).attrTween("d", arcTween);

      // Enter new arcs
      path.enter().append("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc)
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .each(function (d) {
          this._current = d;
        });
    }


    let test = d3.select("#legend");
    test.append("circle").attr("cx",10).attr("cy",10).attr("r", 6).style("fill", "#FBCC4C");
    test.append("circle").attr("cx",10).attr("cy",30).attr("r", 6).style("fill", "#42AB83");
    test.append("circle").attr("cx",10).attr("cy",50).attr("r", 6).style("fill", "#349EDA");
    test.append("circle").attr("cx",10).attr("cy",70).attr("r", 6).style("fill", "#835099");
    test.append("circle").attr("cx",10).attr("cy",90).attr("r", 6).style("fill", "#E75B56");
    test.append("text").attr("x", 30).attr("y", 10).text("Resource A").style("font-size", "15px").attr("alignment-baseline","middle");
    test.append("text").attr("x", 30).attr("y", 30).text("Resource B").style("font-size", "15px").attr("alignment-baseline","middle");
    test.append("text").attr("x", 30).attr("y", 50).text("Resource C").style("font-size", "15px").attr("alignment-baseline","middle");
    test.append("text").attr("x", 30).attr("y", 70).text("Resource D").style("font-size", "15px").attr("alignment-baseline","middle");
    test.append("text").attr("x", 30).attr("y", 90).text("Resource E").style("font-size", "15px").attr("alignment-baseline","middle");

    update("apples");


  }


});
