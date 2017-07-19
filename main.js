var words = [
	'ilustrasi',
	'elonmusk',
];

var tts = []

var words_tmp = []

words = words.map(d => d.toUpperCase(d))

shuffleArray(words);

words = words.sort((a,b) => a.length < b.length ? 1 : 0)

var max = words[0].length

console.log(words)

var found = false
var currPointerX = 0;
var currPointerY = 0;
var currPointer = 0;
var first = true
while(words.length > 0) {
	if(first) {
		place(words[0], 0, 0, 0)
		first = false	
	} else {
		found = false
		currPointer = 0
		for(var i = 0; i < (tts.length > tts[0].length ? tts.length : tts[0].length); i++) {
			if(found == true) {

			} else if(typeof tts[i] !== "undefined") {
				for(var j = 0; j < (tts.length > tts[0].length ? tts.length : tts[0].length); j++) {
					if(typeof tts[i][j] !== "undefined") {
						var loc = words[0].indexOf(tts[i][j].char)
						if(found == false) {
							if(loc >= 0) {
								// console.log(`FOUND WORD POS x${j} y${i} ${tts[i][j].word_horz} ${words[0]} ${loc}`)
								if(typeof tts[i][j].word_horz == "undefined") {
									//VERTICAL
									moveTo(tts[i][j].vert_index, null, loc)
									place(words[0], j, i, 0)
								} else {
									//HORZ
									// console.log(`set vertical virtuoso ${words[0]} ${tts[i][j].char}`)
									moveTo(tts[i][j].horz_index, null, loc)
									place(words[0], j, i, 1)
								}
								// console.log(tts)
								found = true;
							}
						}
					}
				}	
			}
		}
 	}
	words.splice(0, 1)
}
//

function debug() {
	//DEBUG
	for(var i = 0; i < (tts.length > tts[0].length ? tts.length : tts[0].length); i++) {
		var tmp = '';
		if(typeof tts[i] !== "undefined") {
			for(var j = 0; j < (tts.length > tts[0].length ? tts.length : tts[0].length); j++) {
				if(typeof tts[i][j] == "undefined") {
					tmp += "  "
				} else if(typeof tts[i][j].char == "undefined") {
					tmp += "  "	
				} else {
					tmp += tts[i][j].char + " "
				}
			}
			console.log(tmp)
		}
	}
}

debug()

console.log(words_tmp)

function moveTo(index, xMove, yMove) {
	// console.log(`Move ${words_tmp[index].word} to ${xMove} ${yMove}`)
	var data = words_tmp[index],
		dir = data.dir,
		wrd = data.word,
		x = data.x,
		y = data.y;
 	if(dir == 0) {
 		//Horz
		for(var i = 0; i < wrd.length + x; i++) {
			if(!tts[y][x+i].vert_index) {
				delete tts[y][x+i]
			}
		}
	} else {
		//Vert
		for(var i = 0; i < wrd.length + y; i++) {
			if(!tts[y+i][x].vert_index) {
				delete tts[y+i][x]
			}
		}
	}
	place(wrd, xMove, yMove, dir, index);
}

function place(wrd, x, y, dir = 0, editIndex = false) {
	// console.log(`PLACE ${wrd} to ${x} ${y}`)
	if(editIndex === false) {
		words_tmp.push({word: wrd, x:x, y:y, dir:dir})	
	} else {
		words_tmp[editIndex].x = x;
		words_tmp[editIndex].y = y;
	}
	if(dir == 0) {
		//HORZ
		for(var i = 0; i < wrd.length + x; i++) {
			if(typeof tts[y] == "undefined") tts[y] = []
			tts[y][x+i] = {
				char: wrd[i], 
				word_horz: wrd, 
				horz_index: words_tmp.length-1
			};
		}
	} else {
		//VERT
		for(var i = 0; i < wrd.length + y; i++) {
			if(typeof tts[y+i] == "undefined") tts[y+i] = []
			tts[y+i][x] = {
				char: wrd[i], 
				word_vert: wrd, 
				vert_index: words_tmp.length-1
			};
		}
	}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}