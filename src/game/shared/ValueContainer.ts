import { ObservableWith1Argument, ObservableFactory } from "../../common/Observable";

class ValueModifier {
    public amount: number;
    public key: any;

    constructor (key: any, amount: number) {
        this.amount = amount;
        this.key = key;
    }
}

export class ValueContainer {
    private additiveModifiers: ValueModifier[] = [];
    private multiplicativeModifiers: ValueModifier[] = [];
    public value = 0;
    public onValueChange: ObservableWith1Argument<number> = ObservableFactory.createWith1Argument<number>();
    public constructor (baseValue?: number) {
        if (baseValue !== undefined) {
            this.setAdditiveModifier(this, baseValue);
        }
    }
    public recalculateValue (): void {
        let newValue = 0;
        this.additiveModifiers.forEach(mod => newValue += mod.amount);
        this.multiplicativeModifiers.forEach(mod => newValue *= mod.amount);
        if (this.value !== newValue) {
            this.value = newValue;
            this.onValueChange.notify(newValue);
        }
    }
    public setAdditiveModifier (key: any, amount: number) {
        const existingModifier = this.additiveModifiers.find(mod => mod.key === key);
        if (existingModifier) {
            existingModifier.amount = amount;
        } else {
            const newModifier = new ValueModifier(key, amount);
            this.additiveModifiers.push(newModifier);
        }
        this.recalculateValue();
    }
    public setMultiplicativeModifier (key: any, amount: number) {
        const existingModifier = this.multiplicativeModifiers.find(mod => mod.key === key);
        if (existingModifier) {
            existingModifier.amount = amount;
        } else {
            const newModifier = new ValueModifier(key, amount);
            this.multiplicativeModifiers.push(newModifier);
        }
        this.recalculateValue();
    }
    public removeAllModifiers (key: any): void {
        this.additiveModifiers = this.additiveModifiers.filter(mod => mod.key !== key);
        this.multiplicativeModifiers = this.multiplicativeModifiers.filter(mod => mod.key !== key);
    }
}
