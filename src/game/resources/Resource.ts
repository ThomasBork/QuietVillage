import { ValueContainer } from "../shared/ValueContainer";
import { ResourceType } from "./ResourceType";
import { Observable, ObservableFactory } from "../../common/Observable";

export class Resource {
    private _isUnlocked: boolean = false;
    public get isUnlocked(): boolean { return this._isUnlocked; };
    public set isUnlocked(value) { 
        if (this._isUnlocked !== value) {
            this._isUnlocked = value;
            if (value) {
                this.onUnlocked.notify();
            }
        }
    };
    public onUnlocked: Observable = ObservableFactory.create();
    public amount: number = 0;
    public income: ValueContainer = new ValueContainer();
    public cap: ValueContainer = new ValueContainer();
    public hasCap: boolean;
    public name: string;
    public type: ResourceType;
    public constructor(name: string, type: ResourceType, initialCap?: number) {
        this.name = name;
        this.type = type;
        if (initialCap === undefined) {
            this.hasCap = false;
        } else {
            this.hasCap = true;
            this.cap.setAdditiveModifier(this, initialCap);
        }
    }

    public respectCap(): void {
        if (this.hasCap && this.amount > this.cap.value) {
            this.amount = this.cap.value;
        }
    }
}