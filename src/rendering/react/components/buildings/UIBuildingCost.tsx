import * as React from "react";
import { Building } from "../../../../game/buildings/Building";
import { GameContext } from "../UIGameContext";
import { NumberFormatter } from "../../../../common/NumberFormatter";

export class UIBuildingCost extends React.Component<{building: Building, onClick: () => void}> {
    public constructor (props: {building: Building, onClick: () => void}) {
        super(props);

        this.props.building.onUpdateAmount.addSubscription(
            this,
            (thisBuilding: Building) => 
                this.forceUpdate()
            );
    }
    public render(): JSX.Element {
        return (
            <GameContext.Consumer>
            {game => 
                <ul className="resources" onClick={this.props.onClick}>
                    {this.props.building.costOfNext.getAll().map(resourceValue => 
                        <li className="resource" key={resourceValue.resourceType}>
                            <span className="type">{game.resourceSystem.getResource(resourceValue.resourceType).name}</span>
                            <span className="value">{NumberFormatter.Format(resourceValue.value.value, 0, 0, true)}</span>
                        </li>
                    )}
                </ul>
            }
            </GameContext.Consumer>
        );
    }
}