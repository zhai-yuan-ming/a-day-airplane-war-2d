import { _decorator, AudioClip, Component, director, instantiate, Node, Prefab, Vec3 } from 'cc';
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
        // 初始化玩家生命、子弹、炸弹数量、分数

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

    private bulletHp: number = 1;

    public getBulletHp() {
        return this.bulletHp;
    }

    public setBulletHp(hp: number) {
        this.bulletHp = hp;
    }

    @property
    canExplosion: boolean = false;

    public getCanExplosion() {
        return this.canExplosion;
    }

    public setCanExplosion(can: boolean) {
        this.canExplosion = can;
    }

    @property(Node)
    bulletParent: Node = null;
    
    @property(Prefab)
    bulletPrefab: Prefab = null;

    @property(AudioClip)
    oneBulletMus: AudioClip = null;

    explosion(position: Vec3) {
        AudioMgr.inst.playOneShot(this.oneBulletMus, 1);
        const bullet1 = instantiate(this.bulletPrefab);
        this.bulletParent.addChild(bullet1);
        bullet1.setRotationFromEuler(0, 0, 45);
        bullet1.setPosition(position);
        const bullet2 = instantiate(this.bulletPrefab);
        this.bulletParent.addChild(bullet2);
        bullet2.setPosition(position);
        bullet2.setRotationFromEuler(0, 0, 135);
        const bullet3 = instantiate(this.bulletPrefab);
        this.bulletParent.addChild(bullet3);
        bullet3.setPosition(position);
        bullet3.setRotationFromEuler(0, 0, 225);
        const bullet4 = instantiate(this.bulletPrefab);
        this.bulletParent.addChild(bullet4);
        bullet4.setPosition(position);
        bullet4.setRotationFromEuler(0, 0, 315);
    }
}


