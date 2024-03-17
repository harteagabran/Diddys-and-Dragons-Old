//////////////
//FUNCTIONS
//////////////
function changeLoca(e) {
    e.preventDefault;
    let loca = document.getElementById('loca').value;
    let time = document.getElementById('time');
    //change locations for now and time later
    localStorage.loca = loca;
}
function changeSong() {
    pop.innerHTML = '<audio controls><source src="">Your browser does not support html audio</audio>';
    showPop();
}
function contentTog() {
	let nPage = document.getElementById('players-page') || document.getElementById('world-page');
    let mBody = document.getElementById('content');
    let place = localStorage.loca;
	if(nPage.id == 'players-page') {
		nPage.innerHTML = '&#128101; Players';
		nPage.id = 'world-page';
        mBody.innerHTML = '<form id="world-form" onsubmit="changeLoca(event); return false"><label for="location" id="lab-loca">Location: </label><br><input id="loca" type="text" name="location" value="' + place + '"/><br><label for="time" id="lab-time">Time: </label><br><select id="time" name="time"><option value="day">Day</option><option value="night">Night</option><option value="unknown">Unknown</option></select><br><button id="song-but" type="button" onclick="changeSong()">Change Song</button><br><button id="locaSubmit" type="submit">Save</button></form>';
	} else {
		nPage.innerHTML = '&#127758; World/Location';
		nPage.id = 'players-page';
        location.reload();
	}
}
//MESSAGES
function finishMsg() {
	localStorage.removeItem('msg');
}
function writeMsg(mEle) {
	let msg = mEle.value;
	msgSend(msg);
}
function prepMsg() {
	pop.innerHTML = '<form onsubmit="finishMsg(); closePop()"><textarea id="msg-form" onkeyup="writeMsg(this)"></textarea><br><button id="msg-end" type="submit">Finish</button></form>';
	openPop();
	document.getElementById('msg-form').focus();
}
function updateStat(ele) {
	let term = ele.id;
	let update = Number(ele.value);
	let boi = termToArray(sessPl, 'id', parseInt(document.getElementById('sRef').textContent));
	boi[term] = update;
	playersToSession();
}
function armorChange() {
	let armorSel = document.getElementById('armor').value;
	let armorBon = document.getElementById('acB').value;
	let armorShield = document.getElementById('shield').value;
	let ac = document.getElementById('ac');
	let boi = termToArray(sessPl, 'id', parseInt(document.getElementById('sRef').textContent));
	let acNum = calcAC(armorSel, armorShield, boi, armorBon);
	ac.textContent = acNum;
	
	//update player on change
	boi.armor = armorSel;
	boi.shield = armorShield;
	boi.acB = Number(armorBon);
	boi.ac = acNum;
	
	playersToSession();
}
function levelUp() {
	for(i = 0; i < sessPl.length; i++) {
		sessPl[i].lv += 1;
		if(sessPl[i].lv > 20) {
			sessPl[i].lv = 20;
		}
		sessPl[i].exp = calcLvExp('level', sessPl[i].lv, {return: true});
	}
	playersToSession();
	drawPlayers();
}
function finishShowInv() {
	localStorage.removeItem('showInv');
}
function showInv() {
	let units = pSelect.value;
	localStorage.showInv = units;
	pop.innerHTML = '<a id="popClose" href="javascript:void(0)" class="closebtn" onclick="closePop(); finishShowInv()">&times;</a>';
	openPop();
}
function addNItemForm() {
	let itDiv = document.createElement('DIV');
	itDiv.className = 'fItem';
	itDiv.innerHTML = '<input type="text" list="item-sugg" class="fItemN" onchange="checkAutoItem(this)" placeholder="item" autocomplete="off" required></input><input type="number" class="fItemA" value="1" min="0" step="1" onchange="removeItem(\'item\', this)"></input><input type="number" class="fItemW" value="0" min="0" step="0.1"></input>';
	document.getElementById('fItem-hold').appendChild(itDiv);
}
function nItemForm() {
	//write form
	document.getElementById('item-form').innerHTML = '<a id="itemClose" href="javascript:void(0)" class="closebtn" onclick="this.parentElement.style.display = \'none\'">&times;</a> 		<form onsubmit="addItemsInv(event); return false"><fieldset id="item-fs"><legend id="item-legend">New Items</legend><datalist id="item-sugg"></datalist><div id="fItem-hold"><div class="fItem"><input type="text" list="item-sugg" class="fItemN" onchange="checkAutoItem(this)" placeholder="item" autocomplete="off" required></input><input type="number" class="fItemA" value="1" min="0" step="1" onchange="removeItem(\'item\', this)"></input><input type="number" class="fItemW" value="0" min="0" step="0.1"></input></div></div></fieldset><button type="button" onclick="addNItemForm()">Add Another</button><button type="submit">All Done</button></form>';
	//add item options to item choose
	txt = '';
	let itemSugg = document.getElementById('item-sugg');
	for (i = 0; i < Items5E.length; i++) {
		txt += '<option value="' + Items5E[i].name + '">' + Items5E[i].name + '</option>';
	}
	itemSugg.innerHTML = txt;
	
	document.getElementById('item-form').style.display = 'block';
}
function addItemsInv(e) {
	e.preventDefault;
	let items = document.getElementsByClassName('fItemN');
	let quants = document.getElementsByClassName('fItemA');
	let weights = document.getElementsByClassName('fItemW');
	//loop and add to inv
	let boi = termToArray(sessPl, 'player', pSelect.value);
	let all = boi.inv;
	for(i = 0; i < items.length; i++) {
		all = addItemInv(items[i].value, quants[i].value, weights[i].value, all);
	}
	boi.inv = all;
	console.log(boi.inv);
	playersToSession();
	editInv();
	document.getElementById('item-form').style.display = 'none';
}
function changeItemAmnt(inp) {
	let boi = termToArray(sessPl, 'player', pSelect.value);
	let itemN = inp.parentElement.previousElementSibling.textContent;
	let itemW = parseFloat(inp.parentElement.nextElementSibling.textContent);
	let nAmnt = parseInt(inp.value);
	let indW = parseInt(inp.getAttribute('data-iWei'));
	let nWeight = nAmnt * indW;
	let item = termToArray(boi.inv, 'name', itemN);
	
	//change item attributes
	item.quant = nAmnt;
	item.weight = nWeight;
	playersToSession();
	
	//update on website
	let wTd = inp.parentElement.nextElementSibling;
	if(nWeight == 0) {
		wTd.textContent = '-';
	} else {
		wTd.textContent = nWeight + ' lbs.'
	}
	
}
function editInv() {
	let tWeight = 0;
	let boi = termToArray(sessPl, 'player', pSelect.value);
	txt = '<a id="popClose" href="javascript:void(0)" class="closebtn" onclick="closePop()">&times;</a><h1 id="inv-name">' + boi.name + '\'s Inventory</h1><button type="button" id="n-item-btn" onclick="nItemForm()">New Item</button><div id="inv-box"><table id="item-table"><thead><tr><th>Item</th><th>Amount</th><th>Weight</th></tr></thead><tbody>';
	for(i = 0; i < boi.inv.length; i++) {
		tWeight += boi.inv[i].weight;
		txt += '<tr class="item"><td class="item-name">' + boi.inv[i].name + '</td><td class="item-amnt"><input type="number" min="1" onchange="changeItemAmnt(this)" value="' + boi.inv[i].quant +
		'" data-iWei="' + (boi.inv[i].weight / boi.inv[i].quant) + '"/></td><td class="item-weight">';
		if(boi.inv[i].weight == 0) {
			txt += '-'
		} else {
			txt += boi.inv[i].weight + ' lbs.';
		}
		txt += '</td></tr>';
	}
	txt += '</tbody></table></div><h1 id="inv-total">' + tWeight + ' lbs.</h1>';
	
	pop.innerHTML = txt;
	openPop();
}
function drawPlayers() {
	if (pSelect.value == 'all') {
		txt = '<div id="session">';
		sessPl.forEach(function(boi) {
			txt += '<div class="chara"><img class="pic" src="' + boi.avatar.source + '"/><h3 class="chara-name">' + boi.name + '</h3><h3 class="chara-lv">' + boi.lv + '</h3><h3 class="health">&#x2764; <b class="chara-hp">' + boi.hp + '</b> / <b class="chara-hpM">' + boi.hpM + '</b></h3></div>';
		});
		txt += '</div><button type="button" class="all-opt" onclick="longRest();location.reload()">Long Rest</button><button type="button" class="all-opt" onclick="prepMsg()">Message</button><button type="button" class="all-opt" onclick="showInv()">Show Inventory</button><button type="button" class="all-opt" onclick="levelUp()">Level Up</button>';
		playSec.innerHTML = txt;
	} else {
		let sPl = termToArray(sessPl, 'player', pSelect.value);
	playSec.innerHTML = '<div id="pl-sec"><div id="pl-main-stats"><h1 id="name">' + sPl.name + '</h1><img id="source" src="' + sPl.avatar.source + '" /><h3 class="health sHealth"><b id="hp">' + sPl.hp + '</b><span id="sTemp"> (<b id="hpT">' + sPl.hpT + '</b>)</span> / <b id="hpM">' + sPl.hpM + '</b></h3><h3 id="sSp"><b id="speed">' + sPl.speed + '</b> ft.</h3><h3 id="sLevel">Lv. <b id="lv">' + sPl.lv + '</b></h3><h3 id="sExp"><b id="exp">' + sPl.exp + '</b> EXP</h3><h3 id="stat">' + sPl.stat + '</h3><h2 id="sId">ID: <b id="sRef">' + sPl.id + '</b></h2></div><table id="sArmor-set"><thead><tr><th>Armor</th><th>Shield</th><th>Bonus</th><th>AC</th></tr></thead><tbody><tr><td id="sArmor" style="width: 40%"><select id="armor" onchange="armorChange()">' + sPl.armor + '</select></td><td id="sShield" style="width: 20%"><select id="shield" onchange="armorChange()"><option value="yes">Yes</option><option value="no">No</option><td id="sArmorBonus" style="width: 20%"><input  id="acB" type="number" value="' + sPl.acB + '" min="0" onchange="armorChange()"></td><td id="ac" style="width: 20%">' + sPl.ac + '</td></tr></tbody></table><table id="sAbilities"><thead><tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr></thead><tbody><tr><td id="sStr"><input id="str" type="number" value="' + sPl.str + '" min="0" max="30" onchange="updateStat(this)"></td><td id="sDex"><input id="dex" type="number" value="' + sPl.dex + '" min="0" max="30" onchange="updateStat(this)"></td><td id="sCon"><input id="con" type="number" value="' + sPl.con + '" min="0" max="30" onchange="updateStat(this)"></td><td id="sInt"><input id="int" type="number" value="' + sPl.int + '" min="0" max="30" onchange="updateStat(this)"></td><td id="sWis"><input id="wis" type="number" value="' + sPl.wis + '" min="0" max="30" onchange="updateStat(this)"></td><td id="sCha"><input id="cha" type="number" value="' + sPl.cha + '" min="0" max="30" onchange="updateStat(this)"></td></tr></tbody></table><table id="sCurrency"><thead><tr><th>CP</th><th>SP</th><th>EP</th><th>GP</th><th>PP</th></tr></thead><tbody><tr><td id="sCp"><input id="cp" type="number" min="0" value="' + sPl.cp + '" onchange="updateStat(this)"></td><td id="sSp"><input id="sp" type="number" min="0" value="' + sPl.sp + '" onchange="updateStat(this)"></td><td id="sEp"><input id="ep" type="number" min="0" value="' + sPl.ep + '" onchange="updateStat(this)"></td><td id="sGp"><input id="gp" type="number" min="0" value="' + sPl.gp + '" onchange="updateStat(this)"></td><td id="sPp"><input id="pp" type="number" min="0" value="' + sPl.pp + '" onchange="updateStat(this)"></td></tr></tbody></table><div id="sUti"><button type="button" id="sGen" class="uti-btn">General</button><button type="button" id="sInv"  class="uti-btn" onclick="editInv()">Inventory</button><button type="button" id="sRes" class="uti-btn">Reserve</button><button type="button" id="sWRes" class="uti-btn">Weapon Reserve</button></div></div>';
		//armor option to select
		let armSel = document.getElementById('armor');
		txt = '';
		for (i = 0; i < armor5E.length; i++) {
			txt += '<option value="' + armor5E[i].name + '"';
			if(sPl.armor == armor5E[i].name) {
				txt += ' selected';
			}
			txt += '>' + armor5E[i].name + '</option>';
		}
		armSel.innerHTML = txt;
		//select if player has shield
		document.getElementById('shield').value = sPl.shield;
		
		playSec.classList.add('single');
	}
}
//////////////////
//ON LOAD
//////////////////
var playSec = document.getElementById('player-section');
var worldSec = document.getElementById('world-section');
var pSelect = document.getElementById('player-select');
var itemSel = new Array();
sessPl.forEach(function(boi) {
	let optT = document.createElement('option');
	optT.value = boi.player;
	optT.textContent = boi.player;
	pSelect.append(optT);
});
drawPlayers();
//////////////////
//RC MENU FUNC
//////////////////
function changeStat(form) {
	let id = form.id;
	id = parseInt(id);
	let chara = termToArray(sessPl, 'id', id);
	let term = document.getElementById('chTrm').textContent;
	let change = document.getElementById('chSt').value;
	if(term == 'hp' && Number(change) > chara.hpM) {
		change = chara.hpM;
	} else if (term == 'lv') {
		if(change > 20) {
			change = 20;
		}
		//get exp for level
		let expN = calcLvExp('level', Number(change), {return: true});
		document.getElementById('exp').textContent = expN;
		chara.exp = expN;
	} else if (term == 'exp') {
		if(change > 355000) {
			change = 355000;
		}
		//get level for exp
		let lvN = calcLvExp('exp', Number(change), {return: true});
		document.getElementById('lv').textContent = lvN;
		chara.lv = lvN;
	}
	document.getElementById(term).textContent = change;
	//check if change is number
	let isNum = /^\d+$/.test(change);
	if(isNum) {
		chara[term] = parseInt(change);
	} else {
		chara[term] = change;
	}
	
	playersToSession();
	closePop();
}
function changeCharStat(ele, id) {
	let isNum = /^\d+$/.test(ele.textContent);
	console.log(isNum);
	txt = '<form id="' + id + '" onsubmit="changeStat(this); return false" onreset="closePop()"><label id="chTrm" for="sChange">' + ele.id + '</label>';
	if(isNum) {
		txt += '<input name="sChange" id="chSt" type="number" min="0" value="' + Number(ele.textContent) + '"'
		if(ele.id == 'speed') {
			txt += ' step="5"';
		}
		txt +='>';
	} else {
		txt += '<input name="sChange" id="chSt" type="text" value="' + ele.textContent + '">'
	}
	txt += '<button type="submit">All Done</button><button type="reset">Cancel</button></form>';
	pop.innerHTML = txt;
	openPop();
}
//////////////////
//EVENT LISTENERS
//////////////////
document.addEventListener('click', function(e) {
	if(e.target.closest('#pl-sec')) {
		let cEle = e.target;
		if(cEle.closest('#sId') || cEle.id == 'source' || cEle.tagName == 'TH' || cEle.classList.contains('sHealth') || cEle.closest('table') || cEle.id == 'pl-sec' || cEle.closest('.uti-btn')) {
			return;
		} else if (cEle.id == 'sExp' || cEle.id == 'sSp') {
			cEle = cEle.firstChild;
		} else if (cEle.id == 'sLevel') {
			cEle = cEle.lastChild;
		} else if (cEle.id == 'sTemp') {
			cEle = cEle.childNodes[1];
		}
		const charaId = document.getElementById('sRef').textContent;
		changeCharStat(cEle, charaId);
	} else if(e.target.closest('#item-table')) {
		let select = e.target;
		let isShift = e.shiftKey;
		//if click on a unit
		if(e.target.closest('.item-name')) {
			select = e.target.closest('.item-name');
			let isSelected = (select.classList.contains('item-select')) ? true : false;
			//if shift click add to array only
			if(!isSelected) {
				itemSel.push(select);
			}
			
			select.classList.add('item-select');
			if(isShift && !isSelected) {
				return;
			//if shift click but is already selected
			} else if(isShift && isSelected) {
				//delete from array
				let index = itemSel.indexOf(select);
				itemSel.splice(index, 1);
				//remove selected class
				select.classList.remove('item-select');
			} else {
				removeItemsInv(itemSel, pSelect.value);
				editInv();
			}
		}
	}
}, false);
window.addEventListener('storage', function(e) {
	//if player change
	if(e.key == 'sessPl') {
		sessPl = JSON.parse(e.newValue);
		drawPlayers();
	}
}, false);