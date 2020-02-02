import * as React from "react";
import { Game } from "../../game/Game";
import { GameContext } from "./UIGameContext";
import { UIHeader } from "./UIHeader";
import { UIBody } from "./UIBody";

export class UIGame extends React.Component<{}, {game: Game}> {
    constructor (props: {game: Game}) {
        super(props);

        this.state = {game: null};
    }
    newGame() {
        const newGame = Game.new();
        newGame.buildingSystem.onUnlocked.addSubscription(this, () => this.forceUpdate());
        this.setState({game: newGame});
    }
    render() {
        return (
            <div>
                <UIHeader versionNumber={'0.0.2'} onNewGameClick={()=>this.newGame()}></UIHeader>
                {
                    this.state.game
                    ? 
                    <GameContext.Provider value={this.state.game}>
                        <UIBody game={this.state.game}></UIBody>
                    </GameContext.Provider>
                    : null
                }
            </div>
        );
    }
}