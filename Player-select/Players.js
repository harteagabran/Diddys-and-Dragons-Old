//DEBUG
function nameAll() {
    players.forEach(function (pl) {
        console.log('Character:' + pl.name);
    });
}
//SUBMITTING PLAYERS TO SESSION STORAGE
function submitToSess() {
    let names = document.getElementsByClassName('span-boi');
    sessPl = [];
    for (i = 0; i < names.length; i++) {
        let pl = termToArray(players, 'name', names[i].textContent);
        sessPl.push(pl);
    }
    playersToSession();

    //open window for player view and redirect to another view
    window.open('../Player-screen/plScreen.html', 'playerScreen', 'channelmode=yes,directories=no,fullscreen=yes,location=no,menubar=no,resizable=yes,scrollbars=no,status=no,titlebar=no,toolbar=no');
    location.replace('../Battle/battle.html');
}
//MAKING NEW PLAYER
//FUNCTION
function newPlayer() {
    let fName = document.getElementById('fName').value;
    let fAva = document.getElementById('fAva');
    let fAvaS = fAva.src;
    let fAvaN = fAva.getAttribute('data-name');
    let fHpM = Number(document.getElementById('fHpM').value);
    let fSpeed = Number(document.getElementById('fSpeed').value);
    let fLv = Number(document.getElementById('fLv').value);
    let fExp = Number(document.getElementById('fExp').value);
    let fArmor = document.getElementById('fArmor').value;
    let fShield = document.getElementById('fShield').value;
    let fStr = Number(document.getElementById('fStr').value);
    let fDex = Number(document.getElementById('fDex').value);
    let fCon = Number(document.getElementById('fCon').value);
    let fInt = Number(document.getElementById('fInt').value);
    let fWis = Number(document.getElementById('fWis').value);
    let fCha = Number(document.getElementById('fCha').value);
    let fWeapI = document.getElementsByClassName('fWeapI');
    var weap = new Array();
    let fPp = Number(document.getElementById('fPp').value);
    let fGp = Number(document.getElementById('fGp').value);
    let fEp = Number(document.getElementById('fEp').value);
    let fSp = Number(document.getElementById('fSp').value);
    let fCp = Number(document.getElementById('fCp').value);
    let fItemN = document.getElementsByClassName('fItemN');
    let fItemA = document.getElementsByClassName('fItemA');
    let fItemW = document.getElementsByClassName('fItemW');
    var item = new Array();
    if (fItemN.length > 0) {
        for (i = 0; i < fItemN.length; i++) {
            let iName = fItemN[i].value;
            let iAmnt = fItemA[i].value;
            let iWei = fItemW[i].value;
            item = addItemInv(iName, iAmnt, iWei, item);
            console.log(item);
        }
    }
    if (fWeapI.length > 0) {
        for (i = 0; i < fWeapI.length; i++) {
            weap.push(fWeapI[i].value);
        }
    }

    let fPlayer = document.getElementById('fPlayer').value;

    let nPlayer = new Object();
    nPlayer.name = fName;
    nPlayer.avatar = new Object();
    nPlayer.avatar.source = fAvaS;
    nPlayer.avatar.id = fAvaN;
    nPlayer.speed = fSpeed;
    nPlayer.hp = fHpM;
    nPlayer.hpM = fHpM;
    nPlayer.hpT = 0;
    nPlayer.lv = fLv;
    nPlayer.exp = fExp;
    nPlayer.armor = fArmor;
    nPlayer.shield = fShield;
    nPlayer.str = fStr;
    nPlayer.dex = fDex;
    nPlayer.con = fCon;
    nPlayer.int = fInt;
    nPlayer.wis = fWis;
    nPlayer.cha = fCha;
    nPlayer.pp = fPp;
    nPlayer.gp = fGp;
    nPlayer.ep = fEp;
    nPlayer.sp = fSp;
    nPlayer.cp = fCp;
    nPlayer.player = fPlayer;
    nPlayer.weap = weap;
    nPlayer.inv = item;
    nPlayer.hold = new Array();
    nPlayer.ac = calcAC(nPlayer.armor, nPlayer.shield, nPlayer);
    nPlayer.acB = 0;
    nPlayer.id = Math.floor(Math.random() * 1000000000);
    nPlayer.stat = 'normal';
    
    players.push(nPlayer);
    playersToStorage();
    console.log('added ' + nPlayer.name + ' to player database');
    drawPlayers();
    closePop();
}

