import { _decorator, Animation, AudioClip, Collider2D, Component, Contact2DType, IPhysics2DContact, log, math, Node, PhysicsSystem2D } from 'cc';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('EnemyCtrl')
export class EnemyCtrl extends Component {

    @property
    hp: number = 0;

    @property
    speed: number = 250;

    @property
    score: number = 0;

    @property(Animation)
    anima: Animation = null;

    collider: Collider2D = null;

    @property
    animaHit: string = "";

    @property
    animaDown: string = "";

    @property(AudioClip)
    downMus: AudioClip = null;
    
    private gm:GameManager = null;

    start() {
        this.gm = GameManager.getInstance();
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
            AudioMgr.inst.playOneShot(this.downMus, 1);
            this.enemyDead();
        } else {
            this.anima.play(this.animaHit);
        }
    }

    update(deltaTime: number) {
        if (this.hp <= 0) return;
        const move = deltaTime * this.speed;
        const postion = this.node.position;
        const rotation = this.node.getRotation();
        if (rotation.z > 0) {
            this.node.setPosition(postion.x + move, postion.y, postion.z);
        } else if (rotation.z == 0) {
            this.node.setPosition(postion.x, postion.y - move, postion.z);
        } else if (rotation.z < 0) {
            this.node.setPosition(postion.x - move, postion.y, postion.z);
        }
        if (postion.y < -600 || postion.y > 600 || postion.x < -400 || postion.x > 400) {
            this.enemyDestroy();
        }
    }

    protected onDestroy(): void {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    
    enemyDead() {
        this.gm.addScore(this.score);
        this.anima.play(this.animaDown);
        if (this.collider) {
            this.collider.enabled = false;
        }
        this.scheduleOnce(function(){
            this.enemyDestroy();
        }, 1);

    }

    enemyDestroy() {
        this.gm.removeEnemy(this.node);
        this.node.destroy();
    }
}


