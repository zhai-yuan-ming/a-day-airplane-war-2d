import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameBgCtrl')
export class GameBgCtrl extends Component {

    @property(Node)
    bg01: Node = null;

    @property(Node)
    bg02: Node = null;

    @property
    public speed: number = 500;

    start() {

    }

    update(deltaTime: number) {
        let changePositionY =  this.speed * deltaTime;
        this.bg01.setPosition(this.bg01.position.x, this.bg01.position.y - changePositionY, this.bg01.position.z);
        this.bg02.setPosition(this.bg02.position.x, this.bg02.position.y - changePositionY, this.bg02.position.z);
        this.changeBg(this.bg01);
        this.changeBg(this.bg02);
    }
    
    changeBg(bg: Node) {
        if (bg.position.y <= -850) {
            bg.setPosition(bg.position.x, 850, bg.position.z);
        }
    }
}


