import React = require("react");
import { GameSystem } from "../../../game/shared/GameSystem";

export class UIGameSystemTab extends React.Component<{gameSystem: GameSystem, isSelected: boolean, onSelected: () => void}> {
    public render(): JSX.Element {
        return (
            <li className={`tab ${this.props.isSelected ? 'selected' : ''}`} onClick={this.props.onSelected}>
                <img src={`./img/tabs/${this.props.gameSystem.name.toLocaleLowerCase()}.png`}/>
                <span>{this.props.gameSystem.name}</span>
            </li>
        );
    }
}
