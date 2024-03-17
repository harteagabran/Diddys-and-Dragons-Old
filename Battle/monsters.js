////////////////////
//FUNCTIONS
////////////////////
//when done
function battle() {
	let sure = true;
	if (sure) {
		battleMon = [];
		let ele = document.getElementsByClassName('span-mon');
		for(i = 0; i < ele.length; i++) {
			let name = ele[i].firstChild.textContent;
			let num = ele[i].lastChild.value;
			let mon = termToArray(monsters5E, 'name', name);
			mon.unit = Number(num);
			battleMon.push(mon);
		}
		//ADD TO LOCAL STORAGE HERE
		localStorage.battle = JSON.stringify(battleMon);
		//open battle page
		window.open('../Fight/fight.html', 'fight', 'channelmode=yes,directories=no,fullscreen=yes,location=no,menubar=no,resizable=yes,scrollbars=no,status=no,titlebar=no,toolbar=no');
	}
}
function filter() {
	let filt1 = document.getElementById('filter1').value;
	let filt2 = document.getElementById('filter2').value;
	let filt3 = document.getElementById('filter3').value;
	let filt4 = document.getElementById('filter4').value;
	//get elements
	if(filt1 != 'all') {
		var val1 = filt1;
	}
	if(filt2 != 'all') {
		var val2 = filt2;
	}
	if(filt3 != 'all') {
		var val3 = filt3;
	}
	if(filt4 != 'all') {
		var val4 = filt4;
	}
	let mBox = document.getElementsByClassName('mon-hold');
	let mName = document.getElementsByClassName('mon-name');
	for(i = 0; i < mName.length; i++) {
		var mon = termToArray(monsters5E, 'name', mName[i].textContent);
		if(mBox[i].classList.contains('hide')) {
			mBox[i].classList.remove('hide');
		}
		//if filter 1 exists
		if(val1) {
			//if monster doesn't fit filter
			if(!mon.meta.includes(val1)) {
				mBox[i].classList.add('hide');
			}
		}
		if(val2) {
			if(!mon.meta.includes(val2)) {
				mBox[i].classList.add('hide');
			}
		}
		if(val3) {
			let crStr = mon.chall.split(" ");
			if(crStr[0] != val3) {
				mBox[i].classList.add('hide');
			}
		}
		if(val4) {
			if(!mon.loca.includes(val4)) {
				mBox[i].classList.add('hide');
			}
		}
	}
	//make search empty
	document.getElementById('bar'). value = '';
}
function search(bar) {
	//change everything to all names
	let input = bar.value.replace(/\s/g, '').toUpperCase();
	let mBox = document.getElementsByClassName('mon-hold');
	let mNames = document.getElementsByClassName('mon-name');
	for(i = 0; i < mNames.length; i++) {
		let fNames = mNames[i].textContent.replace(/\s/g, '').toUpperCase();
		mBox[i].classList.remove('hide');
		//if name is somewhere in website
		if(fNames.indexOf(input) == -1) {
			mBox[i].classList.add('hide');
		}
	}
	//set type to all
	document.getElementById('filter1').value = 'all';
	document.getElementById('filter2').value = 'all';
}
function calcDifficulty() {
	let picked = document.getElementsByClassName('picked');
	let numbers = document.getElementsByClassName('mon-pl-amnt');
	let mult = monMult(numbers, sessPl.length);
	let cExp = 0;
	for(i = 0; i < numbers.length; i++) {
		let name = numbers[i].parentElement.firstChild.textContent;
		for(j = 0; j < picked.length; j++) {
			//if name matches picked
			if(name == picked[j].firstChild.firstChild.textContent) {
				//multiply exp by number to add
				cExp += (parseInt(picked[j].firstChild.childNodes[1].textContent) * Number(numbers[i].value));
			}
		}
	}
	let adjExp = cExp * mult;
	footer.className = getDifficulty(sessPl, adjExp);
}
function monOffFooter(el) {
	let name = el.textContent;
	let opt = document.getElementsByClassName('picked');
	for(i = 0; i < opt.length; i++) {
		if (opt[i].firstChild.firstChild.textContent == name) {
			opt[i].classList.remove('picked');
			break
		}
	}
	el.parentElement.remove();
	if (footer.childElementCount === 1) {
		document.getElementById('submit-mon').remove();
	}
	mBodyMargin();
	calcDifficulty();
}
function selectMonster(el) {
	let mName = el.firstChild.textContent;
	let mParent = el.parentNode;
	
	mParent.classList.toggle('picked');
	if(mParent.classList.contains('picked')) {
		//add to footer
		let spMon = document.createElement('div');
		spMon.classList.add('span-mon');
		spMon.innerHTML = '<label class="mon-pl-name" onclick="monOffFooter(this)" for="mon-amnt">' + mName + '</label><input name="mon-amnt" class="mon-pl-amnt" onchange="calcDifficulty()" type="number" value="1" max="99" min="1"></input>';
		footer.prepend(spMon);
		if(!document.getElementById('submit-mon')) {
			footer.innerHTML += '<button id="submit-mon" onclick="battle()">Battle!</button>';
		}
	} else {
		//remove from footer
		let fMons = document.getElementsByClassName('span-mon');
		for(i = 0; i < fMons.length; i++) {
			let ins=fMons[i].firstChild.textContent;
			if(ins == mName) {
				fMons[i].remove();
			}
		}
		if(footer.childElementCount === 1) {
			document.getElementById('submit-mon').remove();
		}
	}
	mBodyMargin();
	calcDifficulty();
}
function drawMons() {
	txt = '';
	monsters5E.forEach(function(mon) {
		txt += '<div class="mon-hold"><a href="javascript:void(0)" onclick="selectMonster(this);return false"><h3 class="mon-name">' + mon.name + '</h3><p>' + showExp(mon) + ' XP</p></a></div>';
	});
	monA.innerHTML = txt;
	mBodyMargin();
}
//////////////////
//ON LOAD
//////////////////
var monA = document.getElementById('monsters');
var footer = document.querySelector('footer');
var battleMon = new Array();
window.name = 'enemy';
drawMons();
//////////////////
//RC MENU FUNC
//////////////////
function viewImg(opt) {
	opt = opt ?? {};
	let ele = document.getElementById('rcName').textContent;
	let mon = termToArray(monsters5E, "name", ele);
	let img = mon["img_url"];
	if(opt.show) {
		let msg = '<img class="display" src=' + img + ' alt="Picture Not Available, Either no Internet or img is missing, contact creator"/>';
		msgSend(msg, {trust: 'yes'});
	}
	txt = '<a href="javascript:void(0)" class="closebtn" onclick="closePop()';
	if(opt.show) {
		txt += ';localStorage.removeItem(\'msg\')';
	}
	txt += '">&times;</a><img class="display" src=' + img + ' alt="Picture Not Available, Either no Internet or img is missing, contact creator"/>';
	pop.innerHTML = txt;
	openPop();
}
//////////////////
//EVENT LISTENERS
//////////////////
//rc menu
document.addEventListener('contextmenu', function(e) {
	var name, ele, prevent = false;
	if(e.target.closest('.mon-hold')) {
		ele = e.target.closest('.mon-hold');
		name = ele.firstChild.firstChild.textContent;
		prevent = true;
	} else if (e.target.closest('.span-mon')){
		ele = e.target.closest('.span-mon');
		name = ele.firstChild.firstChild.textContent;
		prevent = true;
	}
	if(prevent) {
		e.preventDefault();
		//draw menu
		openRCMenu(name, e);
	}
}, false);