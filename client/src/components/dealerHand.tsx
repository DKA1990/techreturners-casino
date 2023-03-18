import { useGame } from "../context/game_provider";
import DisplayCard from "./DisplayCard";

export const DealerHand : React.FC = () => {
    const { dealerCards } = useGame();

    return (
        <div>
            {dealerCards.length >= 1 && <p>DealerCards</p>}
            {dealerCards.map((card, index) => (
            <DisplayCard key={index} card={card} />
            ))}
        </div>
    )
}