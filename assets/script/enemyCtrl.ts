import { _decorator, Animation, Collider2D, Component, Contact2DType, IPhysics2DContact, log, Node, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyCtrl')
export class EnemyCtrl extends Component {

    @property
    hp: number = 0;

    @property
    speed: number = 250;

    @property(Animation)
    anima: Animation = null;

    collider: Collider2D = null;

    @property
    animaHit: string = "";

    @property
    animaDown: string = "";

    start() {
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        this.hp -= 1;
        if (this.hp <= 0) {
            this.anima.play(this.animaDown);
            if (this.collider) {
                this.collider.enabled = false;
            }
            this.scheduleOnce(function(){
                this.node.destroy();
            }, 1);
        } else {
            this.anima.play(this.animaHit);
        }
    }

    update(deltaTime: number) {
        if (this.hp <= 0) return;
        const move = deltaTime * this.speed;
        const postion = this.node.position;
        this.node.setPosition(postion.x, postion.y - move, postion.z);
        if (postion.y < -600 || postion.y > 600 || postion.x < -400 || postion.x > 400) {
            this.node.destroy();
        }
    }

    protected onDestroy(): void {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
}


