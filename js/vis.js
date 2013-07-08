var okrugs = {0: "САО", 1: "СВАО", 2: "ВАО", 3: "ЮВАО", 4: "ЮАО",
              5: "ЮЗАО", 6: "ЗАО", 7: "СЗАО", 8: "ЦАО"};

var data = [
  [183, 29, 1, 2, 0, 1, 5, 36, 26],
  [29, 156, 8, 2, 0, 0, 0, 0, 31],
  [1, 8, 194, 36, 0, 0, 0, 0, 24],
  [2, 2, 36, 194, 30, 2, 1, 1, 27],
  [0, 0, 0, 30, 240, 49, 7, 0, 34],
  [1, 0, 0, 2, 49, 184, 52, 0, 22],
  [5, 0, 0, 1, 7, 52, 211, 12, 21],
  [36, 0, 0, 1, 0, 0, 12, 160, 14],
  [26, 31, 24, 27, 34, 22, 21, 14, 151],
  ];

var fill = d3.scale.category20c();

var width = 720,
    height = 720,
    outerRadius = Math.min(width, height) / 2 - 20,
    innerRadius = outerRadius - 24;

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var layout = d3.layout.chord()
    .padding(.03)
    .sortSubgroups(d3.descending)
    .sortChords(d3.ascending);

var path = d3.svg.chord()
    .radius(innerRadius);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("id", "circle")
    // .attr("stroke", "none")
    // .attr("stroke-width", "10px")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("circle")
    .attr("r", outerRadius - 1)
    .style("fill", "white");

render(data, okrugs);

d3.select("#msk").on("click", function() {
  clear_circle();
  render(data, okrugs);
});

d3.select("#clear").on("click", function() {
  clear_circle();
});


d3.select("#okrug").on("click", function() {
  clear_circle();

  d3.json("data/matrix.json", function(file) {
    var districts = {},
        matrix = [],
        n = 0;


    file.forEach(function(d) {
      if (d.okrug === "ЦАО") {
        matrix.push(d.routes);
        districts[n] = d.district;
        n++;
      }
    });

    render(matrix, districts);
  });
});


function render(data, places) {

  // Compute the chord layout.
  layout.matrix(data);

  // Add a group per neighborhood.
  var group = svg.selectAll(".group")
      .data(layout.groups)
    .enter().append("g")
      .attr("class", "group")
      .on("mouseover", mouseover);

  // Add a mouseover title.
  group.append("title").text(function(d, i) {
    return places[i];
  });

  // Add the group arc.
  var groupPath = group.append("path")
      .attr("id", function(d, i) {return "group" + i;})
      .attr("d", arc)
      .style("fill", function(d) {return fill(d.index);});

  // Add a text label.
  var groupText = group.append("text")
    .attr("dy", -2)
    .attr("dx", 10)
    .attr("stroke", "black")
    .attr("stroke-width", ".25px");
    // .attr("transform", function(d) {
    //   return "rotate(" + ((d.endAngle - d.startAngle)/2 * 180 / Math.PI - 5) + ")";
    // });

  groupText.append("textPath")
      .attr("xlink:href", function(d, i) {return "#group" + i;})
      .text(function(d, i) {return places[i];});

  // Remove the labels that don't fit. :(
  groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 50 < this.getComputedTextLength(); })
    .remove();

  // Add the chords.
  var chord = svg.selectAll(".chord")
      .data(layout.chords)
    .enter().append("path")
      .attr("class", "chord")
      .style("fill", function(d) {return fill(d.target.index);})
      .style("opacity", 0.7)
      .attr("d", path);

  // Add an elaborate mouseover title for each chord.
  chord.append("title").text(function(d) {
    return places[d.source.index]
      + " ↔ " + places[d.target.index]
      + ": " + d.source.value;
  });

  function mouseover(d, i) {
    chord.classed("fade", function(p) {
      return p.source.index != i
          && p.target.index != i;
    });
  }
};


function clear_circle() {
  svg.selectAll(".group")
    .transition()
      // .duration(2000)
      // .attr("opacity", 0.1)
      .remove();

  svg.selectAll(".chord")
    .transition()
      // .duration(2000)
      // .attr("opacity", 0.1)
      .remove();
};