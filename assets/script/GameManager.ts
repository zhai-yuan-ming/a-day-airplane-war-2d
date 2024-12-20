import { _decorator, Component, director, Node } from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance: GameManager = null;

    public static getInstance(): GameManager {
        return this.instance;
    }

    private hp: number = 5;

    private bombNumber: number = 0;

    private score: number = 0;

    private enemyLv: number = 1;

    @property(PlayerCtrl)
    player: PlayerCtrl = null;

    @property
    invincible: number = 0;

    protected onEnable(): void {
        GameManager.instance = this;
    }

    start() {
    }

    update(deltaTime: number) {
        
    }
    
    onPauseClick() {
        director.pause();
        this.player.onPauseClick();
    }

    onResumeClick() {
        director.resume();
        this.player.onResumeClick();
    }

    gameOver() {
        this.onPauseClick();
        this.node.emit("gameOver", 999, this.score);
    }

    public addInvincible(num: number) {
        this.invincible += num;
        if (this.invincible <= 0) {
            this.invincible = 0;
        }
    }

    public addBomb(num: number) {
        this.bombNumber += num;
        if (this.bombNumber <= 0) {
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

}


