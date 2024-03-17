function newMap() {
    txt = '<a id="navClose" href="javascript:void(0)" class="closebtn" onclick="closePop()">&times;</a><div id="iframeHold"><form onsubmit="startEdit(event)" method="post"><label for="mWidth">Width (tile):</label> <input name="mWidth" type="number" value="1" min="1" step="1" id="mWidth" required><label for="mHeight">Height (tile):</label> <input name="mHeight" type="number" min="1" step="1" value="1" id="mHeight" required><button type="submit">Start</button></form></div>';
    pop.innerHTML = txt;
    openPop();
}
function startEdit(e) {
    e.preventDefault;
    let width = parseInt(document.getElementById('mWidth').value);
    let height = parseInt(document.getElementById('mHeight').value);
    
    mapHeight = height;
    mapWidth = width;
    
    let iFrameH = document.getElementById('iframeHold');
    iFrameH.innerHTML = '<iframe src="map-edit.htlm" title="Map Editor"></iframe>';
}

//MAJOR VARIABLES
var mapWidth, mapHeight;