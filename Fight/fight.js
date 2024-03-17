function rollIni() {
	batMon.forEach(function(mon) {
		let roll = rollDice(1, 20);
		if(!roll.nat) {
			document.getElementById(mon.name + '-ini').className = '';
		} else {
			document.getElementById(mon.name + '-ini').classList.add('nat');
		}
		document.getElementById(mon.name + '-ini').value = roll.total;
	});
}
function battleStart(e) {
	e.preventDefault;
	//clear battle area and batPl
	batAr.innerHTML = '';
	batPl = [];
	//find the initiative of players
	sessPl.forEach(function(boi){
		let iRoll = document.getElementById(boi.player + '-ini');
		let iNum = (iRoll.value != null) ? Number(iRoll.value) : false;
		let iNat = (iRoll.classList.contains('nat')) ? true : false;
		//if not nat roll
		if(!iNat && iNum) {
			iNum += abiToMod(boi.dex);
			//if less than 1
			if(iNum <= 0) {
				iNum = 1;
			}
		}
		//build element and append to section
		//as long as value is not null
		if(iNum) {
			let batD = document.createElement('DIV');
			batD.id = boi.id;
			batD.className = 'battle-unit player';
			txt = '';
			txt += '<h2 class="owner">' + boi.player + ' <span class="ac">&#9820; <b class="acN">' + boi.ac + '</b></span></h2><h1 class="batIni"><b class="iniNum';
			if(iNat) {
				txt += ' natural'
			}
			txt += '">' + iNum + '</b></h1><div class="units"><h3 class="unit pl"><b class="boi-name">' + boi.name + '</b> <span class="hp">&#x2764; <b class="hpN">' + boi.hp + '</b><span class="hpT"> (<b class="hpTN">' + boi.hpT + '</b>)</span></span></div>';
			batD.innerHTML = txt;
			
			//add div to battle area
			batAr.append(batD);
			//add name to array
			batPl.push(boi.name);
		}
	});
	//make sure at least one player is participating
	let ready = (batPl.length > 0) ? true : false;
	
	//make monster divs
	batMon.forEach(function(mon) {
		let mRoll = document.getElementById(mon.name + '-ini');
		let mNum = Number(mRoll.value);
		let mNat = (mRoll.classList.contains('nat')) ? true : false;
		//if not nat roll
		if(!mNat) {
			mNum += abiToMod(mon.dex);
			//if less than 1
			if(mNum <= 0) {
				mNum = 1;
			}
		}
		//build element to append to section
		let batD = document.createElement('DIV');
		batD.id = mon.name + '-battle';
		batD.className = 'battle-unit enemy';
		txt = '';
		txt += '<h2 class="owner"><a class="stat-get" href="#' + mon.name + '">' + mon.name + '</a> <span class="ac">&#9820; <b class="acN">' + parseInt(mon.ac) + '</b></span></h2><h1 class="batIni"><b class="iniNum';
		if(mNat) {
			txt += ' natural'
		}
		txt += '">' + mNum + '</b></h1><div class="units">';
		for(i = 0; i < mon.unit; i++) {
			let monHp = rollHP(mon);
			txt += '<h3 class="unit mon"><b class="boi-name">' + mon.name + ' ' + (i + 1) + '</b> <span class="hp">&#x2764; <b class="hpN">' + monHp + '</b></span></h3>';
			}
		txt += '</div>';
		batD.innerHTML = txt;
		batAr.append(batD);
	});
	//sort divs by inititative
	//if ready
	if(ready) {
		sortDivs(batAr);
		closePop();
	} else {
		alert('at least 1 player needs to participate');
		batAr.textContent = '';
	}
}
function awardExp(btn) {
	let exp = parseInt(btn.firstChild.textContent)
	batPl.forEach(function (name) {
		let boi = termToArray(sessPl, 'name', name);
		boi.exp += exp;
		//if past max exp
		if(boi.exp > 355000) {
			boi.exp = 355000;
		}
		//check if level changes
		boi.lv = calcLvExp('exp', boi.exp, {return: true});
		playersToSession();
		
		//close the window since were done here
		window.close();
	});
}
function sortDivs(ele) {
	let parent = ele;
	let children = ele.children;
	
	//turn children into array to sort
	children = Array.prototype.slice.call(children);
	
	//sort array
	children.sort(function(a, b) {
		let aIni = Number(a.childNodes[1].firstChild.textContent);
		let bIni = Number(b.childNodes[1].firstChild.textContent);
		if((b.childNodes[1].firstChild.classList.contains('natural') && bIni == 20) || (a.childNodes[1].firstChild.classList.contains('natural') && aIni == 1) || aIni < bIni) {
			return 1;
		} else if((b.childNodes[1].firstChild.classList.contains('natural') && bIni == 1) || (a.childNodes[1].firstChild.classList.contains('natural') && aIni == 20) || aIni > bIni) {
			return -1;
		}
	})
	parent.innerHTML = '';
	//rewrite divs
	for(i=0; i<children.length; i++) {
		parent.appendChild(children[i]);
	}
	//check temporary health
	checkTempHp();
	
	//make first div its turn
	children[0].childNodes[1].classList.add('turn')
	
	//put in footer rounds and button
	document.getElementById('rounds').innerHTML = '<button type="button" id="exp-btn" onclick="awardExp(this)"><b id="pl-exp">' + expPrPlayer() + '</b> EXP</button><h2>Round <b id="roundNum">' + round + '</b></h2>';
	
	//add event listener for spacebar press in turns
	window.addEventListener('keydown', checkKeyPressed, false);
	//on local storage change 
	window.addEventListener('storage', storageChange, false);
}
function checkKeyPressed(e) {
	if(e.keyCode == '32') {
		let units =document.getElementsByClassName('batIni');
		let isShift = e.shiftKey;
		
		//remove current turn
		units[turn].classList.remove('turn');
		
		//give turn to next on list
		if(isShift) {
			turn -= 1;
		} else {
			turn += 1;
		}
		
		//if last unit turn start a new round
		if (turn === units.length) {
			turn = 0;
			round += 1;
			//rewrite round
			document.getElementById('roundNum').textContent = round;
		} else if(turn < 0 && round > 1) {
			turn = units.length - 1;
			round -= 1;
			//rewrite round
			document.getElementById('roundNum').textContent = round;
		} else if (turn < 0 && round == 1) {
			turn = 0;
			round = 1;
			//rewrite round
			document.getElementById('roundNum').textContent = round;
		}
		
		//give turn to next unit and focus
		units[turn].classList.add('turn');
		document.getElementsByClassName('turn')[0].scrollIntoView();
	}
}
function expPrPlayer() {
	let plNum = batPl.length;
	let tExp = 0;
	batMon.forEach(function(mon) {
		tExp += parseInt(showExp(mon)) * mon.unit;
	});
	let iExp = Math.floor(tExp / plNum);
	return iExp;
}
function startIni() {
	txt = '<h2>Do Not Include Dex Modifiers</h2><form onsubmit="battleStart(event);return false" id="form-submit"><div id="chara-ini"><h1>Characters</h1><div class="span-hold">';
	//character Initiative
	sessPl.forEach(function(boi) {
		txt += '<span class="ini-hold"><label for="' + boi.id + '">' + boi.player + ' (' + boi.name + ')</label><input name="' + boi.id + '" id="' + boi.player + '-ini" class="pIni" type="number" placeholder="0" min="1" max="99" onchange="checkNat(this)"></span>';
	});
	txt += '</div></div><div id="mons-ini"><h1>Enemies</h1><div class="span-hold">';
	//monster Initiative
	batMon.forEach(function(mon) {
		txt += '<span class="ini-hold"><label for="' + mon.name + '-ini">' + mon.name + '</label><input type="number" value="1" min="1" max="99" id="' + mon.name + '-ini" name="' + mon.name + '-ini" onchange="checkNat(this)"></span>';
	});
	txt += '</div><button type="button" onclick="rollIni()">Random Initiative</button></div><button type="submit" id="btn-battle">Start!</button></form>';
	pop.innerHTML = txt;
	openPop();
	rollIni();
}
function checkNat(input) {
	//if roll is nat
	if(input.value == "20" || input.value == "1") {
		input.classList.add('nat');
	} else {
		input.className = '';
	}
}
function checkTempHp() {
	let nums = document.getElementsByClassName('hpTN');
	for(i = 0; i < nums.length; i++) {
		if(nums[i].textContent == '0') {
			nums[i].parentElement.style.display = 'none';
		} else {
			nums[i].parentElement.style.display = 'block';
		}
	}
}
function drawMonsters() {
	txt = '';
	batMon.forEach(function(mon) {
		txt += '<div class="entity-box" id="' +
		mon.name + '"><h1 class="red name">' + mon.name + '</h1><section class="mon-main"><i>' + mon.meta + '</i></section><section class="mon-hp"><p><b class="red">Armor Class: </b>' + mon.ac + '</p><p><b class="red">Hit Points: </b>' + mon.hp + '</p><p><b class="red">Speed: </b>' + mon.speed + '</p></section><section class="mon-stats"><table class="red"><thead><tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr></thead><tbody><tr><td>' + mon.str + ' (' + abiToMod(mon.str) + ')</td><td>' + mon.dex + ' (' + abiToMod(mon.dex) + ')</td><td>' + mon.con + ' (' + abiToMod(mon.con) + ')</td><td>' + mon.inte + ' (' + abiToMod(mon.inte) + ')</td><td>' + mon.wis + ' (' + abiToMod(mon.wis) + ')</td><td>' + mon.cha + ' (' + abiToMod(mon.cha) + ')</td></tr></tbody></table></section><section class="mon-skills">';
		if (mon.saves) {
			txt += '<p><b class="red">Saving Throws: </b>' + mon.saves + '</p>';
		}
		if (mon.skill) {
			txt += '<p><b class="red">Skills: </b>' + mon.skill + '</p>';
		}
		if (mon.damVul) {
			txt += '<p><b class="red">Damage Vulnerabilities: </b>' + mon.damVul + '</p>';
		}
		if (mon.damRes) {
			txt += '<p><b class="red">Damage Resistances: </b>' + mon.damRes + '</p>';
		}
		if (mon.damImm) {
			txt += '<p><b class="red">Damage Immunitites: </b>' + mon.damImm + '</p>';
		}
		if (mon.conImm) {
			txt += '<p><b class="red">Condition Immunitites: </b>' + mon.conImm + '</p>';
		}
		txt += '<p><b class="red">Senses: </b>' + mon.sense + '</p><p><b class="red">Languages: </b>' + mon.lang + '</p><p><b class="red">Challenge: </b>' + mon.chall + '</p></section>';
		if (mon.abi) {
			txt += mon.abi;
		}
		txt += '<h2 class="red action">Actions</h2>' + mon.act;
		if (mon.legend) {
			txt += '<h2 class="red action">Legendary Arctions</h2>' + mon.legend;
		}
		txt += '</div>';
	});
	monStatAr.innerHTML = txt;
}
////////////
//ON LOAD
////////////
var monStatAr = document.getElementById('battle-area');
var batAr = document.getElementById('initi-track');
var batMon = JSON.parse(localStorage.battle);
drawMonsters();
var batPl = new Array();
var damage = new Array();
//for rounds tracking
var turn = 0, round = 1;

