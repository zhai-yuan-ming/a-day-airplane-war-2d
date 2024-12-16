import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyCtrl')
export class enemyCtrl extends Component {

    @property
    speed: number = 250;

    @property(Animation)
    anima: Animation = null;

    start() {

    }

    update(deltaTime: number) {
        const move = deltaTime * this.speed;
        const postion = this.node.position;
        this.node.setPosition(postion.x, postion.y - move, postion.z);
        if (postion.y < -600 || postion.y > 600 || postion.x < -400 || postion.x > 400) {
            this.node.destroy();
        }
    }
}


