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
}


