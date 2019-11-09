import { Observable, ObservableFactory } from "../../common/Observable";

export class GameSystem {
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
    public update(dTime: number): void {}
    public init(): void {}
}
