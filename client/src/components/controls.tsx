import React from 'react';
import { useGame } from "../context/game_provider";
import { HitGameControl } from './hitGameControl';
import StandControl from "./standControl";
import { StartGameControl } from './startGameControl';

export const Controls : React.FC = () => {
    const { stateOfGame } = useGame();

    return (
        <div>
            {stateOfGame === "new" && <StartGameControl />}
            {stateOfGame === "INPLAY" && <HitGameControl />}
            {/* stateOfGame === "INPLAY" && <InPlay controls />*/}
            {stateOfGame === ("INPLAY" || "STANDING") && <StandControl />}
            {/* stateOfGame === "BlackJack" && <BlackJack controls />*/}
            {/* stateOfGame === "Bust" && <Bust controls />*/}
        </div>
    )
}