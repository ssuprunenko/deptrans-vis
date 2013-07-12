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

var width = 550,
    height = 550,
    outerRadius = Math.min(width, height) * .48,
    innerRadius = outerRadius * .9,
    northAngle = 0  * Math.PI / 180;

// Compute the chord layout
var layout = d3.layout.chord()
  .padding(.03)
  .sortSubgroups(d3.descending)
  .sortChords(d3.ascending);

var arc = d3.svg.arc()
    .startAngle(function(d) {return d.startAngle - northAngle})
    .endAngle(function(d) {return d.endAngle - northAngle})
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var chordl = d3.svg.chord()
    .startAngle(function(d) { return d.startAngle - northAngle})
    .endAngle(function(d) { return d.endAngle - northAngle})
    .radius(innerRadius);


var svg = d3.select("#chart")
  .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
  .append("svg:g")
    .attr("id", "chart")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var title = d3.select("#title")
      .text("Москва");

var arcs,
    chordlines,
    labels;

render("Москва");


/* Buttons */
d3.select("#msk").on("click", function() {
  render("Москва");
});


// Clear button
d3.select("#clear").on("click", function() {

  title.text("");

  svg.select(".arc")
    .transition()
    .duration(50)
    .delay(0)
    .attr("visibility", "hidden");

  svg.select(".chord")
    .transition()
    .duration(50)
    .delay(0)
    .attr("visibility", "hidden");

  svg.select(".label")
    .transition()
    .duration(50)
    .delay(0)
    .attr("visibility", "hidden");
});


// d3.select("#okrug").on("click", function() {
//   d3.json("data/matrix.json", function(file) {
//     var places = {},
//         matrix = [],
//         n = 0;

//     file.forEach(function(d) {
//       if (d.okrug === "ЮЗАО") {
//         matrix.push(d.routes);
//         places[n] = d.district;
//         n++;
//       }
//     });

//     title.text("ЮЗАО");

//     svg = render(matrix, places);
//   });
// });


d3.select("#sao").on("click", function() {
  render("САО");
});

d3.select("#svao").on("click", function() {
  render("СВАО");
});

d3.select("#vao").on("click", function() {
  render("ВАО");
});

d3.select("#uvao").on("click", function() {
  render("ЮВАО");
});

d3.select("#uao").on("click", function() {
  render("ЮАО");
});

d3.select("#uzao").on("click", function() {
  render("ЮЗАО");
});

d3.select("#zao").on("click", function() {
  render("ЗАО");
});

d3.select("#szao").on("click", function() {
  render("СЗАО");
});

d3.select("#cao").on("click", function() {
  render("ЦАО");
});


/* Functions */
function render(myplace) {
  title.text(myplace);

  svg.select(".chord")
    .remove();

  svg.select(".arc")
    .remove();
    // .style("visibility", "hidden");

  svg.select(".label")
    .remove();

  d3.json("data/matrix.json", function(file) {
    var places = {},
        matrix = [],
        n = 0;

    if (myplace != "Москва") {
      file.forEach(function(d) {
        if (d.okrug === myplace) {
          matrix.push(d.routes);
          places[n] = d.district;
          n++;
        }
      });
    }
    else {
      matrix = data;
      places = okrugs;
    }

    layout.matrix(matrix);

    // if (myplace === "Москва") {
      arcs = svg.append("svg:g")
        .attr("class", "arc")
        .selectAll("path")
        .data(layout.groups)
      .enter().append("svg:path")
        .attr("id", function(d, i) {return "arc" + i;})
        .on("mouseover", mouseover)
        .style("fill", function(d) {return fill(d.index);})
        .style("stroke", function(d) {return fill(d.index);})
        .attr("d", arc);
      // }
      // else
      // {
      //   arcs = svg.select(".arc")
      //   .attr("class", "arc")
      //   .selectAll("path")
      //   .data(layout.groups)
      // // .enter().append("svg:path")
      //   // .attr("id", function(d, i) {return "arc" + i;})
      //   // .on("mouseover", mouseover)
      //   // .style("fill", function(d) {return fill(d.index);})
      //   // .style("stroke", function(d) {return fill(d.index);})
      //   .transition()
      //   .duration(700)
      //   .delay(0)
      //   .attrTween("d", arcTween(last_chords))
      //   .style("visibility", "visible");
      //   // .attr("d", arc);
      // }

    // d3.select(".arc")
    //   .selectAll("title")
    //   .text(function(d, i) {return districts[i];});
    var arctitles = arcs.append("title")
      .text(function(d, i) {return places[i];});

    labels = svg.append("svg:g")
      .attr("class", "label")
      .selectAll("text")
      .data(layout.groups)
    .enter().append("svg:text")
      .attr("dy", "20px")
      .attr("text-anchor", "middle");

    labelspath = labels.append("svg:textPath")
      .attr("xlink:href", function(d, i) {return "#arc" + i;})
      .text(function(d, i) {return places[i];})
      .attr("startOffset", function(d) {
        angle = d.startAngle + (d.endAngle - d.startAngle)/2;
        angle = d.endAngle * 180 / Math.PI;
        return ((angle > 100) & (angle < 270)) ? "71%" : "21%";
      });

    // Remove the labels that don't fit
    labels.filter(function(d, i) {
      return arcs[0][i].getTotalLength() / 2 - 40 < this.getComputedTextLength(); })
      .style("visibility", "hidden");

    // Add the chords
    chordlines = svg.append("svg:g")
      .attr("class", "chord")
      .selectAll("path")
      .data(layout.chords)
    .enter().append("svg:path")
      .attr("id", function(d, i) {return "chord" + i;})
      .style("fill", function(d) {return fill(d.target.index);})
      .attr("d", chordl);

    // chordlines
    //   .transition()
    //   .delay(0)
    //   .duration(350)
    //   .attr("d", chordl);

    // Add an elaborate mouseover title for each chord.
    chordlines.append("title").text(function(d) {
      return places[d.source.index]
        + " ↔ " + places[d.target.index]
        + ": " + d.source.value;
    });

    last_chords = layout;
  });
};


function mouseover(d, i) {
    chordlines.classed("fade", function(p) {
      return p.source.index != i
          && p.target.index != i;
    });
};


function arcTween(prev_chord) {
  return function(d,i) {
    var j = d3.interpolate(prev_chord.groups()[i], d);

    return function(t) {
      return arc(j(t));
    }
  }
}
function chordTween(chord) {
  return function(d,i) {
    var i = d3.interpolate(chord.chords()[i], d);

    return function(t) {
      return chordl(i(t));
    }
  }
}