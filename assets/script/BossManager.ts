import { _decorator, Component, Prefab } from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { GameManager } from './GameManager';
const { ccclass,property } = _decorator;

@ccclass('BossManager')
export class BossManager extends Component {

    createDelay: number = 3;

    private gm:GameManager = null;

    start() {
        this.gm = GameManager.getInstance();

    }

    update(deltaTime: number) {
        
    }


}


