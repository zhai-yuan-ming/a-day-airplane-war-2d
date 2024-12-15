import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    speed: number = 500;

    update(deltaTime: number) {
        const postion = this.node.position;
        this.node.setPosition(postion.x, postion.y + this.speed * deltaTime, postion.z);
    }
}


