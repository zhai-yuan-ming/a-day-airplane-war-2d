import { _decorator, AudioClip, Component, input, Input, instantiate, math, Node, Prefab } from 'cc';
import { GameManager } from './GameManager';
import { EnemyCtrl } from './EnemyCtrl';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property
    enemy0CreateRate: number = 1;

    @property(Prefab)
    enemy0Prefab: Prefab = null;

    @property
    enemy1CreateRate: number = 5;

    @property(Prefab)
    enemy1Prefab: Prefab = null;

    @property
    enemy2CreateRate: number = 30;

    @property(Prefab)
    enemy2Prefab: Prefab = null;

    @property
    reward0CreateRate: number = 10;

    @property(Prefab)
    reward0Prefab: Prefab = null;

    @property
    reward1CreateRate: number = 30;

    @property(Prefab)
    reward1Prefab: Prefab = null;

    @property([Node])
    enemyList: Node[] = [];

    private gm:GameManager = null;

    start() {
        this.gm = GameManager.getInstance();
        this.startAllSchedule();
        this.gm.node.on("removeEnemy", this.removeEnemy, this);
    }

    protected onDestroy(): void {
        this.unAllSchedule();
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    startAllSchedule() {
        this.schedule(this.enemy0Create, this.enemy0CreateRate);
        this.schedule(this.enemy1Create, this.enemy1CreateRate);
        this.schedule(this.enemy2Create, this.enemy2CreateRate);
        this.schedule(this.reward0Create, this.reward0CreateRate);
        this.schedule(this.reward1Create, this.reward1CreateRate);
    }

    unAllSchedule() {
        this.unschedule(this.enemy0Create);
        this.unschedule(this.enemy1Create);
        this.unschedule(this.enemy2Create);
        this.unschedule(this.reward0Create);
        this.unschedule(this.reward1Create);
    }

    private initFlag: number = 0;

    initSchedule() { 
        if (this.gm.getLv() / 10 <= this.initFlag) return;
        this.initFlag += 1;
        this.enemy0CreateRate = 1 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy0CreateRate <= 0.1) {
            this.enemy0CreateRate = 0.1;
        }
        this.enemy1CreateRate = 5 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy1CreateRate <= 0.5) {
            this.enemy1CreateRate = 0.5;
        }
        this.enemy2CreateRate = 15 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy2CreateRate <= 1.5) {
            this.enemy2CreateRate = 1.5;
        }
        this.reward0CreateRate = 10 * (1 - this.gm.getLv() * 0.01);
        if (this.reward0CreateRate <= 3) {
            this.reward0CreateRate = 3;
        }
        this.reward1CreateRate = 10 * (1 - this.gm.getLv() * 0.01);
        if (this.reward1CreateRate <= 3) {
            this.reward1CreateRate = 3;
        }
        this.unAllSchedule();
        this.startAllSchedule();
    }
    
    update(deltaTime: number) {
        if (this.gm.getLv() >= 100) return;
        if (this.gm.getScore() <= 2000) {
            if ((this.gm.getScore() / 100) >= this.gm.getLv()) {
                this.gm.addLv(1);
                this.initSchedule();
            }
        }
        if (this.gm.getScore() > 2000 && this.gm.getScore() <= 6000) {
            if (((this.gm.getScore() - 2000) / 200) + 20 >= this.gm.getLv()) {
                this.gm.addLv(1);
                this.initSchedule();
            }
        }
        if (this.gm.getScore() > 6000 && this.gm.getScore() <= 46000) {
            if (((this.gm.getScore() - 6000) / 1000) + 40 >= this.gm.getLv()) {
                this.gm.addLv(1);
                this.initSchedule();
            }
        }
        if (this.gm.getScore() > 46000) {
            if (((this.gm.getScore() - 46000) / 2000) + 80 >= this.gm.getLv()) {
                this.gm.addLv(1);
                this.initSchedule();
            }
        }
    }

    pushEnemyList(enemy: Node) {
        this.enemyList.push(enemy);
    }

    delEnemyList(enemy: Node) {
        let index = this.enemyList.indexOf(enemy);
        if (index >= 0) {
            this.enemyList.splice(index, 1);
        }
    }

    enemy0Create() {
        const enemy0 = instantiate(this.enemy0Prefab);
        this.node.addChild(enemy0);
        enemy0.setPosition(math.randomRangeInt(-215, 215), 450, 0)
        this.enemyList.push(enemy0);
    }

    enemy1Create() {
        const enemy1 = instantiate(this.enemy1Prefab);
        this.node.addChild(enemy1);
        enemy1.setPosition(math.randomRangeInt(-200, 200), 500, 0)
        this.enemyList.push(enemy1);
    }

    enemy2Create() {
        const enemy2 = instantiate(this.enemy2Prefab);
        this.node.addChild(enemy2);
        enemy2.setPosition(math.randomRangeInt(-100, 100), 550, 0)
        this.enemyList.push(enemy2);
    }

    reward0Create() {
        const reward = instantiate(this.reward0Prefab);
        this.node.addChild(reward);
        reward.setPosition(math.randomRangeInt(-215, 215), 450, 0)
    }

    reward1Create() {
        const reward = instantiate(this.reward1Prefab);
        this.node.addChild(reward);
        reward.setPosition(math.randomRangeInt(-215, 215), 450, 0)
    }

    private doubleClickInterval: number = 0.2;

    private lastClickTime = 0;

    protected onLoad(): void {
        this.lastClickTime = 0;
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchEnd(event) {
        let curTime = Date.now();
        if ((curTime - this.lastClickTime) / 1000 < this.doubleClickInterval) {
            this.onDoubleClick(event);
        }
        this.lastClickTime = curTime;
    }

    onDoubleClick(event) {
        if (this.gm.getBomb() > 0) {
            this.gm.useBomb(1);
            for (let enemy of this.enemyList) {
                enemy.getComponent(EnemyCtrl).enemyDead();
            }
        }
    }

    removeEnemy(enemy: Node) {
        this.delEnemyList(enemy);
    }
}


