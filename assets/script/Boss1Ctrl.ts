import { _decorator, AudioClip, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Quat, Animation, Sprite, Label } from 'cc';
import { GameUtil } from './GameUtil';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('Boss1Ctrl')
export class Boss1Ctrl extends Component {

    @property
    hp: number = 1000;

    @property
    maxHp: number = 1000;

    @property
    score: number = 0;

    @property
    moveAngle: number = 3;

    @property
    skillCd: number = 3;

    @property
    actCd: number = 1;

    @property
    rushTime: number = 0;

    @property
    rushSpeed: number = 1000;

    @property
    animaHit: string = "";

    @property
    animaDown: string = "";

    @property(AudioClip)
    downMus: AudioClip = null;

    @property(Animation)
    anima: Animation = null;

    @property(Sprite)
    hpSp: Sprite = null;

    @property(Label)
    hpLa: Label = null;

    private rotateTime: number = 0;

    private gm:GameManager = null;

    private inSkill: number = 0;

    private rushX: number = 0;

    private rushY: number = 0;

    private startY: number = 600;

    private initY: number = 250;

    private walkSpeed: number = 300;

    collider: Collider2D = null;

    start() {
        this.refreshBloodUi();
        this.gm = GameManager.getInstance();
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    refreshBloodUi() {
        this.hpLa.string = "生命值:" + this.hp.toString();
        this.hpSp.fillRange = this.hp / this.maxHp;
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        this.hp -= 1;
        if (this.hp < 0) {
            this.hp = 0;
        }
        this.refreshBloodUi();
        if (this.hp == 0) {
            AudioMgr.inst.playOneShot(this.downMus, 1);
            this.enemyDead();
        } else {
            this.anima.play(this.animaHit);
        }
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

    update(deltaTime: number) {
        // if (this.rotateTime >= deltaTime) {
        //     this.getTargetAngle();
        //     this.rotateTime = 0;
        // } else {
        //     this.rotateTime += deltaTime;    
        // }
        // 动作CD中不进入动作
        if (this.actCd > 0) {
            this.actCd -= deltaTime;
            return;
        }
        // 动作中
        if (this.inSkill == 1) {
            this.rush(deltaTime);
            return;
        } else if (this.inSkill == -1) {
            this.walk(deltaTime);
            return;
        }
        // 技能CD中不释放技能
        if (this.skillCd > 0) {
            this.skillCd -= deltaTime;
            return;
        }
        // 确定一个技能
        this.inSkill = 1;
        this.rushTime = 3;
        this.skillRush();
    }


    walk(deltaTime: number) {
        let moveX = 0;
        let moveY = 0;
        const postion = this.node.position;
        if (postion.y > this.initY) {
            moveY = -1 * deltaTime * this.walkSpeed;
        }
        if (postion.y < this.initY) {
            moveY = deltaTime * this.walkSpeed;
        }
        if (postion.x > 2) {
            moveX = -1 * deltaTime * this.walkSpeed;
        }
        if (postion.x < -2) {
            moveX = deltaTime * this.walkSpeed;
        }
        this.node.setPosition(postion.x + moveX, postion.y + moveY, postion.z);
        if (postion.y <= (this.initY + 5) && postion.y >= (this.initY - 5) && postion.x <= 5 && postion.x >= -5) {
            this.inSkill = 0;
        }
    }

    backToInit() {
        this.inSkill = -1;
        this.node.setPosition(0, this.startY, 0);
        this.node.angle = 0;
    }

    rush(deltaTime: number) {
        let offsetX = deltaTime * this.rushSpeed * this.rushX;
        let offsetY = deltaTime * this.rushSpeed * this.rushY;
        const postion = this.node.position;
        this.node.setPosition(postion.x - offsetX, postion.y - offsetY, postion.z);
        if (postion.y < -600 || postion.y > 600 || postion.x < -400 || postion.x > 400) {
            // 动作结束计入CD
            this.actCd = 1;
            if (this.rushTime <= 0) {
                // 技能结束计入CD
                this.skillCd = 3;
                this.backToInit();
            } else {
                this.rushTime --;
                this.skillRush();
            }
        }
    }

    skillRush() {
        this.node.angle = GameUtil.inst.getAngle(this.gm.player.node, this.node) + 90;
        let radian = GameUtil.inst.angleToRadian(this.node.angle + 90);
        this.rushX = Math.cos(radian);
        this.rushY = Math.sin(radian);
    }

    missileRotate() {
        let thisAngle = this.node.angle + 90;
        let angle = GameUtil.inst.getAngle(this.gm.player.node, this.node);
        if (thisAngle < 0) {
            thisAngle += 360;
        }
        if (thisAngle > 360) {
            thisAngle -= 360;
        }
        let minAngleOff = 180 - this.moveAngle;
        let maxAngleOff = 180 + this.moveAngle;
        if (thisAngle - angle <= maxAngleOff && thisAngle - angle >= minAngleOff) {
            return;
        }
        if (angle - thisAngle <= maxAngleOff && angle - thisAngle >= minAngleOff) {
            return;
        }
        // 旋转
        if ((thisAngle - angle < 180 && thisAngle - angle > 0) || angle - thisAngle > 180) {
            this.node.angle += 3;
        } else {
            this.node.angle -= 3;
        }

    }

}


