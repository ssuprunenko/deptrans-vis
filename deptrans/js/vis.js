// var Colors = ["#F6EFF7","#d53e4f", "#66c2a5", "#3288bd","#67A9CF","#fdae61","#f46d43","#762a83","#e6f598","#5e4fa2","#abdda4","#ffffbf","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837", "#762a83"];

// var Colors = ["#E0F3F8",
//               "#CB181D", "#1B7837", "#2166AC", "#92C5DE", "#FC8D62",
//               "#FC4E2A", "#88419D", "#FECC5C", "#BABABA", "#B8E186",
//               "#80CDC1", "#92C5DE", "#ABD9E9"];
/* Colors
 * background/antiquewhite: #f9e8d6
 * orange/coral:            #f58055
 * pink/tomato:             #ef6155
 * green-brown/
 *  palegoldenrod:          #e5d99f
 * sky/lightsteelblue:      #afc9ca
 * blue/cadetblue:          #6f9fb6
 * green/darkkhaki:         #c0bd52
 * gray/silver:             #cac4b8
 * dimgray:                 #776670
 * black:                   #242021
 *
 */
// var Colors = ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf",
//               "#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2",
//               "#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"];

// Moto colors
// var Colors = ["#ef6155", "#f58055", "#e5d99f", "#afc9ca",
//               "#6f9fb6", "#c0bd52", "#cac4b8", "#776670"];

// // Spectral colors
var Colors = ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf",
              "#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2",
              "#762a83","#af8dc3","#e7d4e8","#d9f0d3","#7fbf7b","#1b7837"];


// Flat UI colors
var Colors = ["#c0392b", "#e74c3c", "#d35400", "#e67e22",
              "#f39c12", "#2ecc71", "#27ae60", "#16a085",
              "#00c0e4", "#3498db", "#2980b9", "#7658f8",
              "#9b59b6", "#8e44ad", "#34495e", "#2c3e50",
              "#000"];

var okrugs = {0: "СВАО", 1: "ВАО", 2: "ЦАО", 3: "ЮВАО", 4: "ЮАО", 5: "ЮЗАО",
              6: "ЗАО", 7: "СЗАО", 8: "САО",
             9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: ""};

var foreground = "#000",
    background = "#ecf0f1";

var file;
d3.json("data/matrix.json", function(myfile) {
  file = myfile;
});


