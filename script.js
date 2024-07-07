const drawKeyboard = (keyboard) => {
	const canvas = document.getElementById('keyboard');
	const ctx = canvas.getContext('2d');
	const WIDTH = 400;
	const HEIGHT = 200;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	ctx.strokeStyle = '#777';
	ctx.lineWidth = 2;
	const whiteKeyWidth = WIDTH / 8;
	for (var i=0; i<8; i++) {
		var note;
		Object.keys(keyboard).forEach(x => note = keyboard[x].wkID === i ? keyboard[x]: note);
		if (note.pressed) {
			ctx.fillStyle = '#888';
			ctx.fillRect(whiteKeyWidth * i, 0, whiteKeyWidth, HEIGHT);
		}
		ctx.strokeRect(whiteKeyWidth * i, 0, whiteKeyWidth, HEIGHT);
	}
	
	ctx.fillStyle = '#000';
	const blackKeyWidth = whiteKeyWidth / 2;
	const blackKeyHeight = HEIGHT / 1.75;
	for (var i=0; i<6; i++) {
		if (i != 2) {
			var note;
			Object.keys(keyboard).forEach(x => note = keyboard[x].bkID === i ? keyboard[x]: note);
			if (note.pressed) {
				ctx.fillStyle = '#444';
			}
			ctx.fillRect(
				(whiteKeyWidth * (i+1)) - (blackKeyWidth / 2), 0,
				blackKeyWidth, blackKeyHeight
			);
			ctx.fillStyle = '#000';
		}
	}
};

const c3 = new Audio("notes/C3.wav");
const d3 = new Audio("notes/D3.wav");
const e3 = new Audio("notes/E3.wav");
const f3 = new Audio("notes/F3.wav");
const g3 = new Audio("notes/G3.wav");
const a3 = new Audio("notes/A3.wav");
const b3 = new Audio("notes/B3.wav");
const c4 = new Audio("notes/C4.wav");

// consider assigning value here to be object with audio elem and key to animate elem
var notes = {
	'a': {
		audio: c3,
		wkID: 0,
		bkID: -1,
		pressed: false,
	},
	's': {
		audio: d3,
		wkID: 1,
		bkID: -1,
		pressed: false,
	},
	'd': {
		audio: e3,
		wkID: 2,
		bkID: -1,
		pressed: false,
	},
	'f': {
		audio: f3,
		wkID: 3,
		bkID: -1,
		pressed: false,
	},
	'g': {
		audio: g3,
		wkID: 4,
		bkID: -1,
		pressed: false,
	},
	'h': {
		audio: a3,
		wkID: 5,
		bkID: -1,
		pressed: false,
	},
	'j': {
		audio: b3,
		wkID: 6,
		bkID: -1,
		pressed: false,
	},
	'k': {
		audio: c4,
		wkID: 7,
		bkID: -1,
		pressed: false,
	},
};

drawKeyboard(notes);

document.addEventListener('keydown', (event) => {
	var note = notes[event.key];
	if (note) {
		note.audio.volume = 0.5;
		note.audio.play();
		note.pressed = true;
		drawKeyboard(notes);
	}
});

document.addEventListener('keyup', (event) => {
	var note = notes[event.key];
	if (note) {
		note.audio.pause();
		note.audio.currentTime = 0;
		note.pressed = false;
		drawKeyboard(notes);
	}
});


// fadeout experiments in case you ever want to come back to it
// var fadeout = setInterval(() => {
// 	if (note.volume > 0.1) {
// 		note.volume -= 0.2;
// 	} else {
// 		clearInterval(fadeout);
// 		note.volume = 1;
// 		note.pause();
// 		note.currentTime = 0;
// 	}
// }, 25);

// reset everything in case note is still fading out
// note.volume = 1;
// note.pause();
// note.currentTime = 0;

// document.addEventListener('keydown', function(event){
// 	if(event.key=='f' && !pressed) {
// 		s1.play();
// 		pressed = true;
// 	}
// });

// document.addEventListener('keyup', function(event){
// 	if(event.key=='f') {
// 		s1.pause();
// 		s1.currentTime = 0;
// 		pressed = false;
// 	}
// });