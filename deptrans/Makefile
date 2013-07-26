LIBRARY_FILES = \
	../d3/src/start.js \
	js/libs/chord.js \
	../d3/src/xhr/json.js \
	../d3/src/svg/chord.js \
	../d3/src/selection/selection.js \
	../d3/src/transition/transition.js \
	../d3/src/geo/mercator.js \
	../d3/src/end.js \
	/usr/lib/node_modules/topojson/topojson.js

all: $(LIBRARY_FILES)
	smash $(LIBRARY_FILES) | uglifyjs - -c -m -o js/libs/lib.js
	uglifyjs js/vis.js -c -m -o js/vis.min.js
