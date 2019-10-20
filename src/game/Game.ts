import { Player } from "./Player";

export class Game {
    private updateFrequency: number = 100;
    private intervalID?: number;
    public players: Player[] = [];
    constructor() {
        this.addPlayer();
        this.start();
    }

    public start (): void {
        // this.intervalID = setInterval(() => {
        //     this.update();
        // }, this.updateFrequency);
    }

    public addPlayer (): void {
        this.players.push(new Player());
    }

    private update (): void {
        console.log("Updating " + this.players.length + " players");
        this.players.forEach(player => player.incrementScore());
    }
}