import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
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

    start() {
        this.schedule(this.enemy0Create, this.enemy0CreateRate);
        this.schedule(this.enemy1Create, this.enemy1CreateRate);
        this.schedule(this.enemy2Create, this.enemy2CreateRate);
        this.schedule(this.reward0Create, this.reward0CreateRate);
        this.schedule(this.reward1Create, this.reward1CreateRate);
    }

    protected onDestroy(): void {
        this.unschedule(this.enemy0Create);
    }
    
    update(deltaTime: number) {
        
    }

    enemy0Create() {
        const enemy0 = instantiate(this.enemy0Prefab);
        this.node.addChild(enemy0);
        enemy0.setPosition(math.randomRangeInt(-215, 215), 450, 0)
    }

    enemy1Create() {
        const enemy1 = instantiate(this.enemy1Prefab);
        this.node.addChild(enemy1);
        enemy1.setPosition(math.randomRangeInt(-200, 200), 500, 0)
    }

    enemy2Create() {
        const enemy2 = instantiate(this.enemy2Prefab);
        this.node.addChild(enemy2);
        enemy2.setPosition(math.randomRangeInt(-100, 100), 550, 0)
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
}


