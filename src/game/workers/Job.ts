import { ValueContainer } from "../shared/ValueContainer";
import { ObservableFactory, ObservableWith1Argument } from "../../common/Observable";

export class Job {
    constructor (name: string, description: string, value: number) {
        this._workerCount = 0;

        this.name = name;
        this.description = description;
        this.value = new ValueContainer();
        this.value.setAdditiveModifier(this, value);
        this.onWorkerCountChange = ObservableFactory.createWith1Argument<number>();
    }
    public name: string;
    public description: string;
    public value: ValueContainer;
    public onWorkerCountChange: ObservableWith1Argument<number>;

    private _workerCount: number;
    public get workerCount(): number {
        return this._workerCount;
    }
    public set workerCount(value: number) {
        this._workerCount = value;
        this.onWorkerCountChange.notify(value);
    }
}