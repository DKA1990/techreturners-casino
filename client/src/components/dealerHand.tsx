import { useGame } from "../context/game_provider";
import DisplayCard from "./DisplayCard";

export const DealerHand : React.FC = () => {
    const { dealerCards } = useGame();

    return (
        <div>
            {dealerCards.length >= 1 && <p>DealerCards</p>}
            {dealerCards.length === 1 && <img alt="dealer's card face down" src={require("../images/back_of_card.png")} className="card" />}
            {dealerCards.map((card, index) => (
                <DisplayCard key={index} card={card} />
            ))}
        </div>
    )
}