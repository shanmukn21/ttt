const hsvg = `<svg class='hsvg' width="64" height="64" viewBox="0 0 64 64"><rect x="12" y="9.5" width="40" height="40" rx="20" /><rect x="9.05" y="51.5" width="46" height="46" rx="23" /></svg>`;
const aisvg = `<svg class='aisvg' width="64" height="64" viewBox="0 0 64 64"><rect x="9" y="9.5" width="46" height="39" rx="14.5" /><circle cx="22" cy="28" r="6" /><circle cx="42" cy="28" r="6" /><rect x="27.35" y="0" width="9.5" height="9.5" rx="4.75" /><rect x="0" y="20.5" width="16" height="17" rx="8.5" /><rect x="48" y="20.5" width="16" height="17" rx="8.5" /><rect x="9.05" y="51.5" width="46" height="46" rx="23" /></svg>`;
const xsvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="x-icon"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>`;
const osvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="o-icon"><circle cx="12" cy="12" r="6"/></svg>`;
const statusbar = document.querySelector('.status');
const heading = document.querySelector('.heading');
const restart = document.querySelector('.restart');
const home = document.querySelector('.home');
const start = document.querySelector('.start');
const board = document.querySelector('.board');
const hvh = document.querySelector('.hvh');
const hva = document.querySelector('.hva');
const play = document.querySelector('.play');
const leftplayer = document.querySelector('.leftplayer');
const rightplayer = document.querySelector('.rightplayer');
const norm = document.querySelector('.norm');
const hipe = document.querySelector('.hipe');
const winningLine = document.getElementById('winningLine');
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
const body = document.body;

let lightMode = false,activeplayer = null, player1 = [], player2 = [], noai = true, cwf = 0, ch, n = 0, i, j, k, hl = [], ml = [], hlc = 0, mlc = 0, num = 1, sh, o, ai, h, winwidth = 0,
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

for (i = 1; i <= 3; i++)
    for (j = 1; j <= 3; j++) {
        let divb = document.getElementById('a' + `${i}${j}`);
        divb.data = i;
        divb.classList.add(`${j}`);
        divb.addEventListener('click', function () {
            if (statusbar.innerHTML === '') {
                if (divb.innerHTML === '') {
                    board.style.pointerEvents = 'none';
                    n++;
                    if (h === 'X') {
                        divb.innerHTML = `${xsvg}`;
                    } else {
                        divb.innerHTML = `${osvg}`;
                    }
                    divb.classList.add(`${h}`);
                    if (noai === true) {
                        if (player1.selection === h) {
                            hl[hlc++] = a[parseInt(divb.data) - 1][parseInt(divb.classList[1]) - 1];
                        } else {
                            ml[mlc++] = a[parseInt(divb.data) - 1][parseInt(divb.classList[1]) - 1];
                        }
                    } else {
                        hl[hlc++] = a[parseInt(divb.data) - 1][parseInt(divb.classList[1]) - 1];
                    }
                    checkwin();
                    if (cwf == 0) {
                        setTimeout(() => {
                            board.style.pointerEvents = 'auto';
                            changeopacity();
                        }, 300);
                    }
                    if (n < 9 && cwf == 0) {
                        if (noai === false) {
                            setTimeout(machine, 300);
                        } else {
                            if (h === player1.selection) {
                                h = player2.selection;
                            } else {
                                h = player1.selection;
                            }
                        }
                    }
                }
            }
        });
    }

hvh.addEventListener('click', function () {
    if (hva.classList.contains('active')) {
        hva.classList.remove('active');
        hva.classList.add('passive');
        norm.style.transform = 'translateX(-25%)';
        hipe.style.transform = 'translateX(75%)';
        hipe.style.opacity = '0';
    }
    if (!hvh.classList.contains('active')) {
        hvh.classList.add('active');
        hvh.classList.remove('passive');
    }
});

hva.addEventListener('click', function () {
    if (hvh.classList.contains('active')) {
        hvh.classList.remove('active');
        hvh.classList.add('passive');
        norm.style.transform = 'translateX(33%)';
        hipe.style.transform = 'translateX(16.5%)';
        hipe.style.opacity = '1';
    }
    if (!hva.classList.contains('active')) {
        hva.classList.add('active');
        hva.classList.remove('passive');
    }
});

