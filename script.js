let status = document.querySelector('.status');
let mb = document.querySelector('#mb');
let wld = document.querySelector('.wld');
let restart = document.querySelector('.restart');
let start = document.querySelector('.start');
let board = document.querySelector('.board');
let winningLine = document.getElementById('winningLine');
let cwf = 0, ch, n = 0, i, j, k, hl = [], ml = [], hlc = 0, mlc = 0, num = 1, sh, o, ai, h, winwidth = 0,
    a = [
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 6]
    ],
    t = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
    ];

document.getElementById('yes').addEventListener('click', function () {
    ai = 'O';
    h = 'X';
    start.style.display = 'none';
    restart.style.display = 'block';
    board.style.display = 'flex';
});

document.getElementById('no').addEventListener('click', function () {
    ai = 'X';
    h = 'O';
    machine();
    start.style.display = 'none';
    restart.style.display = 'block';
    board.style.display = 'flex';
});

for (i = 1; i <= 3; i++)
    for (j = 1; j <= 3; j++) {
        let divb = document.getElementById('a' + `${i}${j}`);
        divb.data = i;
        divb.classList.add(`${j}`);
        divb.addEventListener('click', function () {
            if (status.style.display !== 'flex') {
                if (divb.textContent === '') {
                    n++;
                    divb.textContent = h;
                    divb.classList.add(`${h}`);
                    hl[hlc++] = a[parseInt(divb.data) - 1][parseInt(divb.classList[1]) - 1];
                    checkwin();
                    if (n < 9 && cwf == 0)
                        machine();
                }
            }
        });
    }

function posswin(f) {
    for (i = 0; i < 4; i++)
        for (j = i + 1; j < 5; j++) {
            if (f === 0) {
                if (hl[i] !== 0 && hl[j] !== 0)
                    sh = 15 - (hl[i] + hl[j]);
            } else {
                if (ml[i] !== 0 && ml[j] !== 0)
                    sh = 15 - (ml[i] + ml[j]);
            }
            let cnv = cnvrt(sh);
            if (empt(sh) && cnv < 10 && cnv > 0)
                return cnv;
        }
    return 0;
}

function cnvrt(cnvr) {
    for (let x2 = 0; x2 < 3; x2++)
        for (let y2 = 0; y2 < 3; y2++)
            if (a[x2][y2] == cnvr)
                return t[x2][y2];
    return -2;
}

function cnvrtr(cnvr) {
    for (let x2 = 0; x2 < 3; x2++)
        for (let y2 = 0; y2 < 3; y2++)
            if (t[x2][y2] == cnvr)
                return a[x2][y2];
    return -2;
}

function rndm() {
    do {
        ch = cnvrtr(num);
        num = num + 1;
    } while (!((empt(ch)) && (ch > 0) && (ch < 10)));
    ch = cnvrt(ch);
    num = 1;
}

function machine() {
    let t1, t2;
    if (n > 2) {
        t1 = posswin(0), t2 = posswin(1);
    }
    if (n === 0)
        ch = 5;
    else if (n === 1) {
        if (empt(5))
            ch = 5;
        else
            ch = 1;
    } else if (n === 2) {
        if (empt(8))
            ch = 1;
        else
            rndm();
    } else if (n === 3) {
        if (t1 != 0)
            ch = t1;
        else if (t2 != 0)
            ch = t2;
        else
            rndm();
    } else if (n > 3) {
        if (t2 != 0)
            ch = t2;
        else if (t1 != 0)
            ch = t1;
        else
            rndm();
    }
    for (i = 1; i <= 3; i++)
        for (j = 1; j <= 3; j++)
            if (ch === t[i - 1][j - 1]) {
                if (empt(cnvrtr(ch))) {
                    document.getElementById('a' + `${i}${j}`).textContent = ai;
                    document.getElementById('a' + `${i}${j}`).classList.add(`${ai}`);
                    n++;
                    ml[mlc++] = cnvrtr(ch);
                    checkwin();
                }
            }
}