function newSrc(ele) {
    let ava = document.getElementById('fAva');
    ava.src = ele.src;
    ava.setAttribute('data-name', ele.getAttribute('data-name'));
}

function changeAvatars(ele) {
    let div = ele.parentElement.parentElement;
    let iSrc = ele.previousSibling;
    let ifr = document.getElementById('avatar-select');
    txt = '';
    for (i = 0; i < 58; i++) {
        let aSrc = '../Assets/Faces/pro (' + (i + 1) + ').png';
        txt += '<image data-name="face' + (i + 1) + '" onclick="newSrc(this); this.parentElement.style.display = \'none\'" class="avatar" src="' + aSrc + '"/>';
    }
    ifr.innerHTML = txt;
    ifr.style.display = 'block';
}
//MAKING FORM CODE
//FUNCTIONS
function playerForm() {
    txt = '<a id="navClose" href="javascript:void(0)" class="closebtn" onclick="closePop()">&times;</a><form onsubmit="newPlayer();return false" onreset="closePop()"><fieldset><legend>Character</legend><div><label for="name">Name:</label><input id="fName" type="text" name="name" required placeholder="Diddy" autocomplete="off"></input><span><img id="fAva" data-name="face1" src="file:///C:/Users/kumar/Desktop/D&D%20App%202.0/Assets/Faces/pro (1).png"/><button id="fchAva" type="button" onclick="changeAvatars(this)">Change Avatar</button></span></div><div><label for="hpM">Health:</label><input id="fHpM" type="number" name="hpM" required placeholder="10" min="0"></input><label for="speed">Speed:</label><input id="fSpeed" type="number" name="speed" step="5" required placeholder="25" min="0"></input></div><div><label for="level">Level:</label><select id="fLv" name="level" onchange="calcLvExp(\'level\', this.value)"></select><label for="exp">Exp:</label><input id="fExp" type="number" name="exp" min="0" max="355000" value="0" onchange="calcLvExp(\'exp\', this.value)"></input></div><div id="fEquip"><label for="armor">Armor:</label><select id="fArmor" name="armor"></select><label for="shield">Shield:</label><select id="fShield" name="shield"><option value="yes">Yes</option><option value="no" selected>No</option></select></div><h2>Abilities</h2><table><thead><tr><td>STR</td><td>DEX</td><td>CON</td><td>INT</td><td>WIS</td><td>CHA</td></tr></thead><tbody><tr><td><input id="fStr" type="number" min="0" value="0"></input></td><td><input id="fDex" type="number" min="0" value="0"></input></td><td><input id="fCon" type="number" min="0" value="0"></input></td><td><input id="fInt" type="number" min="0" value="0"></input></td><td><input id="fWis" type="number" min="0" value="0"></input></td><td><input id="fCha" type="number" min="0" value="0"></input></td></tr></tbody></table><h2>Weapons</h2><div id="fWeap"><button type="button" onclick="addSlot(\'Weap\')" id="weap-button">&#9876 Add Weapon</button></div><h2>Currency</h2><table><thead><tr><td>PP</td><td>GP</td><td>EP</td><td>SP</td><td>CP</td></tr></thead><tbody><tr><td><input id="fPp" type="number" min="0" value="0"></input></td><td><input id="fGp" type="number" min="0" value="0"></input></td><td><input id="fEp" type="number" min="0" value="0"></input></td><td><input id="fSp" type="number" min="0" value="0"></input></td><td><input id="fCp" type="number" min="0" value="0"></input></td></tr></tbody></table><h2>Inventory</h2><div id="fInv"><button type="button" onclick="addSlot(\'Inv\')" id="inv-button">&#127890 Add Item</button><dataList id="item-sugg"></dataList></div><input type="text" list="player-sugg" id="fPlayer" placeholder="Player" autocomplete="off"  required></input><dataList id="player-sugg"></dataList><button type="submit" id="fSubmit">All Done!</button><button type="reset" id="fReset">Cancel</button></fieldset></form>';

    pop.innerHTML = txt;
    openPop();

    //add item options to item choose
    txt = '';
    let itemSugg = document.getElementById('item-sugg');
    for (i = 0; i < Items5E.length; i++) {
        txt += '<option value="' + Items5E[i].name + '">' + Items5E[i].name + '</option>';
    }
    itemSugg.innerHTML = txt;

    //add player options to player form
    txt = '';
    let plSugg = document.getElementById('player-sugg');
    for (i = 0; i < creators.length; i++) {
        txt += '<option value="' + creators[i] + '">'
    }
    plSugg.innerHTML = txt;

    //add options to select
    let lvD = document.getElementById('fLv');
    txt = '';
    for (i = 0; i < 20; i++) {
        let lv = i + 1;
        txt += '<option value="' + lv + '">' + lv + '</option>';
    }
    lvD.innerHTML = txt;

    let armD = document.getElementById('fArmor');
    txt = '';
    for (i = 0; i < armor5E.length; i++) {
        txt += '<option value="' + armor5E[i].name + '">' + armor5E[i].name + '</option>';
    }
    armD.innerHTML = txt;
}

