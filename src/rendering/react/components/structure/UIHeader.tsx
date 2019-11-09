import React = require("react");

export class UIHeader extends React.Component<{versionNumber: string, onNewGameClick: () => void}> {
    public render(): JSX.Element {
        return (
            <div id="header">
                <span className="title-container">
                    <span className="title">Quiet Village</span>
                    <span className="version-number">v{this.props.versionNumber}</span>
                </span>
                <span className="button btn-new-game" onClick={this.props.onNewGameClick}>New game</span>
            </div>
        );
    }
}