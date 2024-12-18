import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

export enum RwdType{
    TwoBullet,
    Bomb
}
@ccclass('RewardCtrl')
export class RewardCtrl extends Component {

    @property
    rwdType: RwdType = RwdType.TwoBullet;

    @property
    speed: number = 150;

    collider: Collider2D = null;

    start() {
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        if (this.collider) {
            this.collider.enabled = false;
        }
        this.scheduleOnce(function(){
            this.node.destroy();
        }, 0);
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


