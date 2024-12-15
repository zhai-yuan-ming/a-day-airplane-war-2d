import { _decorator, Component, EventTouch, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
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

    @property(Prefab)
    bullet1Prefab: Prefab = null;

    @property(Node)
    bullet1Position: Node = null;

    protected update(dt: number): void {
        this.shoot(dt);
    }

    shoot(dt: number) {
        this.shootTime += dt;
        if (this.shootTime >= this.shootRate) {
            this.shootTime = 0;
            const bullet1 = instantiate(this.bullet1Prefab);
            this.bulletParent.addChild(bullet1);
            bullet1.setWorldPosition(this.bullet1Position.worldPosition);
        }
    }
}