//ADD WEAPON DROPDOWN
//FUNCTION
function addSlot(kind) {
    if (kind === 'Weap') {
        let weapDrop = document.createElement('select');
        weapDrop.setAttribute('onchange', "removeItem('weapon', this)");
        weapDrop.className = 'fWeapI';
        txt = '';
        for (i = 0; i < weapons5E.length; i++) {
            txt += '<option value="' + weapons5E[i].name + '">' + weapons5E[i].name + '</option>';
        }
        weapDrop.innerHTML = txt;
        document.getElementById('weap-button').after(weapDrop);
    } else if (kind === 'Inv') {
        let itemForm = document.createElement('div');
        itemForm.className = 'fItemI';
        txt = '<input type="text" list="item-sugg" class="fItemN" onchange="checkAutoItem(this)" placeholder="item" autocomplete="off"></input><input type="number" class="fItemA" value="1" min="0" step="1"></input><input type="number" class="fItemW" value="0" min="0" step="0.1"></input>';
        itemForm.innerHTML = txt;
        itemForm.childNodes[1].setAttribute('onchange', "removeItem('item', this)");
        document.getElementById('inv-button').after(itemForm);
    }
}
//ADD PLAYERS TO SESSPL
function plToFooter(ele) {
    let name = ele.firstChild.textContent;
    //if already selected
    if (ele.classList.contains('picked')) {
        let boi = document.getElementsByClassName('span-boi');

        for (i = 0; i < boi.length; i++) {
            if (boi[i].textContent === name) {
                boi[i].remove();
            }
        }
        if (document.getElementById('sess-pl').childElementCount === 1) {
            document.getElementById('submit-bois').remove();
        }
    } else {
        let span = document.createElement('span');
        span.setAttribute('onclick', 'plOffFooter(this)');
        span.setAttribute('class', 'span-boi')
        span.textContent = name;
        //if sess-pl does not have button add one
        if (!document.getElementById('submit-bois')) {
            let sub = document.createElement('button');
            sub.setAttribute('id', 'submit-bois');
            sub.setAttribute('type', 'button');
            sub.setAttribute('onclick', 'submitToSess()');
            sub.textContent = 'Ready!';

            document.getElementById('sess-pl').prepend(sub);
        }
        document.getElementById('sess-pl').prepend(span);
    }
    mBodyMargin();
}
//UNSELECT PLAYER FROM FOOTER
function plOffFooter(el) {
    let name = el.textContent;
    let opt = document.getElementsByClassName('picked');
    for (i = 0; i < opt.length; i++) {
        if (opt[i].firstChild.textContent === name) {
            opt[i].classList.remove('picked');
            break
        }
    }
    el.remove();
    if (document.getElementById('sess-pl').childElementCount === 1) {
        document.getElementById('submit-bois').remove();
    }
    mBodyMargin();
}
//DRAW PLAYERS ON PAGE
//FUNCTION
function drawPlayers() {
    mainBod.innerHTML = '<button id="add-more" class="main-btn" onclick="playerForm()">&#9997 Add New Character</button>';
    creators = [];
    players.forEach(function (pl) {
        if (!creators.includes(pl.player)) {
            creators.push(pl.player);
        }
    });
    if (creators.length > 0) {
        //write all players to screen

        creators.forEach(function (own) {
            let plButton = document.createElement('button');
            plButton.setAttribute('class', 'owner-accord');
            plButton.setAttribute('id', own);
            plButton.setAttribute('onclick', 'this.nextSibling.classList.toggle(\'show\'); this.classList.toggle(\'active\')');
            plButton.textContent = own;
            txt = '';

            let plDiv = document.createElement('div');
            plDiv.setAttribute('class', 'chara-panels')
            players.forEach(function (pl) {
                if (pl.player === own) {
                    txt += '<p class="characters';
                    if (termToArray(sessPl, 'name', pl.name)) {
                        txt += ' picked"';
                    } else {
                        txt += '"';
                    }
                    txt += 'onclick="plToFooter(this); this.classList.toggle(\'picked\')"><span class="charaName">' + pl.name + '</span> Lv. <span class="charaLv">' + pl.lv + '</span></p>';
                }
            });
            plDiv.innerHTML = txt;
            //post on page
            mainBod.append(plButton);
            mainBod.append(plDiv);
        });

    }
    if (sessPl.length > 0) {
        txt = '';
        sessPl.forEach(function (plS) {
            txt += '<span class="span-boi" onclick="plOffFooter(this)" >' + plS.name + '</span>';
        });
        txt += '<button type="button" onclick="submitToSess()" id="submit-bois">Ready!</button>';
        document.getElementById('sess-pl').innerHTML = txt;
    } else {
        document.getElementById('sess-pl').innerHTML = '';
    }
    mBodyMargin();
}
///////////////////////////////////
//ON LOAD START
///////////////////////////////////
var creators = new Array();
drawPlayers();

