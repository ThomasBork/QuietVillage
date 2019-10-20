export class Player {
    public score: number = 5;
    public incrementScore() {
        this.score++;
        if (this.score > 10) {
            this.score = 0;
        }
    }
}