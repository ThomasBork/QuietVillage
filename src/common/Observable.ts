import { ObservableSubscription } from "./ObservableSubscription";

export interface Observable {
    addSubscription(observer: object, callback: () => void): void;
    removeSubscription(observer: object): void;
    notify(): void;
}
export interface ObservableWith1Argument<T0> {
    addSubscription(observer: object, callback: (p0: T0) => void): void;
    removeSubscription(observer: object): void;
    notify(p0: T0): void;
}
export interface ObservableWith2Arguments<T0, T1> {
    addSubscription(observer: object, callback: (p0: T0, p1: T1) => void): void;
    removeSubscription(observer: object): void;
    notify(p0: T0, p1: T1): void;
}

export class ObservableFactory {
    private subscriptions: ObservableSubscription[] = [];

    private constructor() {}

    public static create(): Observable {
        return new ObservableFactory();
    } 
    public static createWith1Argument<T0>(): ObservableWith1Argument<T0> {
        return new ObservableFactory();
    } 
    public static createWith2Arguments<T0, T1>(): ObservableWith2Arguments<T0, T1> {
        return new ObservableFactory();
    }

    public addSubscription (observer: object, callback: (...args: any[]) => void): void {
        const subscription = new ObservableSubscription(observer, callback);
        this.subscriptions.push (subscription);
    }

    public removeSubscription (observer: object): void {
        this.subscriptions = this.subscriptions.filter(s => s.observer !== observer);
    }

    public notify (...args: any[]): void {
        this.subscriptions.forEach(subscription => subscription.callback.apply(subscription.observer, args));
    }
}