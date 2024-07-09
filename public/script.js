const drawKeyboard = (keyboard) => {
	const canvas = document.getElementById('keyboard');
	const ctx = canvas.getContext('2d');
	const WIDTH = 400;
	const HEIGHT = 200;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	
	const FONTSIZE = 16;
	ctx.font = `${FONTSIZE}px Arial`;
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
		ctx.fillStyle = '#000';
		ctx.fillText(note.keyName,
			whiteKeyWidth * i + (whiteKeyWidth / 2 - FONTSIZE/4),
			HEIGHT - 1.5*FONTSIZE
		);
	}
	
	ctx.fillStyle = '#000';
	const blackKeyWidth = whiteKeyWidth / 2;
	const blackKeyHeight = HEIGHT / 1.75;
	for (var i=0; i<6; i++) {
		if (i != 2) {
			var note;
			Object.keys(keyboard).forEach(x => note = keyboard[x].bkID === i ? keyboard[x]: note);
			if (note.pressed) {
				ctx.fillStyle = '#666';
			}
			ctx.fillRect(
				(whiteKeyWidth * (i+1)) - (blackKeyWidth / 2), 0,
				blackKeyWidth, blackKeyHeight
			);
			ctx.fillStyle = '#fff';
			ctx.fillText(note.keyName,
				(whiteKeyWidth * (i+1)) - FONTSIZE/2.75,
				blackKeyHeight - FONTSIZE/1.5
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
const cSh3 = new Audio("notes/Cs3.wav");
const dSh3 = new Audio("notes/Ds3.wav");
const fSh3 = new Audio("notes/Fs3.wav");
const gSh3 = new Audio("notes/Gs3.wav");
const bFl3 = new Audio("notes/Bb3.wav");

var notes = {
	'a': {
		audio: c3,
		wkID: 0,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'A',
	},
	's': {
		audio: d3,
		wkID: 1,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'S',
	},
	'd': {
		audio: e3,
		wkID: 2,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'D',
	},
	'f': {
		audio: f3,
		wkID: 3,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'F',
	},
	'g': {
		audio: g3,
		wkID: 4,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'G',
	},
	'h': {
		audio: a3,
		wkID: 5,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'H',
	},
	'j': {
		audio: b3,
		wkID: 6,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'J',
	},
	'k': {
		audio: c4,
		wkID: 7,
		bkID: -1,
		pressed: false,
		fading: false,
		keyName: 'K',
	},
	'w': {
		audio: cSh3,
		wkID: -1,
		bkID: 0,
		pressed: false,
		fading: false,
		keyName: 'W',
	},
	'e': {
		audio: dSh3,
		wkID: -1,
		bkID: 1,
		pressed: false,
		fading: false,
		keyName: 'E',
	},
	't': {
		audio: fSh3,
		wkID: -1,
		bkID: 3,
		pressed: false,
		fading: false,
		keyName: 'T',
	},
	'y': {
		audio: gSh3,
		wkID: -1,
		bkID: 4,
		pressed: false,
		fading: false,
		keyName: 'Y',
	},
	'u': {
		audio: bFl3,
		wkID: -1,
		bkID: 5,
		pressed: false,
		fading: false,
		keyName: 'U',
	},
};

drawKeyboard(notes);



document.addEventListener('keydown', (event) => {
	var note = notes[event.key];
	if (note && !note.pressed) {
		note.pressed = true;
		note.audio.volume = 0.2;
		note.audio.play();
		drawKeyboard(notes);
	}
});

document.addEventListener('keyup', (event) => {
	var note = notes[event.key];
	if (note) {
		note.pressed = false;
		var fadeout = setInterval(() => {
			note.fading = true;
			if (note.pressed) {
				clearInterval(fadeout);
				note.audio.volume = 0.2;
				note.audio.pause();
				note.audio.currentTime = 0;
				note.audio.play();
			} else if (note.audio.volume > 0.01) {
				note.audio.volume -= 0.05;
			} else {
				note.fading = false;
				clearInterval(fadeout);
				note.audio.volume = 0.2;
				note.audio.pause();
				note.audio.currentTime = 0;
			}
		}, 25);
		drawKeyboard(notes);
	}
});


// fadeout experiments in case you ever want to come back to it


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