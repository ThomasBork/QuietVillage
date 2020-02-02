import * as React from "react";
import * as ReactDOM from "react-dom";

import './general.scss';
import './structure.scss';

import './buildings/buildings.scss';
import './game-system-tabs/game-system-tabs.scss';
import './resources/resources.scss';
import './workers/workers.scss';

import { UIGame } from "./UIGame";

ReactDOM.render(
    <UIGame />,
    document.getElementById("game-container")
);