// Based on code by Daniel Shiffman

var font;
var vehicles = [];

let canvas;

let words = [ 'hi.', 'welcome.', 'now go away.' ];
let wordIndex = 0;

function preload() {
	font = loadFont('CaviarDreams_Bold.ttf');
}

function setup() {
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	textAlign(CENTER);
	words.forEach((w, i) => {
		setTimeout(() => {
			createWord(w);
		}, 10000 * i + 1);
	});
}

function createWord(text) {
	var points = font.textToPoints(text, width / 2, height / 2, 192, {
		sampleFactor: 0.25
	});

	points = adjustToCenter(points);

	for (var i = 0; i < points.length; i++) {
		var pt = points[i];
		if (vehicles[i]) {
			vehicles[i] = new Vehicle(pt.x, pt.y, vehicles[i].pos.x, vehicles[i].pos.y);
		} else {
			vehicles.push(new Vehicle(pt.x, pt.y, null, null));
		}
	}
}

function draw() {
	background(255);
	for (var i = 0; i < vehicles.length; i++) {
		var v = vehicles[i];
		v.behaviors();
		v.update();
		v.show();
	}
}

function adjustToCenter(pointList) {
	let offset = getCenter(pointList);
	pointList.forEach((point) => {
		point.x -= offset;
	});
	return pointList;
}

function getCenter(pointList) {
	let maxVal = Math.max.apply(
		Math,
		pointList.map((point) => {
			return point.x;
		})
	);
	return (maxVal - width / 2) / 2;
}

window.onresize = () => {
	var w = window.innerWidth;
	var h = window.innerHeight;
	canvas.size(w, h);
	width = w;
	height = h;
};
