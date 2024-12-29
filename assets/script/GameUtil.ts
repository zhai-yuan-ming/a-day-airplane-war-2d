import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

export class GameUtil {
    private static _inst: GameUtil;
    public static get inst(): GameUtil {
        if (this._inst == null) {
            this._inst = new GameUtil();
        }
        return this._inst;
    }
    
    /**
     * 根据指定的概率计算随机结果
     * @param arr1 值数组
     * @param arr2 概率数组
     * @returns 根据概率选出的值
     */
    public randomRage(arr1: Prefab[], arr2: number[]): Prefab {
        const totalProbability = arr2.reduce((sum, current) => sum + current, 0); // 计算总概率
        const randomValue = Math.random() * totalProbability; // 生成[0, totalProbability]的随机数
    
        let cumulativeProbability = 0;
        for (let i = 0; i < arr2.length; i++) {
            cumulativeProbability += arr2[i];
            if (randomValue <= cumulativeProbability) {
                return arr1[i];
            }
        }
        return null; // 未命中任何值的兜底处理
    }

    // 获取角度
    public getAngle(target: Node, node: Node): number {
        let y = target.worldPosition.y - node.worldPosition.y;
        let x = target.worldPosition.x - node.worldPosition.x;
        let radian = Math.atan2(y, x);
        let angle = this.radianToAngle(radian);
        if (angle >= 360) {
            angle -= 360;
        }
        if (angle < 0) {
            angle += 360;
        }
        return angle;
    }

    // 弧度转角度
    public radianToAngle(radian: number): number {
        return 360 * radian/(2 * Math.PI);
    }

    // 角度转弧度
    public angleToRadian(angle: number): number {
        return angle * 2 * Math.PI / 360;
    }
}


