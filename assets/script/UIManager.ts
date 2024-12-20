import { _decorator, Component, Label, Node} from 'cc';
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

    @property(Label)
    lvNumLabel: Label = null;

    @property(Node)
    pauseBtn: Node = null;

    @property(Node)
    resumeBtn: Node = null;

    @property(Node)
    gameoverUi: Node = null;

    @property(Label)
    bestScoreLabel: Label = null;

    @property(Label)
    curScoreLabel: Label = null;

    gm: GameManager = null;

    start() {
        this.gm = GameManager.getInstance();
        this.hpNumLabel.string = this.gm.getHp().toString();
        this.scoreNumLabel.string = this.gm.getScore().toString();
        this.lvNumLabel.string = this.gm.getLv().toString();
        this.gm.node.on("changeBomb", this.changeBomb, this);
        this.gm.node.on("changeHp", this.changeHp, this);
        this.gm.node.on("changeScore", this.changeScore, this);
        this.gm.node.on("changeLv", this.changeLv, this);
        this.gm.node.on("gameOver", this.gameOver, this);
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

    changeLv() {
        this.lvNumLabel.string = this.gm.getLv().toString();
    }

    onPauseClick() {
        this.gm.onPauseClick();
        this.pauseBtn.active = false;
        this.resumeBtn.active = true;
    }

    onResumeClick() {
        this.gm.onResumeClick();
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;
    }

    gameOver(bestScore:number, curScore:number) {
        this.gameoverUi.active = true;
        this.bestScoreLabel.string = bestScore.toString();
        this.curScoreLabel.string = curScore.toString();
    }
}


