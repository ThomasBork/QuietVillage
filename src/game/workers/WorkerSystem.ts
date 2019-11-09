import { GameSystem } from "../shared/GameSystem";
import { ObservableWith1Argument, ObservableFactory } from "../../common/Observable";
import { ResourceJob } from "./ResourceJob";
import { ResourceType } from "../resources/ResourceType";
import { Game } from "../Game";
import { Job } from "./Job";
import { ValueContainer } from "../shared/ValueContainer";

export class WorkerSystem extends GameSystem {
    private game: Game;

    public idleWorkerCount: number;
    public totalWorkerCount: ValueContainer;
    public onIdleWorkerCountChange: ObservableWith1Argument<number>;

    public gathererJob: ResourceJob;
    public woodcutterJob: ResourceJob;
    public resourceJobs: ResourceJob[];

    public jobs: Job[];

    public constructor (game: Game) {
        super();
        this.game = game;
    }

    public init(): void {
        this.totalWorkerCount = new ValueContainer();
        this.totalWorkerCount.setAdditiveModifier(this, 1);
        this.totalWorkerCount.onValueChange.addSubscription(this, _ => this.recalculateIdleWorkerCount());

        this.gathererJob = new ResourceJob("Gatherer", "Search nearby forests for berries and shrooms", 0.5, ResourceType.Food);
        this.woodcutterJob = new ResourceJob("Woodcutter", "Chop down trees for wood", 25, ResourceType.Wood);
        this.resourceJobs = [
            this.gathererJob,
            this.woodcutterJob
        ];

        this.jobs = [...this.resourceJobs];

        // Bind resource jobs to resources
        this.resourceJobs.forEach(job => {
            const resource = this.game.resourceSystem.getResource(job.resourceType);
            job.onWorkerCountChange.addSubscription(this, (workerCount: number) => {
                const resourceIncomeFromJob = workerCount * job.value.value;
                resource.income.setAdditiveModifier(job, resourceIncomeFromJob);
            });
        });

        this.onIdleWorkerCountChange = ObservableFactory.createWith1Argument<number>();
    }

    public newGame(): void {
        this.recalculateIdleWorkerCount();
    }

    public recalculateIdleWorkerCount(): void {
        let newCount = this.totalWorkerCount.value;
        this.jobs.forEach(job => newCount -= job.workerCount);
        if (this.idleWorkerCount !== newCount) {
            this.idleWorkerCount = newCount;
            this.onIdleWorkerCountChange.notify(this.idleWorkerCount);
        }
    }

    public setWorkerCountOnJob(job: Job, workerCount: number) {
        const dWorkerCount = workerCount - job.workerCount;
        if (dWorkerCount > 0) {
            if (this.idleWorkerCount >= dWorkerCount) {
                job.workerCount += dWorkerCount;
            } else {
                throw `Cannot assign ${dWorkerCount} workers - only ${this.idleWorkerCount} workers available.`;
            }
        } else {
            if (workerCount >= 0) {
                job.workerCount += dWorkerCount;
            } else {
                throw `Cannot assign a negative amount of workers to a job`;
            }
        }
        this.game.buildingSystem.isUnlocked = true;
        this.recalculateIdleWorkerCount();
    }
}