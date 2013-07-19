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

var last_chords = {};

var fill = d3.scale.category20c();

var width = 600,
    height = 600,
    outerRadius = Math.min(width, height) * .48,
    innerRadius = outerRadius * .925,
    northAngle = 10; // in degrees

var arc = d3.svg.arc()
    .startAngle(function(d) {return d.startAngle - northAngle * Math.PI / 180})
    .endAngle(function(d) {return d.endAngle - northAngle * Math.PI / 180})
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var chordl = d3.svg.chord()
    .startAngle(function(d) { return d.startAngle - northAngle * Math.PI / 180})
    .endAngle(function(d) { return d.endAngle - northAngle * Math.PI / 180})
    .radius(innerRadius);


var svg = d3.select("#chart")
  .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
  .append("svg:g")
    .attr("id", "chart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var arcs,
    chordlines;

/* Buttons */

d3.select("#msk").on("click", function() {
  rerender(data, okrugs);
});

d3.select("#clear").on("click", function() {
  svg.select(".arc")
    .transition()
    .duration(50)
    .delay(0)
    .remove();

  svg.select(".chord")
    .transition()
    .duration(50)
    .delay(0)
    .remove();

  // d3.json("data/matrix.json", function(file) {
  //   var districts = {},
  //       matrix = [],
  //       n = 0;

  //   file.forEach(function(d) {
  //     if (d.okrug === "ЮВАО") {
  //       matrix.push(d.routes);
  //       districts[n] = d.district;
  //       n++;
  //     }
  //   });

  //   // Compute the chord layout
  //   var layout = d3.layout.chord()
  //     .padding(.05)
  //     .sortSubgroups(d3.descending)
  //     .sortChords(d3.ascending)
  //     .matrix(matrix);

  //   // update arcs
  //   arcs = svg.append("svg:g")
  //     .attr("class", "arc")
  //     .selectAll("path")
  //     .data(layout.groups)
  //   .enter().append("svg:path")
  //     .style("fill", function(d) {return fill(d.index);})
  //     .transition()
  //     .duration(1500)
  //     .delay(0)
  //     .attrTween("d", arcTween(last_chords))
  //     .text(function(d, i) {return districts[i];});


  //   // update chords
  //   // svg.select(".chord")
  //   //   .selectAll("path")
  //   //   .data(layout.chords)
  //   //   .transition()
  //   //   .duration(1500)
  //   //   .attrTween("d", chordTween(last_chords));
  // });
});


d3.select("#okrug").on("click", function() {
  d3.json("data/matrix.json", function(file) {
    var districts = {},
        matrix = [],
        n = 0;

    file.forEach(function(d) {
      if (d.okrug === "ЮЗАО") {
        matrix.push(d.routes);
        districts[n] = d.district;
        n++;
      }
    });

    render(matrix, districts);
  });
});


d3.select("#update").on("click", function() {

  // Clean old arcs & chords
  // svg.select(".arc")
  //   .transition()
  //   .duration(50)
  //   .delay(0)
  //   .remove();

  svg.select(".chord")
    .transition()
    .duration(700)
    .delay(0)
    .style("opacity", "0")
    .remove();

  d3.json("data/matrix.json", function(file) {
    var districts = {},
        matrix = [],
        n = 0;

    file.forEach(function(d) {
      if (d.okrug === "ЮВАО") {
        matrix.push(d.routes);
        districts[n] = d.district;
        n++;
      }
    });

    // Compute the chord layout
    var layout = d3.layout.chord()
      .padding(.05)
      .sortSubgroups(d3.descending)
      .sortChords(d3.ascending)
      .matrix(matrix);

    // update arcs
    arcs = svg.select(".arc")
      .attr("class", "arc")
      .selectAll("path")
      .data(layout.groups)
      // .style("fill", function(d) {return fill(d.index);})
      .transition()
      .duration(800)
      .delay(0)
      .attrTween("d", arcTween(last_chords));

    d3.select(".arc")
      .selectAll("title")
      .text(function(d, i) {return districts[i];});

    // Add the chords
    chordlines = svg.append("svg:g")
      .attr("class", "chord")
      .selectAll("path")
      .data(layout.chords)
    .enter().append("svg:path")
      .attr("id", function(d, i) {return "chord" + i;})
      .style("fill", function(d) {return fill(d.target.index);});

    chordlines
      .style("opacity", 0)
      .transition()
      .delay(700)
      .duration(500)
      .style("opacity", 0.7)
      .attr("d", chordl);

    // Add an elaborate mouseover title for each chord.
    chordlines.append("title").text(function(d) {
      return districts[d.source.index]
        + " ↔ " + districts[d.target.index]
        + ": " + d.source.value;
    });

    last_chords = layout;
  });
});



/* Functions */

function render(data, places) {

  // Clean old arcs & chords
  svg.select(".arc")
    .remove();

  svg.select(".chord")
    .remove();

  // Compute the chord layout
  var layout = d3.layout.chord()
    .padding(.05)
    .sortSubgroups(d3.descending)
    .sortChords(d3.ascending)
    .matrix(data);

  // Add a group per okrug/district
  arcs = svg.append("svg:g")
    .attr("class", "arc")
    .selectAll("path")
    .data(layout.groups)
  .enter().append("svg:path")
    .attr("id", function(d, i) {return "arc" + i;})
    .attr("d", arc)
    .style("fill", function(d) {return fill(d.index);})
    .on("mouseover", mouseover)
    .append("title")
    .text(function(d, i) {return places[i];});


  // Add the chords
  chordlines = svg.append("svg:g")
    .attr("class", "chord")
    .selectAll("path")
    .data(layout.chords)
  .enter().append("svg:path")
    .attr("class", "chordline")
    .attr("id", function(d, i) {return "chord" + i;})
    .style("fill", function(d) {return fill(d.target.index);})
    .style("opacity", 0.7)
    .attr("d", chordl);

  chordlines
      .style("opacity", 0)
      .transition()
      .delay(0)
      .duration(500)
      .style("opacity", 0.7)
      .attr("d", chordl);

  // Add an elaborate mouseover title for each chord.
  chordlines.append("title").text(function(d) {
    return places[d.source.index]
      + " ↔ " + places[d.target.index]
      + ": " + d.source.value;
  });


  // var labels = svg.append("svg:g")
  //   .attr("class", "label")
  //   .selectAll("svg:g")
  //   .data(places)
  // .enter().append("svg:text")
  //   .attr("dy", -2)
  //   .attr("dx", 10)
  //   .attr("stroke", "black")
  //   .attr("stroke-width", ".25px");
    // .attr("transform", function(d) {
    //   return "rotate(" + ((d.endAngle - d.startAngle)/2 * 180 / Math.PI - 5) + ")";
    // });

  // groupText.append("textPath")
  //     .attr("xlink:href", function(d, i) {return "#arc" + i;})
  //     .text(function(d, i) {return places[i];})
  //     .filter(function(d, i) {return arcs[0][i].getTotalLength() / 2 - 46 < this.getComputedTextLength();})
  //     .remove();

  last_chords = layout;

  return svg;
};


function mouseover(d, i) {
    chordlines.classed("fade", function(p) {
      return p.source.index != i
          && p.target.index != i;
    });
};

function drawTicks(chord,svg,places) {
  var ticks = svg.append("svg:g")
    .attr("class", "ticks")
    .attr("opacity", 0.1);
    // .attr("transform", function(d) {
    //   return "rotate(" + (d.startAngle * 180 / Math.PI - 90) + ")"
    //       + "translate(" + outerRadius + ",0)";
    // });

  svg.selectAll(".ticks")
    .transition()
    .duration(700)
    .attr("opacity", 1);

  ticks.append("svg:text")
    .attr("x", 8)
    .attr("dy", '.35em');
    // .attr("text-anchor", function(d) {
    //      return d.angle > Math.PI ? "end" : null;
    //    })
    // .attr("transform", function(d) {
    //      return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
    //    })
    // .text(function(d, i) {return places[i];});

  return ticks;
}




  // // Add a group per neighborhood.
  // var group = svg.selectAll(".group")
  //     .data(chords.groups)
  //   .enter().append("g")
  //     .attr("class", "group")
  //     .on("mouseover", mouseover);

  // // Add a mouseover title.
  // group.append("title").text(function(d, i) {
  //   return places[i];
  // });

  // // Add the group arc.
  // var arcs = group.append("path")
  //     .attr("id", function(d, i) {return "group" + i;})
  //     .attr("d", arc)
  //     .style("fill", function(d) {return fill(d.index);});
  //     // .style("stroke", function(d) {return fill(d.index);});
  //     // .attr("stroke-width", "1.5px");

  // // Add a text label.
  // var groupText = group.append("text")
  //   .attr("dy", -4)
  //   .attr("dx", 3)
  //   .attr("stroke", "black")
  //   .attr("stroke-width", ".2px");
  //   // .attr("transform", function(d) {
  //   //   return "rotate(" + ((d.endAngle - d.startAngle)/2 * 180 / Math.PI - 5) + ")";
  //   // });

  // groupText.append("textPath")
  //     .attr("xlink:href", function(d, i) {return "#group" + i;})
  //     .text(function(d, i) {return places[i];});

  // // Remove the labels that don't fit. :(
  // groupText.filter(function(d, i) { return arcs[0][i].getTotalLength() / 2 - 20 < this.getComputedTextLength(); })
  //   .remove();





  // function mouseover(d, i) {
  //   chord.classed("fade", function(p) {
  //     return p.source.index != i
  //         && p.target.index != i;
  //   });
  // }

function arcTween(chord) {
  return function(d,i) {
    var i = d3.interpolate(chord.groups()[i], d);

    return function(t) {
      return arc(i(t));
    }
  }
}

// var chordl = d3.svg.chord().radius(innerRadius);

function chordTween(chord) {
  return function(d,i) {
    var i = d3.interpolate(chord.chords()[i], d);

    return function(t) {
      return chordl(i(t));
    }
  }
}


function clear_label() {
  svg.selectAll(svg)
    .transition()
      // .duration(2000)
      // .attr("opacity", 0.1)
      .remove();

  // svg.selectAll(".chord")
  //   .transition()
  //     // .duration(2000)
  //     // .attr("opacity", 0.1)
  //     .remove();
};




// arcs = svg.append("svg:g")
    //   .attr("class", "arc")
    //   .selectAll("path")
    //   .data(layout.groups)
    // .enter().append("svg:path")
    //   .attr("id", function(d, i) {return "arc" + i;})
    //   .on("mouseover", mouseover)
    //   .style("fill", function(d) {return Colors[d.index];})
    //   .style("stroke", function(d) {return Colors[d.index];})
    //   .attr("d", arc);

    // var arctitles = arcs.append("title")
    //   .text(function(d, i) {return places[i];});

    // labels = svg.append("svg:g")
    //   .attr("class", "label")
    //   .selectAll("text")
    //   .data(layout.groups)
    // .enter().append("svg:text")
    //   .attr("dy", "20px")
    //   .attr("text-anchor", "middle");

    // labelspath = labels.append("svg:textPath")
    //   .attr("xlink:href", function(d, i) {return "#arc" + i;})
    //   .text(function(d, i) {return places[i];})
    //   .attr("startOffset", function(d) {
    //     angle = d.startAngle + (d.endAngle - d.startAngle)/2;
    //     angle = d.endAngle * 180 / Math.PI;
    //     return ((angle > 100) & (angle < 270)) ? "71%" : "21%";
    //   });

    // // Remove the labels that don't fit
    // labels.filter(function(d, i) {
    //   return arcs[0][i].getTotalLength() / 2 - 32 < this.getComputedTextLength(); })
    //   .style("visibility", "hidden");