import { _decorator, CCFloat, Component, input, Input, instantiate, math, Node, Prefab } from 'cc';
import { GameManager } from './GameManager';
import { EnemyCtrl } from './EnemyCtrl';
import { GameUtil } from './GameUtil';
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
    enemy3CreateRate: number = 10;

    @property(Prefab)
    enemy3Prefab: Prefab = null;

    @property
    enemy4CreateRate: number = 50;

    @property(Prefab)
    enemy4Prefab: Prefab = null;

    @property
    enemy5CreateRate: number = 300;

    @property(Prefab)
    enemy5Prefab: Prefab = null;

    @property
    enemy6CreateRate: number = 10;

    @property(Prefab)
    enemy6Prefab: Prefab = null;

    @property
    enemy7CreateRate: number = 50;

    @property(Prefab)
    enemy7Prefab: Prefab = null;

    @property
    enemy8CreateRate: number = 300;

    @property(Prefab)
    enemy8Prefab: Prefab = null;

    @property
    rewardCreateRate: number = 10;

    @property([Prefab])
    rewardList: Prefab[] = [];

    @property([CCFloat])
    rewardRate: number[] = [];

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
        this.schedule(this.rewardCreate, this.rewardCreateRate);
        this.start345();
        this.start678();
    }

    start345() {
        if (this.gm.getLv() < 40) return;
        this.schedule(this.enemy3Create, this.enemy3CreateRate);
        this.schedule(this.enemy4Create, this.enemy4CreateRate);
        this.schedule(this.enemy5Create, this.enemy5CreateRate);

    }

    start678() {
        if (this.gm.getLv() < 80) return;
        this.schedule(this.enemy6Create, this.enemy6CreateRate);
        this.schedule(this.enemy7Create, this.enemy7CreateRate);
        this.schedule(this.enemy8Create, this.enemy8CreateRate);
    }

    stop345() {
        if (this.gm.getLv() < 40) return;
        this.unschedule(this.enemy3Create);
        this.unschedule(this.enemy4Create);
        this.unschedule(this.enemy5Create);
    }

    stop678() {
        if (this.gm.getLv() < 80) return;
        this.unschedule(this.enemy6Create);
        this.unschedule(this.enemy7Create);
        this.unschedule(this.enemy8Create);
    }

    unAllSchedule() {
        this.unschedule(this.enemy0Create);
        this.unschedule(this.enemy1Create);
        this.unschedule(this.enemy2Create);
        this.unschedule(this.rewardCreate);
        this.stop345();
        this.stop678();
    }

    private initFlag: number = 0;

    initSchedule() { 
        if (this.gm.getLv() / 10 <= this.initFlag) return;
        this.initFlag += 1;
        this.enemy0CreateRate = 1 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy0CreateRate <= 0.5) {
            this.enemy0CreateRate = 0.1;
        }
        this.enemy1CreateRate = 5 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy1CreateRate <= 1) {
            this.enemy1CreateRate = 1;
        }
        this.enemy2CreateRate = 15 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy2CreateRate <= 2) {
            this.enemy2CreateRate = 2;
        }
        this.enemy3CreateRate = 10 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy3CreateRate <= 1) {
            this.enemy3CreateRate = 1;
        }
        this.enemy4CreateRate = 50 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy4CreateRate <= 2) {
            this.enemy4CreateRate = 2;
        }
        this.enemy5CreateRate = 150 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy5CreateRate <= 5) {
            this.enemy5CreateRate = 5;
        }
        this.enemy6CreateRate = 10 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy6CreateRate <= 1) {
            this.enemy6CreateRate = 1;
        }
        this.enemy7CreateRate = 50 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy7CreateRate <= 2) {
            this.enemy7CreateRate = 2;
        }
        this.enemy8CreateRate = 150 * (1 - this.gm.getLv() * 0.01);
        if (this.enemy8CreateRate <= 5) {
            this.enemy8CreateRate = 5;
        }
        this.rewardCreateRate = 10 * (1 - this.gm.getLv() * 0.01);
        if (this.rewardCreateRate <= 3) {
            this.rewardCreateRate = 3;
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

    enemy3Create() {
        const enemy3 = instantiate(this.enemy3Prefab);
        this.node.addChild(enemy3);
        enemy3.setPosition(-300, math.randomRangeInt(-350, 350), 0)
        this.enemyList.push(enemy3);
    }

    enemy4Create() {
        const enemy4 = instantiate(this.enemy4Prefab);
        this.node.addChild(enemy4);
        enemy4.setPosition(-300, math.randomRangeInt(-350, 350), 0)
        this.enemyList.push(enemy4);
    }

    enemy5Create() {
        const enemy5 = instantiate(this.enemy5Prefab);
        this.node.addChild(enemy5);
        enemy5.setPosition(-400, math.randomRangeInt(-100, 350), 0)
        this.enemyList.push(enemy5);
    }

    enemy6Create() {
        const enemy6 = instantiate(this.enemy6Prefab);
        this.node.addChild(enemy6);
        enemy6.setPosition(300, math.randomRangeInt(-350, 350), 0)
        this.enemyList.push(enemy6);
    }

    enemy7Create() {
        const enemy7 = instantiate(this.enemy7Prefab);
        this.node.addChild(enemy7);
        enemy7.setPosition(300, math.randomRangeInt(-350, 350), 0)
        this.enemyList.push(enemy7);
    }

    enemy8Create() {
        const enemy8 = instantiate(this.enemy8Prefab);
        this.node.addChild(enemy8);
        enemy8.setPosition(400, math.randomRangeInt(-100, 350), 0)
        this.enemyList.push(enemy8);
    }

    rewardCreate() {
        if (this.rewardList.length <= 0) return;
        let rewardPrafab = GameUtil.inst.randomRage(this.rewardList, this.rewardRate);
        const reward = instantiate(rewardPrafab);
        this.node.addChild(reward);
        reward.setPosition(math.randomRangeInt(-215, 215), 450, 0)
    }

    private doubleClickInterval: number = 0.25;

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


