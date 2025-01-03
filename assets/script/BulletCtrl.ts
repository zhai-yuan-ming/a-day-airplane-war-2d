import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact} from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    @property
    hp: number = 1;

    @property
    speed: number = 500;

    private canExplosion: boolean = false;

    private gm: GameManager = null;

    protected start(): void {
        this.gm = GameManager.getInstance();
        this.hp = this.gm.getBulletHp();
        this.canExplosion = this.gm.getCanExplosion();
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.hp -= 1;
    }

    update(deltaTime: number) {
        if (this.canExplosion && this.hp < this.gm.getBulletHp()) {
            this.canExplosion = false;
            this.gm.explosion(this.node.position);
        }
        if (this.hp <= 0) {
            let collider = this.getComponent(Collider2D);
            if (collider) {
                collider.enabled = false;
            }
            this.scheduleOnce(function(){
                this.node.destroy();
            }, 0);
        }
        const postion = this.node.position;
        const rotation = this.node.getRotation();
        if (rotation.z > 0) {
            this.node.setPosition(postion.x - this.speed * deltaTime, postion.y + this.speed * deltaTime, postion.z);
        } else if (rotation.z < 0) {
            this.node.setPosition(postion.x + this.speed * deltaTime, postion.y + this.speed * deltaTime, postion.z);
        } else {
            this.node.setPosition(postion.x, postion.y + this.speed * deltaTime, postion.z);
        }
        if (postion.x > 240 || postion.x < -240 || postion.y > 440 || postion.y < -440) {
            this.node.destroy();
        }
    }
}


