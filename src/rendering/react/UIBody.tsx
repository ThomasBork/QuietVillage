import React = require("react");
import { Game } from "../../game/Game";
import { UIWorkerSystem } from "./workers/UIWorkerSystem";
import { UIBuildings } from "./buildings/UIBuildings";
import { UIResources } from "./resources/UIResources";
import { UIGameSystemTabs } from "./game-system-tabs/UIGameSystemTabs";
import { GameSystem } from "../../game/shared/GameSystem";

export class UIBody extends React.Component<{game: Game},{selectedGameSystem: GameSystem}> {
    private renderGameSystem(): JSX.Element {
        if (!this.state || !this.state.selectedGameSystem || !this.state.selectedGameSystem.isUnlocked) {
            return null;
        }

        switch(this.state.selectedGameSystem) {
            case this.props.game.buildingSystem:
                return <UIBuildings game={this.props.game}></UIBuildings>
            case this.props.game.workerSystem:
                return <UIWorkerSystem game={this.props.game}></UIWorkerSystem>
            default: 
                return null;
        }
    }
    public render(): JSX.Element {
        return (
            <div id="body">
                <span id="tabs-and-tab-content-container">
                    <UIGameSystemTabs 
                        game={this.props.game} 
                        onSelected={(system: GameSystem)=>this.setState({selectedGameSystem:system})}
                    ></UIGameSystemTabs>
                    <span id="tab-content">
                        {this.renderGameSystem()}
                    </span>
                </span>
                <UIResources game={this.props.game}></UIResources>
            </div>
        );
    }
}