var data = [
  [156, 8, 31, 2, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 0],
  [8, 194, 24, 36, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [31, 24, 151, 27, 34, 22, 21, 14, 26, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 36, 27, 194, 30, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 34, 30, 240, 49, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 22, 2, 49, 184, 52, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 21, 1, 7, 52, 211, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 14, 1, 0, 0, 12, 160, 36, 0, 0, 0, 0, 0, 0, 0, 0],
  [29, 1, 26, 2, 0, 1, 5, 36, 183, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


var null_data = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var last_chord = {},
    last_place;

var mypadding = 0.075;

// var fill = d3.scale.category20c();

var width = 760,
    height = 600,
    outerRadius = Math.min(width, height) * .37,
    innerRadius = outerRadius * .9,
    northAngle = 10  * Math.PI / 180;

var endAngle = 2*Math.PI - mypadding;
var arc = d3.svg.arc()
    .startAngle(function(d) {
      if (isNaN(d.endAngle)) {
        d.value = 0;
        d.endAngle = 0;
        d.startAngle = 0;
      };
      return d.startAngle < endAngle ? d.startAngle:endAngle;
    })
    .endAngle(function(d) {
      return d.endAngle <= endAngle ? d.endAngle:endAngle;
    })
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var chordl = d3.svg.chord()
    // .startAngle(function(d) {return d.startAngle - northAngle})
    // .endAngle(function(d) {return d.endAngle - northAngle})
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

var title = d3.select("#title")
      .text("Москва");
var district_title;

var arcs,
    chordlines,
    labels,
    textcircle;

render("Москва");
update("Москва");


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


/* Functions */
function render(myplace) {
  title.text(myplace);

  var matrix = null_data;

  // Compute the chord layout
  var layout = d3.layout.chord()
    .matrix(matrix);

  arcs = svg.append("svg:g")
    .attr("class", "arc")
    .selectAll("g")
    .data(layout.groups)
  .enter().append("svg:g")
    .attr("id", function(d, i) {return "arc" + i;});

  arcs.append("svg:path")
    .on("mouseover", mouseover)
    .style("fill", function(d, i) {return Colors[i];})
    // .style("stroke", function(d, i) {return d.value != 0 ? Colors[i]:"none";})
    .attr("visibility", function(d) {return d.value == 0 ? "hidden": "visible";})
    .attr("d", arc);

  // Add the chords
  chordlines = svg.append("svg:g")
    .attr("class", "chord");

  textcircle = svg.append("svg:circle")
    .attr("class", "circle");

  last_chord = layout;
  last_place = 0;
};


function mouseover(d, i) {
    chordlines.classed("fade", function(p) {
      return p.source.index != i
          && p.target.index != i;
    });
};

function update(myplace) {

  if (last_place != myplace) {

    var places = {},
      matrix = [],
      n = 0;

    if (myplace === "Москва") {
      title.text(myplace).on("click", function() {update(myplace);});
      matrix = data;
      places = okrugs;
    }
    else {
      title.text("");
      district_title = title.append("text").text("Москва / " + myplace);
      file.forEach(function(d) {
        if (d.okrug === myplace) {
          matrix.push(d.routes);
          places[n] = d.district;
          n++;
        }
      });
    }

    // Compute the chord layout
    var layout = d3.layout.chord()
      .padding(mypadding)
      .sortSubgroups(d3.descending)
      // .sortChords(d3.ascending)
      .matrix(matrix);

    svg.select(".chord")
    .remove();

    arcs.select("text")
      .remove();

    arcs.select("title")
      .remove();

    textcircle.remove();

    // update arcs
    arcs = svg.select(".arc")
      .selectAll("g")
      .data(layout.groups);

    arcs.select("path")
      // .attr("d", arc);
      .transition()
      .duration(2000)
      // .delay(0)
      .ease('elastic', 1, 1)
      .attrTween("d", arcTween(last_chord));

    arcs.select("path")
      .on("mouseover", mouseover);

    arcs.append("title")
        .text(function(d, i) {return d.value != 0 ? places[i] : "";});


    // update labels
    labels = arcs.append("svg:text")
      .attr("class", "label")
      .attr("transform", function(d,i) {
        var c = arc.centroid(d),
            x = c[0],
            y = c[1],
            // pythagorean theorem for hypotenuse
            h = Math.sqrt(x*x + y*y);
        if (places[i].split(' ').length === 1) {
          return "translate(" + (x/h * (outerRadius + 10)) +  ',' +
            (y/h * (outerRadius + 15)) +  ")";
        }
        else {
          return "translate(" + (x/h * (outerRadius + 10)) +  ',' +
            (y/h * (outerRadius + 20)) +  ")";
        }
      })
      .attr("text-anchor", function(d) {
          return (d.endAngle + d.startAngle)/2 > Math.PI ?
              "end" : "start";
      });

    labels.text(function(d, i) {
      if (d.value != 0) {
        var name = places[i].split(' ');
        return name[0];
        }
      else return "";
      })
      .style("stroke", background)
      .style("fill-opacity", ".2");

    labels.append('tspan')
      .text(function(d, i) {
        if (d.value != 0) {
          var name = places[i].split(' ');
          if (name.length === 2) {
            return name[1];
          }
        }
        else return "";
      })
      .attr('x', '0em')
      .attr('y', '1.1em')
      .style("stroke", background)
      .style("fill-opacity", ".2");

    labels
      // .transition()
      // // .delay(100)
      // .duration(500)
      .style("stroke", foreground)
      .style("fill-opacity", "1");

    labels.select('tspan')
      // .transition()
      // // .delay(100)
      // .duration(500)
      .style("stroke", foreground)
      .style("fill-opacity", "1");


    // update chords
    chordlines = svg.append("svg:g")
      .attr("class", "chord")
      .selectAll("path")
      .data(layout.chords)
    .enter().append("svg:path")
      .attr("id", function(d, i) {return "chord" + i;})
      .style("fill", function(d) {return Colors[d.source.index];})
      // .style("stroke", function(d, i) {return d.value != 0 ? Colors[i]:background;})
      .attr("d", chordl);

    chordlines
      .style("fill-opacity", ".1")
      .transition()
      .delay(100)
      .duration(1000)
      .attr("d", chordl)
      .style("fill-opacity", ".8");

    // Add an elaborate mouseover title for each chord.
    chordlines.append("title").text(function(d) {
      return places[d.source.index]
        + " ↔ " + places[d.target.index]
        + ": " + d.source.value;
    });

    textcircle = svg.append("svg:circle")
      .attr("class", "circle")
      .attr("r", innerRadius);

    // Remember latest values
    last_chord = layout;
    last_place = myplace;
  };
    // });
}

function maprender() {
      // .append("svg:g")
      // .attr("id", "map");
      // .attr("transform", "rotate(50)");

  d3.json("data/moscowmap.json", function(error, msk) {

      var width = 270,
          height = 300;

      // var center = d3.geo.centroid(msk.objects.okrugs);
      var scale  = 2200;
      var offset = [-110, 500];
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
        .on("click", function(d) {update(d.properties.NAME);})
        .on("mouseover", function() {
          d3.select(this)
            .style("stroke", "White")
            .style("stroke-width", "2px");
          })
        .on("mouseout", function() {
          d3.select(this)
          .style("stroke", background)
          .style("stroke-width", "1px");
        });

    okrugsmap.append("title")
      .text(function(d) {return d.properties.NAME;});

    // okrugsmap.filter(function(d) {return d.properties.LVL == 8;}).remove();
  });
}

function arcTween(last_chord) {
  return function(d,i) {
    var i = d3.interpolate(last_chord.groups()[i], d);

    return function(t) {
      return arc(i(t));
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

