import React from 'react';
import { useGame } from "../context/game_provider";
import { StartGameControl } from './startGameControl';

export const Controls : React.FC = () => {
    const { stateOfGame } = useGame();

    return (
        <div>
            {stateOfGame === "new" && <StartGameControl />}
            {/* stateOfGame === "INPLAY" && <InPlay controls />*/}
            {/* stateOfGame === "Standing" && <Standing controls />*/}
            {/* stateOfGame === "BlackJack" && <BlackJack controls />*/}
            {/* stateOfGame === "Bust" && <Bust controls />*/}
        </div>
    )
}