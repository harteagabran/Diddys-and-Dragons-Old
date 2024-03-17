var expThresh = [
  {
	easy: 25,
	medium: 50,
	hard: 70,
	deadly: 100
  },
  {
	easy: 50,
	medium: 100,
	hard: 150,
	deadly: 200
  },
  {
	easy: 75,
	medium: 150,
	hard: 225,
	deadly: 400
  },
  {
	easy: 125,
	medium: 250,
	hard: 375,
	deadly: 500
  },
  {
	easy: 250,
	medium: 500,
	hard: 750,
	deadly: 1100
  },
  {
	easy: 300,
	medium: 600,
	hard: 900,
	deadly: 1400
  },
  {
	easy: 350,
	medium: 750,
	hard: 1100,
	deadly: 1700
  },
  {
	easy: 450,
	medium: 900,
	hard: 1400,
	deadly: 2100
  },
  {
	easy: 550,
	medium: 1100,
	hard: 1600,
	deadly: 2400
  },
  {
	easy: 600,
	medium: 1200,
	hard: 1900,
	deadly: 2800
  },
  {
	easy: 800,
	medium: 1600,
	hard: 2400,
	deadly: 3600
  },
  {
	easy: 1000,
	medium: 2000,
	hard: 3000,
	deadly: 4500
  },
  {
	easy: 1100,
	medium: 2200,
	hard: 3400,
	deadly: 5100
  },
  {
	easy: 1250,
	medium: 2500,
	hard: 3800,
	deadly: 5700
  },
  {
	easy: 1400,
	medium: 2800,
	hard: 4300,
	deadly: 6400
  },
  {
	easy: 1600,
	medium: 3200,
	hard: 4800,
	deadly: 7200
  },
  {
	easy: 2000,
	medium: 3900,
	hard: 5900,
	deadly: 8800
  },
  {
	easy: 2100,
	medium: 4200,
	hard: 6300,
	deadly: 9500
  },
  {
	easy: 2400,
	medium: 4900,
	hard: 7300,
	deadly: 10900
  },
  {
	easy: 2800,
	medium: 5700,
	hard: 8500,
	deadly: 12700
  }
];
function monMult(monNum, plNum) {
	let m = 0;
	for(i = 0; i < monNum.length; i++) {
		m += Number(monNum[i].value);
	}
	let num = 0
	if(m == 1) {
		num = 1;
	} else if(m == 2) {
		num = 1.5;
	} else if(m >= 3 && m <=6) {
		num  = 2;
	} else if(m >= 7 && m <=10) {
		num = 2.5;
	} else if(m >= 11 && m <= 14) {
		num = 3;
	} else if(m >= 15) {
		num = 4;
	} else {
		num = 1;
	}
	if(plNum < 3) {
		num += 0.5;
	} else if(plNum > 5) {
		num -= 0.5;
	}
	return num;
} 
function getDifficulty(plys, adj) {
	let easy = 0, medium = 0, hard = 0, deadly = 0;
	plys.forEach(function(pl) {
		let tLv = pl.lv - 1;
		easy += expThresh[tLv].easy;
		medium += expThresh[tLv].medium;
		hard += expThresh[tLv].hard;
		deadly += expThresh[tLv].deadly;
	});
	if(adj < medium) {
		return 'easy';
	} else if (adj >= medium && adj < hard) {
		return 'medium';
	} else if (adj >= hard && adj < deadly) {
		return 'hard';
	} else if (adj >= deadly) {
		return 'deadly';
	} else {
		alert('Something is wrong. Make sure you have players in session');
	}
}