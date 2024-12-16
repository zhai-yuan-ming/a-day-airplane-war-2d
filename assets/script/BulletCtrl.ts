import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    speed: number = 500;

    update(deltaTime: number) {
        const postion = this.node.position;
        this.node.setPosition(postion.x, postion.y + this.speed * deltaTime, postion.z);
        if (postion.x > 240 || postion.x < -240 || postion.y > 440 || postion.y < -440) {
            this.node.destroy();
        }
    }
}