function empt(cho) {
    for (let x = 0; x < 5; x++)
        if (hl[x] == cho || ml[x] == cho)
            return 0;
    return 1;
}

function checkwin() {
    for (let i3 = 0; i3 < 3; i3++)
        for (let j3 = i3 + 1; j3 < 4; j3++)
            for (let k3 = j3 + 1; k3 < 5; k3++) {
                if ((hl[i3] !== 0 && hl[j3] !== 0 && hl[k3] !== 0) && (hl[i3] + hl[j3] + hl[k3] === 15)) {
                    status.style.display = 'flex';
                    wld.textContent = "You Won!";
                    cwf = 1;
                    winningLine.classList.add(`${h}l`);
                    drawWinningLine((hl[i3]), (hl[j3]), (hl[k3]));
                    return;
                } else if ((ml[i3] !== 0 && ml[j3] !== 0 && ml[k3] !== 0) && (ml[i3] + ml[j3] + ml[k3] === 15)) {
                    status.style.display = 'flex';
                    wld.textContent = "You Lost!";
                    cwf = 1;
                    winningLine.classList.add(`${ai}l`);
                    drawWinningLine((ml[i3]), (ml[j3]), (ml[k3]));
                    return;
                } else if (n === 9) {
                    status.style.display = 'flex';
                    wld.textContent = "Draw!";
                    cwf = 1;
                }
            }
}

function drawWinningLine(i3, j3, k3) {

    winningLine.style.display = 'block';
    winningLine.style.width = '0px';
    document.querySelector('.chld').style.width = '0px';
    let wls = cnvrtr(Math.max(cnvrt(i3), cnvrt(j3), cnvrt(k3)));
    let wle = cnvrtr(Math.min(cnvrt(i3), cnvrt(j3), cnvrt(k3)));
    let wlc = 15 - (wls + wle);

    const startdiv = document.querySelector(`.gc${wls}`).getBoundingClientRect();
    const enddiv = document.querySelector(`.gc${wle}`).getBoundingClientRect();
    const centerdiv = document.querySelector(`.gc${wlc}`).getBoundingClientRect();

    const windiv = winningLine.getBoundingClientRect();
    winwidth = windiv.width + 'px';
    winningLine.style.minWidth = '0px';
    const startX = startdiv.left;
    const startY = startdiv.top;
    const endX = enddiv.left;
    const endY = enddiv.top;

    let angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    if (angle === 180 || angle === 0) {
        if (wlc === 9) {
            winningLine.style.top = `${windiv.top + (startdiv.width / 2) - 20}px`;
        } else if (wlc === 5) {
            winningLine.style.top = `${windiv.top + ((startdiv.width / 2) * 3) - 12}px`;
        } else {
            winningLine.style.top = `${windiv.top + ((startdiv.width / 2) * 5) - 5}px`;
        }
    } else if (angle === 90 || angle === 170) {
        winningLine.style.top = `${windiv.top + ((startdiv.width / 2) * 3) - 12}px`;
        if (wlc === 5) {
        } else if (wlc === 3) {
            winningLine.style.left = `${windiv.left - startdiv.width - 16}px`;
        } else {
            winningLine.style.left = `${windiv.left + startdiv.width}px`;
        }
    } else {
        if (angle < 90) {
            angle = 45;
        } else {
            angle = 135;
        }
        winningLine.style.top = `${windiv.top + ((startdiv.width / 2) * 3) - 13}px`;
        if (startdiv.width === 140) {
            winningLine.style.left = `${windiv.left - (startdiv.width / 2) - 24}px`;
            winwidth = '594px';
        } else {
            winningLine.style.left = `${windiv.left - (startdiv.width / 2) - 20}px`;
            winwidth = '425px';
        }
    }
    winningLine.style.transform = `rotate(${angle}deg)`;
    setTimeout(chngw, 1);
}

function chngw() {
    winningLine.style.width = winwidth;
    document.querySelector('.chld').style.width = winwidth;
}