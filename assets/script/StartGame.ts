import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public startGame() {
        director.loadScene("02-game");
    }
}


