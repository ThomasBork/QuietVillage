import * as React from "react";
import { NumberFormatter } from "../../../common/NumberFormatter";
import { Resource } from "../../../game/resources/Resource";

export class UIResource extends React.Component<{resource: Resource}> {
    render() {
        return (
            <li className="resource-line">
                <span>
                    <span className="name">{this.props.resource.name}</span>
                    <span className="increase-per-second">({NumberFormatter.Format(this.props.resource.income.value, 2, 2)}/s)</span>
                </span>
                <span>
                    <span className="amount">{NumberFormatter.Format(this.props.resource.amount, 2, 2)}</span>
                    {
                        this.props.resource.hasCap
                        ? <span> / {NumberFormatter.Format(this.props.resource.cap.value, 2, 2)}</span>
                        : null
                    }
                </span>
            </li>
        );
    }
}