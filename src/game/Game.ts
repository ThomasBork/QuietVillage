import { Observable, ObservableFactory } from "../common/Observable";
import { GameSystem } from "./shared/GameSystem";
import { ResourceSystem } from "./resources/ResourceSystem";
import { ResourceType } from "./resources/ResourceType";

export class Game {
    private updateFrequency: number = 100;
    private maxTimeToResumePerUpdate: number = 24 * 60 * 60 * 1000;

    private updateIntervalID: number;
    private lastUpdateAsNumber: number = Date.now();
    
    private startTimeAsNumber: number;

    public resourceSystem: ResourceSystem;

    public onUpdated: Observable = ObservableFactory.create();

    public static new(): Game {
        const game = new Game();
        game.init();
        game.start();
        return game;
    }

    private constructor () {}

    public init (): void {
        this.resourceSystem = new ResourceSystem();
        this.resourceSystem.init();

        this.resourceSystem.getResource(ResourceType.Gold).income.addAdditiveModifier(this, 2);
        this.resourceSystem.getResource(ResourceType.Wood).income.addAdditiveModifier(this, 5);
    }

    public start (): void {
        this.startTimeAsNumber = Date.now();
        this.beginUpdating();
    }

    private beginUpdating(): void {
        this.updateIntervalID = setInterval(() => {
            this.update();
        }, this.updateFrequency);
    }

    private update (): void {
        let timeSinceLastUpdate = Date.now() - this.lastUpdateAsNumber;

        // Cap catch up duration
        if (timeSinceLastUpdate > this.maxTimeToResumePerUpdate) {
            timeSinceLastUpdate = this.maxTimeToResumePerUpdate;
            this.lastUpdateAsNumber = Date.now() - this.maxTimeToResumePerUpdate;
        }

        // Update until caught up
        while (timeSinceLastUpdate > this.updateFrequency) {
            timeSinceLastUpdate -= this.updateFrequency;
            this.lastUpdateAsNumber = this.lastUpdateAsNumber + this.updateFrequency;

            this.updateGameSystems(this.updateFrequency);
        }

        this.onUpdated.notify();
    }

    private updateGameSystems (dTime: number): void {        
        this.resourceSystem.update(dTime);
    }
}