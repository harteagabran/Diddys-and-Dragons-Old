function startUp() {
    for (var st = 0; st < total; st++) {
        map.push(0);
    }
}

function drawMap() {
    let xPos = 0;
    let yPos = 0;
    for (var tile = 0; tile < total; tile++) {
        drawTile(c, tileset, map, col, row, tile, xPos, yPos);
        xPos += tileSize;
        let tId = tile + 1;
        if (tId % col == 0) {
            xPos = 0;
            yPos += tileSize;
        }
    }
    resizeMap();
}

function resizeMap() {
    let parent = canvas.parentElement;
    let mWidth, mHeight;
    //figure out which side is bigger
    if (col > row) {
        let maxW = parent.clientWidth;
        mTileSize = Math.floor(parseFloat(maxW) / col);
    } else {
        let maxH = parent.clientHeight;
        mTileSize = Math.floor(parseFloat(maxH) / row);
    }
    mWidth = mTileSize * col;
    mHeight = mTileSize * row;
    scale = mTileSize / tileSize;
    canvas.style.width = mWidth + 'px';
    canvas.style.height = mHeight + 'px';
}
//VARIABLES
//canvas
var canvas = document.getElementById('map');
var c = canvas.getContext('2d');
//check if window is used as iframe
var map = new Array();
var col = parent.mapWidth || 10;
var row = parent.mapHeight || 10;
var total = col * row;
const tileSize = 24;
var tileset = new Image();
tileset.src = '../Images/Tilesets/Maptiles.png';
var scale, mapWidth, mapHeight, cX, cY, wX, wY, mTileSize;
var cursor = 1;


//CANVAS SET UP
mapWidth = col * tileSize;
mapHeight = row * tileSize;
canvas.width = mapWidth;
canvas.height = mapHeight;

tileset.onload = function () {
    startUp();
    drawMap();
}

//on canvas hover highlight the tile
canvas.addEventListener('mousemove', function (e) {
    let rect = canvas.getBoundingClientRect();
    cX = Math.floor(e.clientX - rect.left);
    cY = Math.floor(e.clientY - rect.top);
    wX = cX - (cX % mTileSize);
    wY = cY - (cY % mTileSize);

    //canvas to show for relative
    let disX = (canvas.parentElement.clientWidth - parseInt(canvas.style.width)) / 2;
    let disY = (canvas.parentElement.clientHeight - parseInt(canvas.style.height)) / 2;

    //edit cursor square
    let crD = document.getElementById('cursor');
    crD.style.height = mTileSize + 'px';
    crD.style.width = mTileSize + 'px';
    crD.style.top = (wY + disY) + 'px';
    crD.style.left = (wX + disX) + 'px';
}, false);

window.addEventListener('click', function (e) {
    //TEST replace with mouse digit
    //replace a digit on map 
    let valX = (wX / mTileSize);
    let valY = (wY / mTileSize) * row;
    let ind = valX + valY;

    //replace at index with water then redraw map
    map[ind] = cursor;
    drawMap();
}, false);
