const oldExp = {
  200: 2207026470,
  201: 2471869646,
  202: 2768494003,
  203: 3100713283,
  204: 3472798876,
  205: 3889534741,
  206: 4356278909,
  207: 4879032378,
  208: 5464516263,
  209: 6120258214,
  210: 9792413142,
  211: 10869578587,
  212: 12065232231,
  213: 13392407776,
  214: 14865572631,
  215: 19325244420,
  216: 21064516417,
  217: 22960322894,
  218: 25026751954,
  219: 27279159629,
  220: 35462907517,
  221: 37945311043,
  222: 40601482816,
  223: 43443586613,
  224: 46484637675,
  225: 64148799991,
  226: 67356239990,
  227: 70724051989,
  228: 74260254588,
  229: 77973267317,
  230: 124757227707,
  231: 128499944538,
  232: 132354942874,
  233: 136325591160,
  234: 140415358894,
  235: 193773195273,
  236: 199586391131,
  237: 205573982864,
  238: 211741202349,
  239: 218093438419,
  240: 348949501470,
  241: 359417986514,
  242: 370200526109,
  243: 381306541892,
  244: 392745738148,
  245: 541989118644,
  246: 558248792203,
  247: 574996255969,
  248: 592246143648,
  249: 610013527957,
  250: 976021644731,
  251: 1005302294072,
  252: 1035461362984,
  253: 1066525203780,
  254: 1098520959893,
  255: 1131476588689,
  256: 1165420886349,
  257: 1200383512939,
  258: 1236395018327,
  259: 1273486868876,
  260: 2902427248153,
  261: 2931451520634,
  262: 2960766035840,
  263: 2990373696198,
  264: 3020277433159,
  265: 3050480207490,
  266: 3080985009564,
  267: 3111794859659,
  268: 3142912808255,
  269: 3174341936337,
  270: 6412170711400,
  271: 6476292418514,
  272: 6541055342699,
  273: 6606465896125,
  274: 6672530555086,
};

export class Chara {
    level: number
    exp: number;
    newage: boolean;

    constructor(level: number, exp: number) {
        this.level = level;
        this.exp = exp;
        this.newage = false;
    }

    clone() {
        return new Chara(this.level, this.exp);
    }

    updateExp() {
        if(this.newage) {
            while(this.exp >= oldExp[this.level] / 2) {
                this.exp -= oldExp[this.level] / 2;
                this.level++;
            }
        }
        else {
            while(this.exp >= oldExp[this.level]) {
                this.exp -= oldExp[this.level];
                this.level++;
            }
        }
    }

    useItem() {
        if(this.newage) {
            this.exp += oldExp[Math.max(this.level, 249)] / 2;
            this.updateExp()
        }
        else {
            this.exp += oldExp[Math.max(this.level, 249)];
            this.updateExp()
        }
    }

    newify() {
        this.newage = true;
        this.updateExp();
    }

    getExpRate() {
        if(this.newage) {
            return this.exp / (oldExp[this.level] / 2) * 100;
        }
        else {
            return this.exp / oldExp[this.level] * 100;
        }
    }

    static convertToExp(level: number, expRate: number) {
        return expRate * oldExp[level] / 100;
    }
}

export function getBestCount(ch: Chara, total: number): [number, Chara, (Chara | number)[]] {
    let maxCh = ch;
    let maxI = 0;
    let maxHistory = [];
    for(let i = 0; i <= total; i++) {
        let history = [];
        let newCh = ch.clone();
        history.push(newCh.clone());
        for(let _ = 0; _ < i; _++) {
            newCh.useItem();
            history.push(newCh.clone());
        }
        newCh.newify();
        history.push(1);
        history.push(newCh.clone());
        for(let _ = 0; _ < total - i; _++) {
            newCh.useItem();
            history.push(newCh.clone())
        }
        if(newCh.level > maxCh.level || newCh.level === maxCh.level && newCh.exp > maxCh.exp - 1) {
            maxCh = newCh;
            maxI = i;
            maxHistory = history;
        }
    }
    return [maxI, maxCh, maxHistory];
}