import Component from '@ember/component';
import d3 from 'd3'

export default Component.extend({

  didInsertElement() {
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;


// set the ranges
    var x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);


// add the SVG element
    var svg = d3.select("#chart-area").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// load the data

    let data = [
      {
        "Letter": "A",
        "Freq": 20
      },
      {
        "Letter": "B",
        "Freq": 12
      },
      {
        "Letter": "C",
        "Freq": 47
      },
      {
        "Letter": "D",
        "Freq": 34
      },
      {
        "Letter": "E",
        "Freq": 54
      },
      {
        "Letter": "F",
        "Freq": 21
      },
      {
        "Letter": "G",
        "Freq": 57
      },
      {
        "Letter": "H",
        "Freq": 31
      },
      {
        "Letter": "I",
        "Freq": 17
      },
      {
        "Letter": "J",
        "Freq": 5
      },
      {
        "Letter": "K",
        "Freq": 23
      },
      {
        "Letter": "L",
        "Freq": 39
      },
      {
        "Letter": "M",
        "Freq": 29
      },
      {
        "Letter": "N",
        "Freq": 33
      },
      {
        "Letter": "O",
        "Freq": 18
      },
      {
        "Letter": "P",
        "Freq": 35
      },
      {
        "Letter": "Q",
        "Freq": 11
      },
      {
        "Letter": "R",
        "Freq": 45
      },
      {
        "Letter": "S",
        "Freq": 43
      },
      {
        "Letter": "T",
        "Freq": 28
      },
      {
        "Letter": "U",
        "Freq": 26
      },
      {
        "Letter": "V",
        "Freq": 30
      },
      {
        "Letter": "X",
        "Freq": 5
      },
      {
        "Letter": "Y",
        "Freq": 4
      },
      {
        "Letter": "Z",
        "Freq": 2
      }
    ];

    data.forEach(function (d) {
      d.Letter = d.Letter;
      d.Freq = +d.Freq;
    });

    // scale the range of the data
    x.domain(data.map(function (d) {
      return d.Letter;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.Freq;
    })]);

    // add axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)");

    svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");


    // Add bar chart
    svg.selectAll("bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.Letter);
      })
      .attr("width", x.bandwidth())
      .attr("y", function (d) {
        return y(d.Freq);
      })
      .attr("height", function (d) {
        return height - y(d.Freq);
      });
  }

});
