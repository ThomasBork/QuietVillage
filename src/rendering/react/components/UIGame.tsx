import * as React from "react";
import { Game } from "../../../game/Game";
import { UIResources } from "./resources/UIResources";
import { UIWorkerSystem } from "./workers/UIWorkerSystem";
import { GameContext } from "./UIGameContext";
import { UIBuildings } from "./buildings/UIBuildings";
import { UIHeader } from "./structure/UIHeader";
import { UIBody } from "./structure/UIBody";

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
                <UIHeader versionNumber={'0.0.1'} onNewGameClick={()=>this.newGame()}></UIHeader>
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