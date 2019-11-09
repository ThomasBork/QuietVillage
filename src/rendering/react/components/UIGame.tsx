import * as React from "react";
import { Game } from "../../../game/Game";
import { UIResourceList } from "./resources/UIResourceList";
import { UIJobList } from "./workers/UIJobList";
import { GameContext } from "./UIGameContext";
import { UIBuildingList } from "./buildings/UIBuildingList";
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