/////////////////
//DRAGABLE MOUSE AREA
/////////////////////
let pos = { top: 0,  x: 0};

const mouseDownHandler = function(e) {
	monStatAr.style.cursor = 'grabbing';
	monStatAr.style.userSmonStatArct = 'none';
	
	pos = {
		left: monStatAr.scrollLeft,
		top: monStatAr.scrollTop,
		x: e.clientX,
		y: e.clientY,
	};
	
	document.addEventListener('mousemove', mouseMoveHandler);
	document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
	const dx = e.clientX - pos.x;
	const dy = e.clientY - pos.y;
	
	monStatAr.scrollTop = pos.top - dy;
	monStatAr.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function(e) {
	monStatAr.style.cursor = 'grab';
	monStatAr.style.removeProperty('user-smonStatArct');
	
	document.removeEventListener('mousemove', mouseMoveHandler);
	document.removeEventListener('mouseup', mouseUpHandler);
};

monStatAr.addEventListener('mousedown', mouseDownHandler);
///////////////////
//EVENT FUNCTIONS
//////////////////
function changeHP(e) {
	e.preventDefault();
	let names = document.getElementsByClassName('sub');
	let damage = parseInt(document.getElementById('groupDam').value);
	if (isNaN(damage)) {
		damage = 0;
	}
	// if more than one
	let effect = document.getElementsByClassName('res-imm');
	for(i = 0; i < names.length; i++) {
		let name = names[i].firstChild.textContent;
		let isPlayer = (names[i].classList.contains('player')) ? true : false;
		//update element on page
		let units = document.getElementsByClassName('dam-select');
		let tempHealth = (isPlayer) ? 0 : false;
		//calculate damage
		let uDam = damage;
		if(effect) {
			if(effect[i].value == 'half') {
				uDam = uDam * 0.5;
			} else if(effect[i].value == 'none') {
				uDam = 0;
			}
		}
		//if player make LS change
		if(isPlayer) {
			let boi = termToArray(sessPl, "name", name);
			//if damage take away from temp hp first
			if(uDam < 0 && boi.hpT > 0) {
				//if enough temHp
				if(boi.hpT > Math.abs(uDam)) {
					boi.hpT = Math.abs(uDam + boi.hpT);
					uDam = 0;
				} else {
					uDam += boi.hpT;
					boi.hpT = 0;
				}
				tempHealth = boi.hpT;
			} else if(uDam > 0) {
				//make sure health does not pass maximum
				if(boi.hp + uDam > boi.hpM) {
					//heal now equals diff to max
					uDam = boi.hpM - boi.hp;
				}
			}
			boi.hp += uDam;
			//make sure if less than zero to make it zero
			if(boi.hp < 0) {
				boi.hp = 0;
			}
		}
		
		for(j = 0; j < units.length; j++) {
			//find right element
			if(units[j].firstChild.textContent == name) {
				//calculate health
				let health = units[j].lastChild.childNodes[1];
				let uHp = parseInt(health.textContent);
				uHp += uDam;
				//if temp health
				if(tempHealth >= 0 && isPlayer) {
					let tempHold = health.nextSibling;
					let eTemp = tempHold.childNodes[1];
					eTemp.textContent = tempHealth;
				}
				
				//if less than 0 turn into 0
				if(uHp < 0) {
					uHp = 0;
				}
				//replace health remove class and return
				health.textContent = uHp;
				units[j].classList.remove('dam-select');
				break;
			}
		}
	}
	closePop();
	playersToSession();
	checkTempHp();
}
function hpForm(arr) {
	let isGroup = (arr.length > 1) ? true : false;
	let classN = (isGroup) ? 'group': 'single';
	txt = '<form id="hpForm" class="' + classN + '">';
	if(!isGroup) {
		txt += '<h1 id="single" >Unit Damage</h1><select class="res-imm" style="display:none"><option value="full" selected>Full</option></select><label for="unitHp" class="sub';
		if(arr[0].classList.contains('pl')) {
			txt += ' player';
		} else {
			txt += ' monster';
		}
		txt += '">' + arr[0].firstChild.textContent + '</label><input id="groupDam" name="unitHp" type="number" value="0">';
	} else {
		txt += '<h1 id="group">Group Damage</h1><input type="number" id="groupDam" value="0"><div id="unit-hold">';
		arr.forEach(function(ele) {
			let name = ele.firstChild.textContent;
			let hpVal = ele.lastChild.lastChild.textContent;
			
			txt += '<span class="dam-hold"><label for="' + name + '-dam" class="sub';
			if(ele.classList.contains('pl')) {
				txt += ' player';
			} else {
				txt += ' monster';
			}
			txt += '">' + name + '</label><select class="res-imm"><option value="full" selected>Full</option><option value="half">Resist</option><option value="none">Immune</option></select></span>';
		});
	}
	txt += '</div><button type="submit" id="form-submit-hp">Finished</button></form>';
	pop.innerHTML = txt;
	openPop();
	//onsubmit
	document.getElementById('hpForm').onsubmit = changeHP;
	
	//clear array
	damage = [];
}
/////////////////////
//EVENT Function
/////////////////////
function storageChange(e) {
	//if player change
	if(e.key == 'sessPl') {
		nPl = JSON.parse(e.newValue);
		oPl = JSON.parse(e.oldValue)
		sessPl = nPl;
		for(i = 0; i < nPl.length; i++) {
			if(nPl[i].hp != oPl[i].hp || nPl[i].hpT != oPl[i].hpT) {
				let ele = document.getElementsByClassName('pl')[i];
				ele.lastChild.childNodes[1].textContent = nPl[i].hp;
				//if any temp health
				let par = ele.lastChild.lastChild;
				if(nPl[i].hpT > 0) {
					par.style.display = 'block';
					par.childNodes[1].textContent = nPl[i].hpT;
				} else {
					par.style.display = 'none';
					par.childNodes[1].textContent = 0;
				}
			}
			//if different ac
			if(nPl[i].ac != oPl[i].ac) {
				let acN = document.getElementById(nPl[i].id).firstChild.lastChild.lastChild;
				acN.textContent = nPl[i].ac;
			}
		}
	}
}
/////////////////
//EVENT LISTENERS
/////////////////
/* NOTE: one event listener was added before to keep track of turns... AT: fight.js 119, function to be run AT: fight.js 121 */
//click
document.addEventListener('click', function(e) {
	let select = e.target;
	let isShift = e.shiftKey;
	//if click on a unit
	if(e.target.closest('.unit')) {
		select = e.target.closest('.unit');
		let isSelected = (select.classList.contains('dam-select')) ? true : false;
		//if shift click add to array only
		if(!isSelected) {
			damage.push(select);
		}
		
		select.classList.add('dam-select');
		if(isShift && !isSelected) {
			return;
		//if shift click but is already selected
		} else if(isShift && isSelected) {
			//delete from array
			let index = damage.indexOf(select);
			damage.splice(index, 1);
			//remove selected class
			select.classList.remove('dam-select');
		} else {
			hpForm(damage);
		}
		console.log(damage);
	}
}, false);
/*local storage event listener was moved up to where we needed it and characters were written down on */