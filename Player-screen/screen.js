function savePlayers() {
	sessPl.forEach(function (boi) {
		//replace index in players
		let oldChar = termToArray(players, 'id', boi.id);
		let index = players.indexOf(oldChar);
		if(index !== -1) {
			players[index] = boi;
		}
		playersToStorage();
	});
}
function setProgress(bar, percent) {
	let circumference = (bar.r.baseVal.value) * 2 * Math.PI;
	const offset = circumference - ((percent / 100) * circumference);
	bar.style.strokeDashoffset = offset;
	if (bar.classList.contains('health-circle') && percent <= 20) {
		bar.style.stroke = 'url(#danger)';
	} else if (bar.classList.contains('health-circle') && percent <= 40 && percent > 20) {
		bar.style.stroke = 'url(#troub)';
	} else if (bar.classList.contains('health-circle') && percent > 40) {
		bar.style.stroke = 'url(#full)';
	}
}
function updateAll() {
	for(i = 0; i < sessPl.length; i++) {
		let div = document.getElementById(sessPl[i].id);
		let hpBar = div.childNodes[2].childNodes[2];
		let exBar = div.childNodes[2].lastChild;
		let expE = lvUpExp[sessPl[i].lv];
		let expS = charExp[sessPl[i].lv];
		let hpN = (sessPl[i].hp / sessPl[i].hpM) * 100;
		let exN = (sessPl[i].exp - expS) / expE * 100;
		setProgress(hpBar, hpN);
		setProgress(exBar, exN);
	}
}
function drawsessPl() {
	let hpCir = 396 * Math.PI;
	let exCir = 300 * Math.PI;
	let less8 = (sessPl.length < 8) ? true : false;
	//draw sessPl units on page
	sessPl.forEach(function(boi) {
		let plD = document.createElement('div');
		plD.id = boi.id;
		plD.classList.add('player-view');
		txt = '';
		txt += '<h1 class="name">' + boi.name + '</h1><div class="stat"><span class="hp">';
		if(less8) {
			txt += '&#x2764; ';
		}
		txt += '<b class="hpN">' + boi.hp + '</b><b class="temp" style="display: none">(<strong class="hpT" >' + boi.hpT + '</strong>)</b></span><span class="ac">';
		if(less8) {
			txt += '&#9820; ';
		}
		txt += '<b class="acN">' + boi.ac + '</b></span><span class="lv"><b class="lvN">' + boi.lv + '</b></span></div><svg height="23vh" width="100%" viewbox="0 0 500 500"><defs> 			<pattern id="' + boi.avatar.id + '" height="100%" width="100%" patternContentUnits="objectBoundingBox"><image height="1" width="1" preserveAspectRatio="none" xlink:href="' + boi.avatar.source + '"></image></pattern><radialGradient id="full" cx="50%" cy="50%" r="75%" fx="50%" fy="50%"><stop offset="63%" style="stop-color:#88C840; stop-opacity: 1"/><stop offset="77%" style="stop-color:#48E828; stop-opacity: 1"/></radialGradient><radialGradient id="troub" cx="50%" cy="50%" r="75%" fx="50%" fy="50%"><stop offset="63%" style="stop-color:#F0E088; stop-opacity: 1"/><stop offset="75%" style="stop-color:#F0D840; stop-opacity: 1"/></radialGradient><radialGradient id="danger" cx="50%" cy="50%" r="75%" fx="50%" fy="50%"><stop offset="63%" style="stop-color:#C62121; stop-opacity: 1"/><stop offset="77%" style="stop-color:#8D0101; stop-opacity: 1"/></radialGradient> 		</defs><circle class="holder" stroke="white" stroke-width="10" fill="#3A3B3C" r="239" cx="250" cy="250"/><circle class="health-circle" stroke="url(#full)" stroke-width="73" fill="transparent" r="198" cx="250" cy="250" style="stroke-dasharray:' + hpCir + ' ' + hpCir + '"/><line stroke="white" stroke-width="7" x1="250" y1="90" x2="250" y2="10"/><circle class="profile" stroke="white" stroke-width="5" fill="url(#' + boi.avatar.id + ')" r="160" cx="250" cy="250"/><circle class="exp-circle" stroke="#FF811F" stroke-width="15" fill="transparent" r="150" cx="250" cy="250" style="stroke-dasharray:' + exCir + ' ' + exCir + '"/></svg><h2 class="exp">' + boi.exp + ' EXP</h2><h2 class="player">' + boi.player + '</h2></div><div class="changes"></div>';
		
		plD.innerHTML = txt;
		//if for some reason temp health
		if(boi.hpT > 0) {
			plD.childNodes[1].firstChild.lastChild.style.display = 'block';
		}
		plA.append(plD);
	});
	updateAll();
}
function updateLoca() {
    let locaLoc = document.getElementById('loca');
    let locaDet = localStorage.getItem('loca');
    locaLoc.textContent = locaDet;
}
function updateSong() {
    let songs = document.getElementsByClassName('song-name');
    let albums = document.getElementsByClassName('song-album');
    let artists = document.getElementsByClassName('song-artist');
    let musicDet = localStorage.getItem('song');
    for(var swag = 0; swag < songs.length; swag++) {
        songs[swag].textContent = musicDet.song;
        albums[swag].textContent = musicDet.album;
        artists[swag].textContent = musicDet.artist;
    }
}
/////////////////////////
//ON START UP
/////////////////////////
var plA = document.getElementById('pl-area');
drawsessPl();
updateLoca();
updateSong();
document.getElementById('loca').textContent = localStorage.loca;
if(localStorage.showInv) {
	showInv(localStorage.showInv);
}
/////////////////////////
//EVENT FUNCTIONS
/////////////////////////
//show inventory
function showInv(bois) {
	txt =  '<div id="inv-hold">';
	let tWeight = 0;
	if(bois == 'all') {
		sessPl.forEach(function(boi) {
			tWeight = 0;
			txt += '<div class="inv-box"><h1 class="inv-name">' + boi.name + '</h1><div class="inv-items">';
			for(i = 0; i < boi.inv.length; i++) {
				txt += '<p class="item"><b class="item-name">' + boi.inv[i].name + '</b> <b class="item-amnt">x<span class="item-quant">' + boi.inv[i].quant + '</span></b></p>';
				tWeight += boi.inv[i].weight;
			}
			txt += '</div><h1 class="inv-weight">' + tWeight + ' lbs.</div>';
		});
		txt += '</div>';
		pop.innerHTML = txt;
		pop.className = 'inv-pop';
		openPop();
		
		let invB = document.getElementsByClassName('inv-items');
		
		//scroll elements
		for (var scr = 0; scr < invB.length; scr++) {
			setTimeout(scrollDTo, 3000, invB[scr]);
		}
	}
}
function scrollDTo(ele) {
	var scroll = 1;
	var lap = 0;
	var max = ele.scrollHeight - ele.offsetHeight;
	var scD = setInterval(function() {
		ele.scrollTo({ top: scroll, behavior: 'smooth' })
		if (lap % 2 == 0) {
			scroll += 1;
		} else {
			scroll -= 1;
		}
		if (scroll >= max || scroll == 0) {
			lap += 1;
		}
	}, 50);
}
/////////////////////////
//EVENT LISTENERS
/////////////////////////
window.addEventListener('storage', function(e) {
	//if from new player reload page and dont do anything
	if(e.url == "file:///C:/Users/kumar/Desktop/D&D%20App%202.0/Player-select/players.html") {
		window.location.reload();
	}
	//if player value changed
	if(e.key == 'sessPl') {
		nPl = JSON.parse(e.newValue);
		oPl = JSON.parse(e.oldValue);
		sessPl = JSON.parse(localStorage.sessPl);
		savePlayers();
		for(i = 0; i < nPl.length; i++) {
			let plEle = document.getElementById(sessPl[i].id); 
			let chDiv = document.getElementsByClassName('changes')[i];
			//HEALTH
			if(nPl[i].hp != oPl[i].hp || nPl[i].hpM != oPl[i].hpM) {
				let hpBar = plEle.childNodes[2].childNodes[2];
				let hpPer = (nPl[i].hp / nPl[i].hpM) * 100;
				//pulse animation on danger
				if(hpPer <= 20) {
					document.getElementsByClassName('hp')[i].classList.add('need-heal');
				} else {
					document.getElementsByClassName('hp')[i].classList.remove('need-heal');
				}
				//show difference
				if(nPl[i].hp != oPl[i].hp) {
					let hpDiff = nPl[i].hp - oPl[i].hp;
					if(hpDiff < 0) {
						chDiv.textContent = hpDiff;
						chDiv.className = 'changes';
						void chDiv.offsetWidth;
						chDiv.classList.add('dam');
					} else {
						chDiv.textContent = '+' + hpDiff;
						chDiv.className = 'changes';
						void chDiv.offsetWidth;
						chDiv.classList.add('heal');
					}
				}
				//make changes
				setProgress(hpBar, hpPer);
				document.getElementsByClassName('hpn')[i].textContent = nPl[i].hp;
			}
			//TEMPORARY HEALTH
			if(nPl[i].hpT != oPl[i].hpT) {
				let tempEle = document.getElementsByClassName('temp')[i];
				let tempNum = document.getElementsByClassName('hpT')[i];
				//if zero hide element
				if(nPl[i].hpT == 0) {
					tempEle.style.display = 'none';
				} else {
					tempEle.style.display = 'block';
					tempNum.textContent = nPl[i].hpT;
				}
			}
			//EXP
			if(nPl[i].exp != oPl[i].exp) {
				let exBar = plEle.childNodes[2].lastChild;
				let expE = lvUpExp[nPl[i].lv];
				let expS = charExp[nPl[i].lv];
				let exPer = (nPl[i].exp - expS) / expE * 100;
				//show difference
				if(nPl[i].lv == oPl[i].lv) {
					let expDiff = nPl[i].exp - oPl[i].exp;
					if(expDiff > 0) {
						chDiv.textContent = '+' + expDiff;
					} else {
						chDiv.textContent = expDiff;
					}
					chDiv.className = 'changes';
					void chDiv.offsetWidth;
					chDiv.classList.add('ch-exp');
				}
				//make changes
				setProgress(exBar, exPer);
				document.getElementsByClassName('exp')[i].textContent = nPl[i].exp + ' EXP';
			}
			//LEVEL
			if(nPl[i].lv != oPl[i].lv) {
				//if level up
				if (nPl[i].lv < oPl[i].lv) {
					chDiv.innerHTML = '&#8595;Level!';
				} else {
					chDiv.innerHTML = '&#8593;Level!';
				}
				chDiv.className = 'changes';
				void chDiv.offsetWidth;
				chDiv.classList.add('ch-exp');
				
				document.getElementsByClassName('lvn')[i].textContent = nPl[i].lv;
			}
			//ARMOR
			if(nPl[i].ac != oPl[i].ac || nPl[i].armor != oPl[i].armor) {
				//make message
				chDiv.innerHTML = '&#x2656;Change';
				chDiv.className = 'changes';
				void chDiv.offsetWidth;
				chDiv.classList.add('ch-armor');
				//make changes
				document.getElementsByClassName('acn')[i].textContent = nPl[i].ac;
			}
			//NAMES
			if(nPl[i].name != oPl[i].name) {
				//make change
				document.getElementsByClassName('name')[i].textContent = nPl[i].name;
			}
		}
	//MESSAGE
	} else if (e.key == 'msg') {
		if(e.newValue != null) {
			let msgCon = JSON.parse(e.newValue);
			let msg = msgCon.message;
			//if website generated
			if(msgCon.trust == 'yes') {
				pop.innerHTML = msg;
			} else {
				pop.textContent = msg;
			}
			pop.className = 'msg';
			openPop();
		} else {
			pop.className = 'normal';
			closePop();
		}
	//INVENTORY SHOW
	} else if (e.key == 'showInv') {
		if(e.newValue != null) {
			showInv(e.newValue);
		} else {
			pop.className = 'normal';
			pop.textContent = '';
			closePop();
		}
    //LOCATION
	} else if (e.key == 'loca') {
		console.log('changed locations');
        updateLoca();
    }
}, false);