import { _decorator, AudioClip, Component, director, Node } from 'cc';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {

    @property(AudioClip)
    btnMus: AudioClip = null;
    
    start() {

    }

    update(deltaTime: number) {
        
    }

    public startGame() {
        AudioMgr.inst.playOneShot(this.btnMus, 1);
        director.loadScene("02-game");
    }
}