hipe.addEventListener('click', function () {
    if (hipe.classList.contains('on')) {
        hipe.classList.remove('on');
        hipe.classList.add('off');
    } else {
        hipe.classList.add('on');
        hipe.classList.remove('off');
    }
});

norm.addEventListener('click', function () {
    if (norm.classList.contains('on')) {
        norm.classList.remove('on');
        norm.classList.add('off');
    } else {
        norm.classList.add('on');
        norm.classList.remove('off');
    }
});

function startGame() {
    if (hvh.classList.contains('active')) {
        noai = true;
        player1.type = 'h';
        player2.type = 'h';
        leftplayer.innerHTML = `${hsvg}`;
        rightplayer.innerHTML = `${hsvg}`;
    } else {
        noai = false;
        if (hipe.classList.contains('on')) {
            player1.type = 'ai';
            player2.type = 'h';
            leftplayer.innerHTML = `${aisvg}`;
            rightplayer.innerHTML = `${hsvg}`;
        } else {
            player1.type = 'h';
            player2.type = 'ai';
            leftplayer.innerHTML = `${hsvg}`;
            rightplayer.innerHTML = `${aisvg}`;
        }
    }
    if (norm.classList.contains('on')) {
        player1.selection = 'O';
        player2.selection = 'X';
        leftplayer.innerHTML += `${osvg}`;
        rightplayer.innerHTML += `${xsvg}`;
    } else {
        player1.selection = 'X';
        player2.selection = 'O';
        leftplayer.innerHTML += `${xsvg}`;
        rightplayer.innerHTML += `${osvg}`;
    }
    if (noai === false) {
        if (player1.type === 'ai') {
            ai = player1.selection;
            h = player2.selection;
            machine();
        } else {
            ai = player2.selection;
            h = player1.selection;
        }
    } else {
        h = player1.selection;
        ai = player2.selection;
    }
    changeopacity();
}

play.addEventListener('click', function () {
    startGame();
    heading.style.display = 'none';
    start.style.display = 'none';
    restart.style.display = 'block';
    home.style.display = 'block';
    board.style.display = 'grid';
});

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
                    board.style.pointerEvents = 'none';

                    if (ai === 'X') {
                        document.getElementById('a' + `${i}${j}`).innerHTML = `${xsvg}`;
                    } else {
                        document.getElementById('a' + `${i}${j}`).innerHTML = `${osvg}`;
                    }
                    document.getElementById('a' + `${i}${j}`).classList.add(`${ai}`);
                    n++;
                    ml[mlc++] = cnvrtr(ch);
                    checkwin();
                    if (cwf == 0) {
                        setTimeout(() => {
                            board.style.pointerEvents = 'auto';
                            changeopacity();
                        }, 300);
                    }
                }
            }
}

function empt(cho) {
    for (let x = 0; x < 5; x++)
        if (hl[x] == cho || ml[x] == cho)
            return 0;
    return 1;
}

function changeopacity() {
    if (n % 2 === 0) {
        leftplayer.style.opacity = '1';
        rightplayer.style.opacity = '0.3';
    } else {
        leftplayer.style.opacity = '0.3';
        rightplayer.style.opacity = '1';
    }
}

function checkwin() {
    for (let i3 = 0; i3 < 3; i3++)
        for (let j3 = i3 + 1; j3 < 4; j3++)
            for (let k3 = j3 + 1; k3 < 5; k3++) {
                if ((hl[i3] !== 0 && hl[j3] !== 0 && hl[k3] !== 0) && (hl[i3] + hl[j3] + hl[k3] === 15)) {
                    board.style.pointerEvents = 'none';
                    if (h === 'X') {
                        statusbar.innerHTML = `${xsvg} Won!`;
                    } else {
                        statusbar.innerHTML = `${osvg} Won!`;
                    }
                    cwf = 1;
                    winningLine.classList.add(`${h}l`);
                    drawWinningLine((hl[i3]), (hl[j3]), (hl[k3]));
                    return;
                } else if ((ml[i3] !== 0 && ml[j3] !== 0 && ml[k3] !== 0) && (ml[i3] + ml[j3] + ml[k3] === 15)) {
                    board.style.pointerEvents = 'none';
                    if (ai === 'X') {
                        statusbar.innerHTML = `${xsvg} Won!`;
                    } else {
                        statusbar.innerHTML = `${osvg} Won!`;
                    }
                    cwf = 1;
                    winningLine.classList.add(`${ai}l`);
                    drawWinningLine((ml[i3]), (ml[j3]), (ml[k3]));
                    return;
                } else if (n === 9) {
                    board.style.pointerEvents = 'none';
                    statusbar.textContent = "Draw!";
                    cwf = 1;
                } else {
                    // changeopacity();
                }
            }
}

