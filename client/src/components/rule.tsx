import React from "react";

export const Rules : React.FC = () => {

    return (
        <section className="blackjack-rules">
            <h2>BlackJack Rules</h2>
            <p>
                1. Blackjack starts with the player being dealt two cards.
            </p>
            <p>
                2. All cards are considered as their face value in Blackjack. Picture cards (Jacks, Queens and Kings)
                all have a value of 10. Aces count as 11 unless the player would bust, in which case they are counted
                as 1.
            </p>
            <p>
                3. The aim of the for the player is to get their hand value to 21, or as close to 21 and possible without
                going over.
            </p>
            <p>
                4. In the case of the value of player's hand exceeding 21, they lose the game. At the moment this is
                inconsequential but they should be ashamed!
            </p>
            <img className="blackjack-rules__img" src="../../images/blackjack-card-values.png"/>
        </section>
    )
}