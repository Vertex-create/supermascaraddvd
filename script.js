let outputWidth;
let outputHeight;

let faceTracker;
let videoInput;

let imgMask1;
let imgMask2;
let imgMask3;
let imgMask4;

let selected = -1;

function preload() {
	imgMask1 = loadImage("img/clown.png");
	imgMask2 = loadImage("img/dog.png");
	imgMask3 = loadImage("img/party_face.png");
	imgMask4 = loadImage("img/tired-face.png");
}
function setup() {
	const maxWidth = Math.min(windowWidth, windowHeight);
	pixelDensity(1);
	outputHeight = maxWidth * 0.75;
	outputWidth = maxWidth;

	createCanvas(outputWidth, outputHeight);
	videoInput = createCapture(VIDEO);
	videoInput.size(outputWidth, outputHeight);
	videoInput.hide();

	const sel = createSelect();
	const selectList = ['Клоун', 'Собака', 'Вечеринка', 'Разочарование'];
	sel.option('Select filter', -1);
	for (let i = 0; i < selectList.length; i++) {
		sel.option(selectList[i], i);
	}
	sel.changed(applyFilter);

	faceTracker = new clm.tracker();
	faceTracker.init();
	faceTracker.start(videoInput.elt);
}

function applyFilter() {
	selected = this.selected();
}

function draw() {
	image(videoInput, 0, 0, outputWidth, outputHeight);

	switch (selected) {
		case '-1': break;
		case '0': drawMask1(); break;
		case '1': drawMask2(); break;
		case '2': drawMask3(); break;
		case '3': drawMask4(); break;
	}
}
function drawMask1() {
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false) {
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.5;
		const wy = Math.abs(positions[7][0] - Math.min(positions[16][1], positions[20][1])) * 1.5;
		translate(-wx/2, -wy/2);
		image(imgMask1, positions[62][0], positions[62][1], wx, wy);
		pop();
	}
}
function drawMask2() {
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false) {
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.5;
		const wy = Math.abs(positions[7][0] - Math.min(positions[16][1], positions[20][1])) * 1.5;
		translate(-wx/2, -wy/2);
		image(imgMask2, positions[62][0], positions[62][1], wx, wy);
		pop();
	}
}
	function drawMask3() {
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false) {
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.5;
		const wy = Math.abs(positions[7][0] - Math.min(positions[16][1], positions[20][1])) * 1.5;
		translate(-wx/2, -wy/2);
		image(imgMask3, positions[62][0], positions[62][1], wx, wy);
		pop();
	}
}
function drawMask4() {
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false) {
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.5;
		const wy = Math.abs(positions[7][0] - Math.min(positions[16][1], positions[20][1])) * 1.5;
		translate(-wx/2, -wy/2);
		image(imgMask4, positions[62][0], positions[62][1], wx, wy);
		pop();
	}
}
function windowResized() {
	const maxWidth = Math.min(windowWidth, windowHeight);
	pixelDensity(1);
	outputHeight = maxWidth * 0.75;
	outputWidth = maxWidth;
	resizeCanvas(outputWidth, outputHeight);
}