import { _decorator, AudioClip, Component, director, Node } from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance: GameManager = null;

    public static getInstance(): GameManager {
        return this.instance;
    }

    private hp: number = 5;

    private bombNumber: number = 1;

    @property
    score: number = 0;

    private enemyLv: number = 1;

    @property(PlayerCtrl)
    player: PlayerCtrl = null;

    @property
    invincible: number = 0;

    @property(AudioClip)
    gameMusic:AudioClip = null;
    
    @property(AudioClip)
    useBombMus:AudioClip = null;

    protected onEnable(): void {
        GameManager.instance = this;
    }

    start() {
        AudioMgr.inst.play(this.gameMusic, 0.2);
    }

    update(deltaTime: number) {
        
    }
    
    onPauseClick() {
        director.pause();
        AudioMgr.inst.pause();
        this.player.onPauseClick();
    }

    onResumeClick() {
        director.resume();
        AudioMgr.inst.resume();
        this.player.onResumeClick();
    }

    gameOver() {
        this.onPauseClick();
        let bhs = localStorage.getItem("bestScore");
        let bs = 0;
        if (bhs) {
            bs = parseInt(bhs, 10);
        }
        this.node.emit("gameOver", bs, this.score);
    }

    public addInvincible(num: number) {
        this.invincible += num;
        if (this.invincible <= 0) {
            this.invincible = 0;
        }
    }

    public addBomb(num: number) {
        if (this.bombNumber < 0) {
            this.bombNumber = 0;
        }
        this.bombNumber += num;
        this.node.emit("changeBomb");
    }

    public useBomb(num: number) {
        if (this.bombNumber > 0) {
            this.bombNumber -= num;
            AudioMgr.inst.playOneShot(this.useBombMus, 0.1)
        } else {
            this.bombNumber = 0;
        }
        this.node.emit("changeBomb");
    }

    public getBomb() {
        return this.bombNumber;
    }

    public addHp(num: number) {
        this.hp += num;
        if (this.hp <= 0) {
            this.hp = 0;
        }
        this.node.emit("changeHp");
    }

    public getHp() {
        return this.hp;
    }

    public addScore(num: number) {
        this.score += num;
        if (this.score <= 0) {
            this.score = 0;
        }
        this.node.emit("changeScore");
    }

    public getScore() {
        return this.score;
    }

    public addLv(num: number) {
        this.enemyLv += num;
        if (this.enemyLv <= 0) {
            this.enemyLv = 0;
        }
        this.node.emit("changeLv");
    }

    public getLv() {
        return this.enemyLv;
    }

    removeEnemy(enemy: Node) {
        if (enemy) {
            this.node.emit("removeEnemy", enemy);
        }
    }
}


