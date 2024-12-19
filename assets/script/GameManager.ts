import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private static instance: GameManager = null;

    public static getInstance(): GameManager {
        return this.instance;
    }

    @property
    private hp: number = 5;

    @property
    private bombNumber: number = 0;

    @property
    private score: number = 0;

    @property
    invincible: number = 0;

    protected onEnable(): void {
        GameManager.instance = this;
    }

    start() {
    }

    update(deltaTime: number) {
        
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
}


