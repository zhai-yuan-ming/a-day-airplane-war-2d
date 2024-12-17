import { _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum ShootType {
    OneBullet,
    TwoBullet
}
@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {

    @property
    hp: number = 5;
    
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        if (this.hp <= 0) return;
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

    @property
    shootRate: number = 0.4;

    shootTime: number = 0;

    @property(Node)
    bulletParent: Node = null;

    @property
    shootType: ShootType = ShootType.OneBullet;

    protected update(dt: number): void {
        if (this.hp <= 0) return;
        switch(this.shootType) {
            case ShootType.OneBullet: 
                this.oneBulletShoot(dt);
                break;
            case ShootType.TwoBullet:
                this.twoBulletShoot(dt);
                break;
        }
        
    }

    @property(Prefab)
    bullet1Prefab: Prefab = null;

    @property(Node)
    bullet1Position: Node = null;

    oneBulletShoot(dt: number) {
        this.shootTime += dt;
        if (this.shootTime >= this.shootRate) {
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
            this.shootTime = 0;
            const bullet1 = instantiate(this.bullet2Prefab);
            const bullet2 = instantiate(this.bullet2Prefab);
            this.bulletParent.addChild(bullet1);
            this.bulletParent.addChild(bullet2);
            bullet1.setWorldPosition(this.bullet2Position1.worldPosition);
            bullet2.setWorldPosition(this.bullet2Position2.worldPosition);
        }
    }
}


