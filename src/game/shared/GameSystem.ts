export interface GameSystem {
    update(dTime: number): void;
    init(): void;
}
