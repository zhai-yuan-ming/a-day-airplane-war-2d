import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    @property(Label)
    bombNumLabel: Label = null;

    @property(Label)
    hpNumLabel: Label = null;

    @property(Label)
    scoreNumLabel: Label = null;

    gm: GameManager = null;

    start() {
        this.gm = GameManager.getInstance();
        this.hpNumLabel.string = this.gm.getHp().toString();
        this.scoreNumLabel.string = this.gm.getScore().toString();
        this.gm.node.on("changeBomb", this.changeBomb, this);
        this.gm.node.on("changeHp", this.changeHp, this);
        this.gm.node.on("changeScore", this.changeScore, this);
    }

    update(deltaTime: number) {
        
    }

    changeBomb() {
        this.bombNumLabel.string = this.gm.getBomb().toString();
    }

    changeHp() {
        this.hpNumLabel.string = this.gm.getHp().toString();
    }

    changeScore() {
        this.scoreNumLabel.string = this.gm.getScore().toString();
    }
}


