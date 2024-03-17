function drawTile(c, img, layer, col, row, index, x, y, frame) {
    frame = frame ?? 0;
    let tNum = layer[index];
    let imgX = 0;
    let imgY = 0;
    var nw, nn, ne, mw, me, sw, ss, se;
    //land
    if (tNum == 0) {
        nn = (layer[index - col] == 1) ? true : false;
        mw = (layer[index - 1] == 1) ? true : false;
        me = (layer[index + 1] == 1) ? true : false;
        ss = (layer[index + col] == 1) ? true : false;
        //go through and draw appropiatly
        if (nn && mw) {
            imgX = 0;
            imgY = 24;
        } else if (nn && me) {
            imgX = 48;
            imgY = 24;
        } else if (ss && mw) {
            imgX = 0;
            imgY = 72;
        } else if (ss && me) {
            imgX = 48;
            imgY = 72;
        } else if (nn) {
            imgX = 24;
            imgY = 24;
        } else if (mw) {
            imgX = 0;
            imgY = 48;
        } else if (me) {
            imgX = 48;
            imgY = 48;
        } else if (ss) {
            imgX = 24;
            imgY = 72;
        } else {
            let varia = Math.floor(Math.random() * 10);
            if (varia < 8) {
                imgX = 24;
                imgY = 48;
            } else if (varia == 8) {
                imgX = 24;
                imgY = 0;
            } else {
                imgX = 48;
                imgY = 0;
            }
        }
        //wall
    } else if (tNum == 1) {
        ne = (layer[index - (col - 1)] != 1) ? true : false;
        nn = (layer[index - col] != 1) ? true : false;
        nw = (layer[index - (col + 1)] != 1) ? true : false;
        mw = (layer[index - 1] != 1) ? true : false;
        me = (layer[index + 1] != 1) ? true : false;
        se = (layer[index + (col + 1)] != 1) ? true : false;
        ss = (layer[index + col] != 1) ? true : false;
        sw = (layer[index + (col - 1)] != 1) ? true : false;
        //draw appropriate box
        if (nn && mw && me && ss) {
            imgX = 0;
            imgY = 96;
        } else if (nw && ne && sw && se && !nn && !mw && !me && !ss) {
            imgX = 24;
            imgY = 288;
        //cross
        } else if (mw && nn && me) {
            imgX = 24;
            imgY = 264;
        } else if(nn && mw && ss) {
            imgX = 0;
            imgY = 288;
        } else if(nn && me && ss) {
            imgX = 48;
            imgY = 288;
        } else if(mw && me && ss) {
            imgX = 24;
            imgY = 312;
        //corners
        } else if(mw && nn && se) {
            imgX = 0;
            imgY = 216;
        } else if(nn && me && sw) {
            imgX = 48;
            imgY = 216;
        } else if(nw && me && ss) {
            imgX = 48;
            imgY = 240;
        } else if(ne && mw && ss) {
            imgX = 24;
            imgY = 240;
        //t ways
        } else if(nn && sw && se && !ss) {
            imgX = 24;
            imgY = 336;
        } else if(mw && ne && se && !me) {
            imgX = 0;
            imgY = 360;
        } else if(nw && me && sw && !mw) {
            imgX = 48;
            imgY = 360;
        } else if(nw && ne && ss && !nn) {
            imgX = 24;
            imgY = 384;
        //t into block
        } else if(nw && ne && se && !nn && !me) {
            imgX = 24;
            imgY = 480;
        } else if(nw && ne && sw && !nn && !mw) {
            imgX = 0;
            imgY = 480;
        } else if(nw && sw && se && !mw && !ss) {
            imgX = 0;
            imgY = 504;
        } else if(ne && sw && se && !me && !ss) {
            imgX = 24;
            imgY = 504;
        //edge corner
        } else if(nn && mw) {
            imgX = 0;
            imgY = 120;
        } else if(nn && me) {
            imgX = 48;
            imgY = 120;
        } else if(mw && ss) {
            imgX = 0;
            imgY = 168;
        } else if(me && ss) {
            imgX = 48;
            imgY = 168;
        //single lane
        } else if(nn && ss) {
            imgX = 24;
            imgY = 216;
        } else if(mw && me) {
            imgX = 0;
            imgY = 240;
        //lane corner block
        } else if(mw && se) {
            imgX = 0;
            imgY = 336;
        } else if(me && sw) {
            imgX = 48;
            imgY = 336;
        } else if(ne && mw) {
            imgX = 0;
            imgY = 384;
        } else if(nw && me) {
            imgX = 48;
            imgY = 384;
        } else if(nn && se) {
            imgX = 0;
            imgY = 408;
        } else if(nn && sw) {
            imgX = 48;
            imgY = 408;
        } else if(ne && ss) {
            imgX = 0;
            imgY = 456;
        } else if(nw && ss) {
            imgX = 48;
            imgY = 456;
        //diagonals
        } else if(nw && se) {
            imgX = 24;
            imgY = 360;
        } else if(ne && sw) {
            imgX = 24;
            imgY = 432;
         //block t
        } else if(sw && se) {
            imgX = 24;
            imgY = 408;
        } else if(ne && se) {
            imgX = 0;
            imgY = 432;
        } else if(nw && sw) {
            imgX = 48;
            imgY = 432;
        } else if(nw && ne) {
            imgX = 24;
            imgY = 456;
         //block t
        } else if(sw && se) {
            imgX = 24;
            imgY = 408;
        } else if(ne && se) {
            imgX = 0;
            imgY = 432;
        } else if(nw && sw) {
            imgX = 48;
            imgY = 432;
        } else if(nw && ne) {
            imgX = 24;
            imgY = 456;
        } else {
            imgX = 24;
            imgY = 144;
        }
    }
    //draw to canvas
    c.drawImage(img, imgX, imgY, 24, 24, x, y, 24, 24);
}
