var Colors = ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2","#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"];

var okrugs = {0: "ВАО", 1: "ЦАО", 2: "ЮВАО", 3: "ЮАО",
              4: "ЮЗАО", 5: "ЗАО", 6: "СЗАО"};

var data = [
  [194, 24, 36, 0, 0, 0, 0],
  [24, 151, 27, 34, 22, 21, 14],
  [36, 27, 194, 30, 2, 1, 1],
  [0, 34, 30, 240, 49, 7, 0],
  [0, 22, 2, 49, 184, 52, 0],
  [0, 21, 1, 7, 52, 211, 12],
  [0, 14, 1, 0, 0, 12, 160],
  ];

var last_chords = {};

var fill = d3.scale.category20c();

var width = 900,
    height = 600,
    outerRadius = Math.min(width, height) * .4,
    innerRadius = outerRadius * .95,
    northAngle = 0  * Math.PI / 180;

// Compute the chord layout
var layout = d3.layout.chord()
  .padding(.02)
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
    .attr("transform", "translate(" + width / 2 + "," + (height / 2 - 20) + ")");

// Draw the map
maprender();

// var textcircle = svg.append("svg:circle")
//   .attr("r", outerRadius*1.3)
//   .style("fill", "none")
//   .style("stroke", "gray");

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

    if (myplace === "Москва") {
      matrix = data;
      places = okrugs;
    }
    else {
      file.forEach(function(d) {
        if (d.okrug === myplace) {
          matrix.push(d.routes);
          places[n] = d.district;
          n++;
        }
      });
    }

    layout.matrix(matrix);

    arcs = svg.append("svg:g")
      .attr("class", "arc")
      .selectAll("g")
      .data(layout.groups)
    .enter().append("svg:g")
      .attr("id", function(d, i) {return "arc" + i;});

    arcs.append("svg:path")
      .on("mouseover", mouseover)
      .style("fill", function(d) {return Colors[d.index];})
      .style("stroke", function(d) {return Colors[d.index];})
      .attr("d", arc);

    var arctitles = arcs.append("title")
      .text(function(d, i) {return places[i];});



    arcs.append("svg:text")
      .attr("class", "label")
      .attr("transform", function(d) {
          var c = arc.centroid(d),
              x = c[0],
              y = c[1],
              // pythagorean theorem for hypotenuse
              h = Math.sqrt(x*x + y*y);
          return "translate(" + (x/h * (outerRadius + 10)) +  ',' +
             (y/h * (outerRadius + 10)) +  ")";
      })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) {
          return (d.endAngle + d.startAngle)/2 > Math.PI ?
              "end" : "start";
      })
      .text(function(d, i) {return places[i];});

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

    // Add the chords
    chordlines = svg.append("svg:g")
      .attr("class", "chord")
      .selectAll("path")
      .data(layout.chords)
    .enter().append("svg:path")
      .attr("id", function(d, i) {return "chord" + i;})
      .style("fill", function(d) {return Colors[d.target.index];})
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



function maprender() {
      // .append("svg:g")
      // .attr("id", "map");
      // .attr("transform", "rotate(50)");

  d3.json("data/moscowmap.json", function(error, msk) {

      var width = 300,
          height = 300;

      // var center = d3.geo.centroid(msk.objects.okrugs);
      var scale  = 2200;
      var offset = [-80, 500];
      var projection = d3.geo.mercator().scale(scale).center([37,55])
          .translate(offset);

      var path = d3.geo.path()
          .projection(projection);

      var svg = d3.select("#map").append("svg")
          .attr("width", width)
          .attr("height", height);

    // Okrugs
    var okrugsmap = svg.append("svg:g")
        .attr("class", "okrug")
        .selectAll("path")
        .data(topojson.feature(msk, msk.objects.okrugs).features)
      .enter().append("svg:path")
        .style("fill", function(d, i) {return Colors[i];})
        .attr("d", path)
        .on("click", function(d) {render(d.properties.NAME);})
        .on("mouseover", function() {d3.select(this).style("stroke", "White").style("stroke-width", "2px");})
        .on("mouseout", function() {d3.select(this).style("stroke", "Black").style("stroke-width", ".5px");});

    var okrugstitle = okrugsmap.append("title")
        .text(function(d) {return d.properties.NAME;});

    // okrugsmap.filter(function(d) {return d.properties.LVL == 8;}).remove();


    // Districts
    // var districtsmap = svg.append("svg:g")
    //     .attr("class", "district")
    //     .selectAll("path")
    //     .data(topojson.feature(msk, msk.objects.districts).features)
    //   .enter().append("svg:path")
    //     .attr("d", path);

    // var districtstitle = districtsmap.append("title")
    //     .text(function(d) {return d.properties.NAME;});

    // districtsmap.filter(function(d) {return d.properties.LVL == 5;}).remove();

  });
}


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