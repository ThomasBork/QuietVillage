import { Observable, ObservableFactory } from "../common/Observable";
import { ResourceSystem } from "./resources/ResourceSystem";
import { WorkerSystem } from "./workers/WorkerSystem";
import { BuildingSystem } from "./buildings/BuildingSystem";

export class Game {
    private updateFrequency: number = 100;
    private maxTimeToResumePerUpdate: number = 24 * 60 * 60 * 1000;

    private updateIntervalID: number;
    private lastUpdateAsNumber: number = Date.now();
    
    private startTimeAsNumber: number;

    public buildingSystem: BuildingSystem;
    public resourceSystem: ResourceSystem;
    public workerSystem: WorkerSystem;

    public onUpdate: Observable = ObservableFactory.create();

    public static new(): Game {
        const game = new Game();
        game.init();
        game.startNewGame();
        return game;
    }

    private constructor () {}

    public init (): void {
        this.buildingSystem = new BuildingSystem(this);
        this.buildingSystem.init();

        this.resourceSystem = new ResourceSystem();
        this.resourceSystem.init();

        this.workerSystem = new WorkerSystem(this);
        this.workerSystem.init();
    }

    public startNewGame (): void {
        this.startTimeAsNumber = Date.now();
        this.workerSystem.newGame();
        this.refreshSystemsIsUnlocked();
        this.resourceSystem.refreshResourcesIsUnlocked();
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

        this.onUpdate.notify();
    }

    private updateGameSystems (dTime: number): void {        
        this.resourceSystem.update(dTime);
        this.buildingSystem.update(dTime);
    }

    private refreshSystemsIsUnlocked() {
        this.workerSystem.isUnlocked = true;
        this.resourceSystem.isUnlocked = true;
        this.buildingSystem.isUnlocked = this.workerSystem.totalWorkerCount.value > 1 || this.workerSystem.idleWorkerCount === 0;
    }
}