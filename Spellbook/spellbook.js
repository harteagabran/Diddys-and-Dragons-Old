//////////////
//FUNCTIONS
//////////////
function resetFilters(opt) {
	let filters = ['filter1', 'filter2', 'filter3'];
	let checks = ['filter4', 'filter5', 'filter6', 'filter7', 'filter8'];
	filters.forEach(id => {document.getElementById(id).value = 'all'});
	checks.forEach(id => {document.getElementById(id).checked = false});
	if (opt.all) {
		filter();
	}
}
function filter() {
	let filt1 = document.getElementById('filter1').value;
	let filt2 = document.getElementById('filter2').value;
	let filt3 = document.getElementById('filter3').value;
	//checkboxes
	let filt4 = document.getElementById('filter4');
	let filt5 = document.getElementById('filter5');
	let filt6 = document.getElementById('filter6');
	let filt7 = document.getElementById('filter7');
	let filt8 = document.getElementById('filter8');
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
	let sBox = document.getElementsByClassName('spell-btn');
	let sName = document.getElementsByClassName('names');
	for(i = 0; i < sName.length; i++) {
		let sp = termToArray(spells5E, 'name', sName[i].textContent);
		if(sBox[i].classList.contains('hide')) {
			sBox[i].classList.remove('hide');
		}
		//if filter 1 exists
		if(val1) {
			//if monster doesn't fit filter
			if(!sp.level.includes(val1)) {
				sBox[i].classList.add('hide');
			}
		}
		if(val2) {
			if(!sp.school.includes(val2)) {
				sBox[i].classList.add('hide');
			}
		}
		if(val3) {
			if(!sp["class"].includes(val3)) {
				sBox[i].classList.add('hide');
			}
		}
		if(filt4.checked) {
			if(!sp.components.includes(filt4.value)) {
				sBox[i].classList.add('hide');
			}
		}
		if(filt5.checked) {
			if(!sp.components.includes(filt5.value)) {
				sBox[i].classList.add('hide');
			}
		}
		if(filt6.checked) {
			if(!sp.components.includes(filt6.value)) {
				sBox[i].classList.add('hide');
			}
		}
		if(filt7.checked) {
			if(!sp.ritual.includes(filt7.value)) {
				sBox[i].classList.add('hide');
			}
		}
		if(filt8.checked) {
			if(!sp.concentration.includes(filt8.value)) {
				sBox[i].classList.add('hide');
			}
		}
	}
	//make search empty
	document.getElementById('bar'). value = '';
}
function search(bar) {
	let input = bar.value.replace(/\s/g, '').toUpperCase();
	let spells = document.getElementsByClassName('spell-btn');
	let sNames = document.getElementsByClassName('names');
	for(i = 0; i < sNames.length; i++) {
		let fNames = sNames[i].textContent.replace(/\s/g, '').toUpperCase();
		//if no instance hide
		if(fNames.indexOf(input) == -1) {
			spells[i].classList.add('hide');
		} else {
			spells[i].classList.remove('hide');
		}
	}
	resetFilters();
}
function showSpell(btn, opt) {
	opt = opt || {};
	let name;
	if(!opt.request) {
		name = btn.firstChild.textContent
	} else {
		name = document.getElementById('rcName').textContent;
	}
	let spell = termToArray(spells5E, 'name', name);
	txt = '';
	openPop();
	let closing = '<a href="javascript:void(0)" class="closebtn" onclick="closePop()';
	if (opt.request) {
		closing += ';localStorage.removeItem(\'msg\')';
	}
	closing += '">&times;</a>';
	txt += '<div class="spell-des"><h1 class="desName">' + name + '</h1><p>';
	if(spell.level == "Cantrip") {
		txt += spell.school + ' ' + spell.level
	} else {
		txt += spell.level + ' ' + spell.school
	}
	if(spell.ritual == "yes") {
		txt += ' (ritual)';
	}
	txt += '<br><b>Casting Time: </b>' + spell.casting_time + '<br><b>Range: </b>' + spell.range + '<br><b>Components: </b>' + spell.components;
	if(spell.material) {
		txt += ' (' + spell.material + ')';
	}
	txt += '<br><b>Duration: </b>';
	//if concentration
	if(spell.concentration == "yes") {
		txt += 'Concentration, ' + spell.duration + '<br>';
	} else {
		txt += spell.duration + '<br>';
	}
	txt += '<hr></p><div id="desDes">' + spell.desc;
	if(spell.higher_level) {
		txt += spell.higher_level + '</div>';
	} else {
		txt += '</div>';
	}
	txt += '<i class="source">' + spell.page + '</i></div>';
	pop.innerHTML = closing + txt;
	if (opt.request) {
		msgSend(txt, {trust: 'yes'});
	}
	
}
//DRAW SPELLS OPT HOMEBREW 
function drawSpells(opt) {
	opt = opt || {};
	txt = '';
	spells5E.forEach(function(spell) {
		txt += '<button class="spell-btn" onclick="showSpell(this)"><h2 class="names">' + spell.name + '</h2><i class="classes">' + spell.class + '</i></button>'
	});
	spellA.innerHTML = txt;
}
//////////////////
//ON LOAD
//////////////////
var spellA = document.getElementById('spells');
drawSpells();
//////////////////
//RC MENU FUNC
//////////////////
function prepMsg() {
	let name = document.getElementById('rcName').textContent;
	let msg = showSpell(name, {
		request: true
	});
	//SEND MSG ON LS TO USE ON PL SCREEN
	//HERE
}
//////////////////
//EVENT LISTENERS
//////////////////
//rc menu
document.addEventListener('contextmenu', function(e) {
	var name, ele, prevent = false;
	if(e.target.closest('.spell-btn')) {
		ele = e.target.closest('.spell-btn');
		name = ele.firstChild.textContent;
		prevent = true;
	}
	if(prevent) {
		e.preventDefault();
		//draw menu
		openRCMenu(name, e);
	}
}, false);