function drawWinningLine(i3, j3, k3) {
    let left = '0%';
    let top = '0%';

    winningLine.style.display = 'block';
    winningLine.style.width = '0px';
    document.querySelector('.chld').style.width = '0px';
    let wls = cnvrtr(Math.max(cnvrt(i3), cnvrt(j3), cnvrt(k3)));
    let wle = cnvrtr(Math.min(cnvrt(i3), cnvrt(j3), cnvrt(k3)));
    let wlc = 15 - (wls + wle);

    const startdiv = document.querySelector(`.gc${wls}`).getBoundingClientRect();
    const enddiv = document.querySelector(`.gc${wle}`).getBoundingClientRect();
    const centerdiv = document.querySelector(`.gc${wlc}`).getBoundingClientRect();

    winwidth = '94%';
    const startX = startdiv.left;
    const startY = startdiv.top;
    const endX = enddiv.left;
    const endY = enddiv.top;

    let angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    if (angle === 180 || angle === 0) {
        left = '3%';
        if (wlc === 9) {
            top = '16%';
        } else if (wlc === 5) {
            top = '49%';
        } else {
            top = '82.5%';
        }
    } else if (angle === 90 || angle === 170) {
        top = '49%';
        if (wlc === 5) {
            left = '3%';
        } else if (wlc === 3) {
            left = '-30.25%'
        } else {
            left = '36.5%';
        }
    } else {
        if (angle < 90) {
            angle = 45;
        } else {
            angle = 135;
        }
        left = '-16%';
        top = '49%';
        winwidth = '132%';
    }
    winningLine.style.left = left;
    winningLine.style.top = top;
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.style.width = winwidth;

    setTimeout(() => {
        document.querySelector('.chld').style.width = '100%';
    }, 300);
}

restart.addEventListener('click', function () {
    for (i = 1; i <= 3; i++)
        for (j = 1; j <= 3; j++) {
            document.getElementById('a' + `${i}${j}`).innerHTML = '';
            document.getElementById('a' + `${i}${j}`).classList.remove('X');
            document.getElementById('a' + `${i}${j}`).classList.remove('O');
        }
    statusbar.innerHTML = '';
    winningLine.style.display = 'none';
    winningLine.classList.remove(`${h}l`);
    winningLine.classList.remove(`${ai}l`);
    cwf = 0, n = 0, hl = [], ml = [], hlc = 0, mlc = 0, num = 1, winwidth = 0,
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
    board.style.pointerEvents = 'auto';
    startGame();
});

toggle.addEventListener('click', () => {
    
    lightMode = !lightMode;

    if (lightMode) {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        root.style.setProperty('--primary-color', '#f0f0f0');
        root.style.setProperty('--secondary-color', '#1a1a1a');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        root.style.setProperty('--primary-color', '#1a1a1a');
        root.style.setProperty('--secondary-color', '#f0f0f0');
    }
    localStorage.setItem('theme', lightMode ? 'light' : 'dark');
});

window.onload = function () {
    localStorage.getItem('theme') === 'light' ? lightMode = true : lightMode = false;
    
    if (lightMode) {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        root.style.setProperty('--primary-color', '#f0f0f0');
        root.style.setProperty('--secondary-color', '#1a1a1a');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        root.style.setProperty('--primary-color', '#1a1a1a');
        root.style.setProperty('--secondary-color', '#f0f0f0');
    }
};
