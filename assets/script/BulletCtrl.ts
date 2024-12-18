import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    hp: number = 1;

    @property
    speed: number = 500;

    protected start(): void {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.hp -= 1;
        if (this.hp <= 0) {
            let collider = this.getComponent(Collider2D);
            if (collider) {
                collider.enabled = false;
            }
            this.scheduleOnce(function(){
                this.node.destroy();
            }, 0);
        }
    }

    update(deltaTime: number) {
        const postion = this.node.position;
        this.node.setPosition(postion.x, postion.y + this.speed * deltaTime, postion.z);
        if (postion.x > 240 || postion.x < -240 || postion.y > 440 || postion.y < -440) {
            this.node.destroy();
        }
    }
}


