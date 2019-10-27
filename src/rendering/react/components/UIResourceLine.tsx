import * as React from "react";
import { NumberFormatter } from "../../../common/NumberFormatter";

export class UIResourceLine extends React.Component<{name: string, amount: number}> {
    constructor (props: {name: string, amount: number}) {
        super(props);
    }
    render() {
        return (
            <li>{this.props.name} - {NumberFormatter.Format(this.props.amount, 2, 2)}</li>
        );
    }
}