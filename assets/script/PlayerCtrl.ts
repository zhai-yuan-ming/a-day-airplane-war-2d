import { _decorator, Collider2D, Component, Contact2DType, EventTouch, Input, input, instantiate, IPhysics2DContact, Node, Prefab, Vec3, Animation, AudioClip } from 'cc';
import { EnemyCtrl } from './EnemyCtrl';
import { RewardCtrl, RwdType } from './RewardCtrl';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

enum ShootType {
    OneBullet,
    TwoBullet,
    ThreeBullet,
    FiveBullet
}
@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {

    @property
    public penetrate: boolean = false;

    @property(AudioClip)
    getThingMus: AudioClip = null;

    @property(AudioClip)
    oneBulletMus: AudioClip = null;

    @property(AudioClip)
    twoBulletMus: AudioClip = null;

    @property(AudioClip)
    downMus: AudioClip = null;

    private gm:GameManager = null;

    private isPause:boolean = false;
    
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        if (this.isPause) return;
        if (this.gm.getHp() <= 0) return;
        const postion = this.node.position;
        let tagetPosition = new Vec3(postion.x + event.getDeltaX(), postion.y + event.getDeltaY(), postion.z)
        if (tagetPosition.x <= -240) {
            tagetPosition.x = -240;
        }
        if (tagetPosition.x >= 240) {
            tagetPosition.x = 240;
        }
        if (tagetPosition.y <= -380) {
            tagetPosition.y = -380;
        }
        if (tagetPosition.y >= 380) {
            tagetPosition.y = 380;
        }
        this.node.position = tagetPosition;
    }
    
    onPauseClick() {
        this.isPause = true;
    }

    onResumeClick() {
        this.isPause = false;
    }

    @property
    shootRate: number = 0.5;

    shootTime: number = 0;

    @property(Node)
    bulletParent: Node = null;

    @property
    shootType: ShootType = ShootType.OneBullet;

    protected update(dt: number): void {
        if (this.gm.getHp() <= 0) return;
        switch(this.shootType) {
            case ShootType.OneBullet: 
                this.oneBulletShoot(dt);
                break;
            case ShootType.TwoBullet:
                this.twoBulletShoot(dt);
                break;
            case ShootType.ThreeBullet:
                this.ThreeBulletShoot(dt);
                break;
            case ShootType.FiveBullet:
                this.fiveBulletShoot(dt);
                break;
        }
        if (this.gm.invincible > 0) {
            this.gm.addInvincible(-dt);
        }
        if (this.shootType != ShootType.FiveBullet && this.gm.getLv() >= 40) {
            this.shootType = ShootType.FiveBullet;
        }
    }

    @property(Prefab)
    bullet1Prefab: Prefab = null;

    @property(Node)
    bullet1Position: Node = null;

    oneBulletShoot(dt: number) {
        this.shootTime += dt;
        if (this.shootTime >= this.shootRate) {
            AudioMgr.inst.playOneShot(this.oneBulletMus, 1);
            this.shootTime = 0;
            const bullet1 = instantiate(this.bullet1Prefab);
            this.bulletParent.addChild(bullet1);
            bullet1.setWorldPosition(this.bullet1Position.worldPosition);
        }
    }

    @property(Prefab)
    bullet2Prefab: Prefab = null;

    @property(Node)
    bullet2Position1: Node = null;

    @property(Node)
    bullet2Position2: Node = null;

    twoBulletShoot(dt: number) {
        this.shootTime += dt;
        if (this.shootTime >= this.shootRate) {
            AudioMgr.inst.playOneShot(this.twoBulletMus, 1);
            this.shootTime = 0;
            const bullet1 = instantiate(this.bullet2Prefab);
            const bullet2 = instantiate(this.bullet2Prefab);
            this.bulletParent.addChild(bullet1);
            this.bulletParent.addChild(bullet2);
            bullet1.setWorldPosition(this.bullet2Position1.worldPosition);
            bullet2.setWorldPosition(this.bullet2Position2.worldPosition);
        }
    }

    ThreeBulletShoot(dt: number) {
        this.shootTime += dt;
        if (this.shootTime >= this.shootRate) {
            AudioMgr.inst.playOneShot(this.twoBulletMus, 1);
            this.shootTime = 0;
            const bullet0 = instantiate(this.bullet1Prefab);
            const bullet1 = instantiate(this.bullet2Prefab);
            const bullet2 = instantiate(this.bullet2Prefab);
            this.bulletParent.addChild(bullet0);
            this.bulletParent.addChild(bullet1);
            this.bulletParent.addChild(bullet2);
            bullet0.setWorldPosition(this.bullet1Position.worldPosition);
            bullet1.setWorldPosition(this.bullet2Position1.worldPosition);
            bullet2.setWorldPosition(this.bullet2Position2.worldPosition);
        }
    }

    @property(Prefab)
    bullet3Prefab: Prefab = null;

    @property(Prefab)
    bullet4Prefab: Prefab = null;

    @property(Node)
    bullet3Position1: Node = null;

    @property(Node)
    bullet3Position2: Node = null;

    fiveBulletShoot(dt: number) {
        this.shootTime += dt;
        if (this.shootTime >= this.shootRate) {
            AudioMgr.inst.playOneShot(this.twoBulletMus, 1);
            this.shootTime = 0;
            const bullet0 = instantiate(this.bullet1Prefab);
            const bullet1 = instantiate(this.bullet2Prefab);
            const bullet2 = instantiate(this.bullet2Prefab);
            const bullet3 = instantiate(this.bullet3Prefab);
            const bullet4 = instantiate(this.bullet4Prefab);
            this.bulletParent.addChild(bullet0);
            this.bulletParent.addChild(bullet1);
            this.bulletParent.addChild(bullet2);
            this.bulletParent.addChild(bullet3);
            this.bulletParent.addChild(bullet4);
            bullet0.setWorldPosition(this.bullet1Position.worldPosition);
            bullet1.setWorldPosition(this.bullet2Position1.worldPosition);
            bullet2.setWorldPosition(this.bullet2Position2.worldPosition);
            bullet3.setWorldPosition(this.bullet3Position1.worldPosition);
            bullet4.setWorldPosition(this.bullet3Position2.worldPosition);
        }
    }
    

    collider: Collider2D = null;

    @property(Animation)
    anima: Animation = null;

    @property
    animaHit: string = "";

    @property
    animaDown: string = "";

    protected start(): void {
        this.gm = GameManager.getInstance();
        // 注册单个碰撞体的回调函数
        this.collider = this.getComponent(Collider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const rewardCtrlVal = otherCollider.getComponent(RewardCtrl);
        if (rewardCtrlVal) {
            this.collisionReward(otherCollider);
            return;
        }
        const enemyCtrlVal = otherCollider.getComponent(EnemyCtrl);
        if (enemyCtrlVal) {
            this.collisionEnemy();
            return;
        }
    }

    collisionEnemy() {
        if (this.gm.invincible > 0) return;
        this.gm.addHp(-1);
        if (this.gm.getHp() <= 0) {
            AudioMgr.inst.playOneShot(this.downMus, 1);
            this.anima.play(this.animaDown);
            if (this.collider) {
                this.collider.enabled = false;
            }
            this.scheduleOnce(function(){
                this.gm.gameOver();
            }, 3);
        } else {
            this.gm.invincible = 1;
            this.anima.play(this.animaHit);
        }
    }

    collisionReward(otherCollider: Collider2D) {
        AudioMgr.inst.playOneShot(this.getThingMus, 2);
        const rewardCtrlVal = otherCollider.getComponent(RewardCtrl);
        switch(rewardCtrlVal.rwdType) {
            case RwdType.TwoBullet:
                if (this.shootType == ShootType.OneBullet) {
                    this.shootType = ShootType.TwoBullet;
                } else if (this.shootType == ShootType.TwoBullet) {
                    this.shootType = ShootType.ThreeBullet;
                } else {
                    if (this.shootRate > 0.2) {
                        this.shootRate -= 0.05;
                    } else if (this.shootRate > 0.15) {
                        this.shootRate -= 0.01;
                    }
                }
                break;
            case RwdType.Bomb: 
                this.gm.addBomb(1);
                break;
        }

    }
}


