import React = require("react");
import { Game } from "../../../../game/Game";
import { UIJobList } from "../workers/UIJobList";
import { UIBuildingList } from "../buildings/UIBuildingList";
import { UIResourceList } from "../resources/UIResourceList";

export class UIBody extends React.Component<{game: Game}> {
    public render(): JSX.Element {
        return (
            <div id="body">
                <span>
                    <UIJobList game={this.props.game}></UIJobList>
                    {
                        this.props.game.buildingSystem.isUnlocked 
                        ? <UIBuildingList game={this.props.game}></UIBuildingList> 
                        : null 
                    }
                </span>
                <UIResourceList game={this.props.game}></UIResourceList>
            </div>
        );
    }
}