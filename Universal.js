///////////////////////////////////
//LOCAL STORAGE STARTUP CHECK
//////////////////////////////////
if (!localStorage.getItem('players')) {
	localStorage.players = JSON.stringify(new Array());
	console.log('did not detect lcStor players so added it in');
}
if (!localStorage.getItem('sessPl')) {
	localStorage.sessPl = JSON.stringify(new Array());
	console.log('did not detect lcStor sessPl so added it in');
}
if (!localStorage.getItem('loca')) {
    localStorage.loca = {name: 'Somewhere, Elsewhere', time: 'day', biome: 'town'};
}
if (!localStorage.getItem('song')) {
    localStorage.song = {song: 'Gerudo Valley', album: 'The Legend of Zelda: Ocarina of Time', artist: 'Koji Kondo'};
}
///////////////////////////////////
//UNIVERSAL VARIABLES
///////////////////////////////////
var i, j, txt;
var players = JSON.parse(localStorage.players);
var sessPl = JSON.parse(localStorage.sessPl);
var pop = document.getElementById('pop');
var rcMenu = document.getElementById('ctx-menu');
var mainBod = document.getElementById('main-body');
var charExp = [0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
var lvUpExp = [0, 300, 600, 1800, 3800, 7500, 9000, 11000, 14000, 16000, 21000, 15000, 20000, 20000, 25000, 30000, 30000, 40000, 40000, 50000];

///////////////////////////////////
//WEBSITE FUNCTIONS
///////////////////////////////////
function openNav() {
	document.getElementById('sideNav').style.width = "100vw";
	document.body.classList.add('no-scroll');
}
function closeNav() {
	document.getElementById('sideNav').style.width = "0";
	document.body.classList.remove('no-scroll');
}
function openPop() {
	pop.style.display = 'block';
	document.body.classList.add('no-scroll');
}
function closePop() {
	pop.style.display = 'none';
	document.body.classList.remove('no-scroll');
}
function openRCMenu(name, e) {
	rcMenu.querySelector('#rcName').textContent = name;
	rcMenu.style.display = "block";
	if(e.clientX > (window.innerWidth * 0.75)) {
		let x = e.clientX - rcMenu.offsetWidth;
		console.log(e.clientX + ' ' + x);
		rcMenu.style.left = (Number(e.clientX) - Number(rcMenu.offsetWidth)) + 'px';
	} else {
		rcMenu.style.left = e.clientX + 'px';
	}
	if(e.clientY > (window.innerHeight * 0.75)) {
		rcMenu.style.top = (Number(e.clientY) - Number(rcMenu.offsetHeight)) + 'px';
	} else {
		rcMenu.style.top = e.clientY + 'px';
	}
	document.addEventListener('click', rcClickCheck,false);
}
function rcClickCheck(e) {
	let isMenu = rcMenu.contains(e.target);
		//if user clicked outside menu
		if (!isMenu) {
			closeRCMenu();
		}
}
function closeRCMenu() {
	rcMenu.style.display = "none";
	document.removeEventListener('click', rcClickCheck, false);
}
function mBodyMargin() {
	let ftH = document.querySelector('footer').offsetHeight;
	let mBody = document.getElementById('main-body');
	
	mBody.style.paddingBottom = ftH + 'px';
}
///////////////////////////////////
//TECHNICAL FUNCTIONS
///////////////////////////////////
function termToArray(array, term, name) {
	for (let list = 0; list < array.length; list++) {
		if (array[list][term] === name) {
			return array[list];
		}
	}
}
function rollDice(amnt, type, opt) {
	opt = opt || {};
	let total = 0;
	var roll, dice = new Array(), result = new Object();
	if(type == 20 && amnt == 1 && (opt.pen == 'dis' || opt.pen == 'adv')) {
		let roll1 = Math.floor(Math.random()*20 +1);
		dice.push(roll1);
		let roll2 = Math.floor(Math.random()*20 +1);
		dice.push(roll2);
		let higher = (opt.pen == 'adv');
		if(higher) {
			total = (roll1 > roll2) ? roll1 : roll2;
		} else {
			total = (roll1 < roll2) ? roll1 : roll2;
		}
		
		if (total == 20 || total == 1) {
			result.nat = "nat";
		} else if(opt.abi) {
			total += opt.abi;
		}
	} else {
		for(var die = 0; die < amnt; die++) {
			roll = Math.floor(Math.random()*type +1);
			dice.push(roll);
			total += roll;
		}
		//if rolled a natural 1d20
		if(amnt == 1 && type == 20 && (total == 20 || total == 1)) {
			result.nat = "nat";
		}else if(opt.abi) {
			total += opt.abi;
		}
	}
	result.roll = dice;
	result.total = total;
	if(opt.mod) {
		result.total += opt.mod;
	}
	if(opt.total) {
		return result.total;
	} else {
		return result;
	}
}
function playersToStorage() {
	localStorage.players = JSON.stringify(players);
}
function playersToSession() {
	localStorage.sessPl = JSON.stringify(sessPl);
}
function abiToMod(abi) {
	let mod = Math.floor((abi - 10)/2);
	return mod;
}
function rollHP(unit) {
	if(unit.hp) {
		//get individual parts
		let unitHPS = unit.hp;
		let unitSplit = unitHPS.split("(");
		let diceNumbers = unitSplit[unitSplit.length -1].match(/\d+/g);
		let dieAmnt = Number(diceNumbers[0]);
		let dieFace = Number(diceNumbers[1]);
		let modifier = 0;
		//if adding or subtracting
		if(diceNumbers.length > 2) {
			if(unitSplit[unitSplit.length - 1].includes("-")) {
				modifier = Number(diceNumbers[2]) * -1;
			} else {
				modifier = Number(diceNumbers[2]);
			}
		}
		//return Rolled HP Value
		let roll = rollDice(dieAmnt, dieFace, {mod: modifier, total: true});
		return roll;
	} else {
		return null;
	}
	
	
}
function removeItem(type, ele) {
	if (type === "weapon") {
		if (ele.value === "none") {
			ele.remove();
		}
	} else if (type === "item") {
		if (ele.value === '0') {
			ele.parentElement.remove();
		} else {
			checkAutoItem(ele.previousElementSibling);
		}
	}
}
//autocomplete items
function checkAutoItem(ele) {
	let equip = ele.value;
	let times = ele.nextElementSibling;
	let weight = ele.nextElementSibling.nextElementSibling;
	//check if item exist in database
	if(termToArray(Items5E, 'name', equip)) {
		let item = termToArray(Items5E, 'name', equip);
		let iweight = 0;
		//figure out the weight
		if(item.amnt) {
			iweight = parseFloat(item.weight)/parseInt(item.amnt);
		} else {
			iweight = parseFloat(item.weight);
		}
		//multiply the weight and show it on weight section and add class to show done
		weight.value = parseInt(times.value) * iweight;
		ele.className = 'fItemN';
		if(item.type == 'Pack') {
			ele.classList.add('item-pack');
		} else {
			ele.classList.add('item-done');
		}
		
	}
	//check if item exists else give it id
	
}
function addItemInv(name, quant, weight, all) {
	//check if name is some kind of pack
	let ref = (termToArray(Items5E, 'name', name)) ? termToArray(Items5E, 'name', name) : 'custom';
	console.log(ref);
	if(ref.type == 'Pack') {
		//put each item into the pack
		let items = ref.pack;
		items.forEach(function(obj) {
			let iObj = new Object();
			let item = obj.item;
			let times = obj.iAmnt;
			let iData = termToArray(Items5E, 'name', item);
			let dataW = parseFloat(iData.weight);
			
			if(iData.amnt) {
				dataW /= parseInt(iData.amnt);
			}
			
			iObj.name = item;
			iObj.quant = parseInt(quant) * times;
			iObj.weight = dataW * iObj.quant;
			
			//check if item already exists in inventory
			let isHere = all.some(it => it.name == iObj.name);
			if (!isHere) {
				all.push(iObj);
			} else {
				all = replaceInvItem(iObj, all);
			}
		});
	//if single item
	} else {
		let iObj = new Object();
		iObj.name = name;
		iObj.quant = parseInt(quant);
		iObj.weight = parseFloat(weight);
		
		//check if item exists in inventory
		let isHere = all.some(it => it.name == iObj.name);
		if (!isHere) {
			all.push(iObj);
		} else {
			all = replaceInvItem(iObj, all);
		}
	}
	return all;
}
function replaceInvItem(obj2, objArr) {
	var obj1, index;
	//find object and index;
	for(var findI = 0; findI < objArr.length; findI++) {
		if(objArr[findI].name == obj2.name) {
			obj1 = objArr[findI];
			index = findI;
			break
		}
	}
	//combine the objects
	const nObj = new Object();
	nObj.name = obj1.name;
	nObj.quant = obj1.quant + obj2.quant;
	nObj.weight = obj1.weight + obj2.weight;
	
	objArr[index] = nObj;
	
	return objArr;
}
function removeItemsInv(items, boiName) {
	let boi = termToArray(sessPl, 'player', boiName);
	let inv = boi.inv;
	let index = -1;
	//find the index and delete object
	for(let elem = 0; elem < items.length; elem++) {
		for(let find = 0; find < inv.length; find++) {
			if(inv[find].name == items[elem].textContent) {
				index = find;
				break;
			}
		}
		if(index > -1) {
			inv.splice(index, 1);
		}
	}
	//save 
	playersToSession();
}
function calcLvExp(type, numb, opt) {
	opt = opt ?? {};
	if (type === 'level') {
		let exp = charExp[numb];
		
		if(opt.return) {
			return exp;
		} else {
			//make exp value on form
			document.getElementById('fExp').value = exp;
		}
	} else {
		let lv = 0;
		
		for (i = 0; i < charExp.length; i++) {
			if (numb >= charExp[i] && numb < charExp[i + 1]) {
				lv = i;
				break
			}
		}
		if (numb >= 355000 ) {
			numb = 355000;
			if(opt.return != true) {
				document.getElementById('fExp').value = 355000;
			}
			lv = 20;
		}
		if(opt.return) {
			return lv;
		} else {
			document.getElementById('fLv').value = lv;
		}
	}
}
function calcAC(arm, shield, chara, bonus) {
	bonus = bonus || 0;
	let armor = termToArray(armor5E, 'name', arm);
	let ac = 0;
	let baseAc = armor.ac.match(/\d+/g);
	ac += Number(baseAc[0]);
	if (armor.ac.includes('Dex modifier')) {
		let dexMod = abiToMod(chara.dex);
		if (baseAc.length == 2 && dexMod > baseAc[1]){
			dexMod = Number(baseAc[1]);
		}
		ac += Number(dexMod);
	}
	if (armor.ac.includes('Con modifier')) {
		let conMod = abiToMod(chara.con);
		ac += Number(conMod);
	}
	if (armor.ac.includes('Wis modifier')) {
		let wisMod = abiToMod(chara.wis);
		ac += Number(wisMod);
	}
	if (shield == "yes") {
		ac += 2;
	}
	ac += Number(bonus);
	return ac;
}
function showExp(monster) {
	let exp = monster.chall;
	let pare = exp.split("(");
	let comma = pare[pare.length - 1].match(/\d+/g);
	if (comma.length > 1) {
		var num = comma[0] + comma[1];
	} else {
		var num = comma;
	}
	return num;
}
////////////////
//PLAYERS
////////////////
function longRest(players) {
	players = players ?? 'all';
	if (players == 'all') {
		sessPl.forEach(function(boi) {
			boi.hp = boi.hpM;
			boi.hpT = 0;
		});
	}
	playersToSession();
}
function msgSend(msg, user) {
	user = user || 'user';
	let messToSend = new Object();
	messToSend.message = msg;
	if(user == 'user') {
		messToSend.trust = 'no';
	} else {
		messToSend.trust = 'yes';
	}
	localStorage.msg = JSON.stringify(messToSend);
}