///////////////////////////////////
//RIGHT CLICK MENU FUNCTIONS
///////////////////////////////////
//DELETE CHAR FROM PLAYERS
function deleteChar() {
    let name = document.getElementById('rcName').textContent;
    let sure = confirm('Are you sure you want to delete ' + name + ' from database forever?')
    if (sure === true) {
        //DELETE FROM PLAYER STORAGE
        for (i = 0; i < players.length; i++) {
            if (players[i].name === name) {
                var pIndex = i;
                break
            }
        }
        players.splice(pIndex, 1);
        playersToStorage();
        sessPl = [];
        playersToSession();
        console.log('deleted ' + name + ' from database');
        drawPlayers();
    }
}
//////////////////////////////////////////
//PAGE EVENT LISTENERS
//////////////////////////////////////////
//////////////////////////////////////////
//right click
document.addEventListener('contextmenu', function (e) {
    var name, ele, prevent = false;
    if (e.target.closest('.characters')) {
        ele = e.target.closest('.characters');
        name = ele.firstChild.textContent;
        prevent = true;
    }
    if (prevent) {
        e.preventDefault();
        //writing menu
        openRCMenu(name, e);
    }
}, false);
//WHEN LOCAL STORAGE IS MODIFIED
document.addEventListener('storage', function (e) {
    console.log(e);
}, false);
