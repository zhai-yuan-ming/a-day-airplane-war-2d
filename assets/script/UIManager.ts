import { _decorator, AudioClip, Component, director, Label, Node} from 'cc';
import { GameManager } from './GameManager';
import { AudioMgr } from './AudioMgr';
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

    @property(AudioClip)
    btnMus: AudioClip = null;

    @property(Node)
    bloodUi: Node = null;

    gm: GameManager = null;

    start() {
        this.gm = GameManager.getInstance();
        this.hpNumLabel.string = this.gm.getHp().toString();
        this.scoreNumLabel.string = this.gm.getScore().toString();
        this.lvNumLabel.string = this.gm.getLv().toString();
        this.bombNumLabel.string = this.gm.getBomb().toString();
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
        AudioMgr.inst.playOneShot(this.btnMus, 1);
        this.gm.onPauseClick();
        this.pauseBtn.active = false;
        this.resumeBtn.active = true;
    }

    onResumeClick() {
        AudioMgr.inst.playOneShot(this.btnMus, 1);
        this.gm.onResumeClick();
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;
    }

    gameOver(bestScore:number, curScore:number) {
        if (this.bloodUi) this.bloodUi.active = false;
        this.refreshBestScore(bestScore, curScore);
        this.gameoverUi.active = true;
        if (bestScore < curScore) {
            bestScore = curScore;
        }
        this.bestScoreLabel.string = bestScore.toString();
        this.curScoreLabel.string = curScore.toString();
    }

    refreshBestScore(bestScore: number, curScore: number) {
        if (curScore > bestScore) {
            localStorage.setItem("bestScore", curScore.toString());
        }
    }

    onRestartClick() {
        AudioMgr.inst.playOneShot(this.btnMus, 1);
        director.loadScene(director.getScene().name);
        this.gm.onResumeClick();
    }

    onQuitClick() {
        AudioMgr.inst.playOneShot(this.btnMus, 1);
        director.loadScene("01-menu");
        this.gm.onResumeClick();
    }
}


