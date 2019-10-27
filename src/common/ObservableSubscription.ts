export class ObservableSubscription {
    public observer: object;
    public callback: (...args: any[]) => void;
    public constructor (observer: object, callback: (...args: any[]) => void) {
        this.observer = observer;
        this.callback = callback;
    }
}