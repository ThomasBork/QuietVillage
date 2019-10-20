import * as React from "react";
import * as ReactDOM from "react-dom";

import { UIGame } from "./components/UIGame";
import { Game } from "../../game/Game";
let game = new Game();
game.addPlayer();

ReactDOM.render(
    <UIGame game={game} />,
    document.getElementById("game-container")
);