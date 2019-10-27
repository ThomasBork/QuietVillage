class ValueModifier {
    public amount: number;
    public sourceObject: object;

    constructor (sourceObject: object, amount: number) {
        this.amount = amount;
        this.sourceObject = sourceObject;
    }
}

export class ValueContainer {
    private additiveModifiers: ValueModifier[] = [];
    private multiplicativeModifiers: ValueModifier[] = [];
    public value = 0;
    public recalculateValue (): void {
        let newValue = 0;
        this.additiveModifiers.forEach(mod => newValue += mod.amount);
        this.multiplicativeModifiers.forEach(mod => newValue *= mod.amount);
        this.value = newValue;
    }
    public addAdditiveModifier (sourceObject: object, amount: number) {
        const modifier = new ValueModifier(sourceObject, amount);
        this.additiveModifiers.push(modifier);
        this.recalculateValue();
    }
    public addMultiplicativeModifier (sourceObject: object, amount: number) {
        const modifier = new ValueModifier(sourceObject, amount);
        this.multiplicativeModifiers.push(modifier);
        this.recalculateValue();
    }
    public removeAllModifiers (sourceObject: object): void {
        this.additiveModifiers = this.additiveModifiers.filter(mod => mod.sourceObject !== sourceObject);
        this.multiplicativeModifiers = this.multiplicativeModifiers.filter(mod => mod.sourceObject !== sourceObject);
    }
}
