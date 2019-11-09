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
    public name: string;
    public type: ResourceType;
    public constructor(name: string, type: ResourceType) {
        this.name = name;
        this.type = type;
    }
}