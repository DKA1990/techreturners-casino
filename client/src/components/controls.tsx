import React from 'react';
import { useGame } from "../context/game_provider";
import { NewGame } from './newGame';

export const Controls : React.FC = () => {
    const { stateOfGame } = useGame();

    return (
        <div>
            {stateOfGame === "new" && <NewGame />}
            {/* stateOfGame === "INPLAY" && <InPlay controls />*/}
            {/* stateOfGame === "Standing" && <Standing controls />*/}
            {/* stateOfGame === "BlackJack" && <BlackJack controls />*/}
            {/* stateOfGame === "Bust" && <Bust controls />*/}
        </div>
    )
}