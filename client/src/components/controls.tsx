import React from 'react';
import { useGame } from "../context/game_provider";
// import { BustControl } from './bustControl';
import { EndOfGameControl } from './endOfGameControl';
import { HitGameControl } from './hitGameControl';
import StandControl from "./standControl";
import { StartGameControl } from './startGameControl';

export const Controls : React.FC = () => {
    const { stateOfGame } = useGame();

    return (
        <div className="controls">
            {stateOfGame === "new" && <StartGameControl />}
            {stateOfGame === "INPLAY" && <HitGameControl />}
            {stateOfGame === ("INPLAY" || "STANDING") && <StandControl />}
            {stateOfGame !== "new" && stateOfGame !== "INPLAY" && <EndOfGameControl />}
        </div>
    )
}