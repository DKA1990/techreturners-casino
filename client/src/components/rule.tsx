import React, { useState } from "react";
import AppButton from "./AppButton";

export const Rules: React.FC = () => {
  const [showRules, setShowRules] = useState(false);

  const handleRules = () => {
    showRules ? setShowRules(false) : setShowRules(true);
  };

  return (
    <section className="blackjack-rules">
      <button className="secondary-button" onClick={handleRules}>
        {showRules ? "Hide Rules" : "Show Rules"}
      </button>
      {showRules && (
        <>
          <h2>BlackJack Rules</h2>
          <p className="rules-step">1. Blackjack starts with the player being dealt two cards.</p>
          <p className="rules-step">
            2. All cards are considered as their face value in Blackjack.
            Picture cards (Jacks, Queens and Kings) all have a value of 10. Aces
            count as 11 unless the player would bust, in which case they are
            counted as 1.
          </p>
          <p className="rules-step">
            3. The aim of the for the player is to get their hand value to 21,
            or as close to 21 and possible without going over. An intial hand
            of 21 is considered "Blackjack" and results in an instant win, or
            draw in the case of a dealer also having blackjack.
          </p>
          <p className="rules-step">
            4. During play the player has two choices. "Hit" deals the player
            a new card to be added to their hand. "Stand" lets the player
            keep their current hand.
          </p>
          <p className="rules-step">
            5. In the case of the value of player's hand exceeding 21, they are
            considered bust and lose the game.
          </p>
          <p className="rules-step">
            6. After a player stands the dealers hand is then revealed and resolved. 
            If the dealers hand goes above 21 the dealer is considered bust and 
            the player wins. If neither player or dealer are bust, the hand with 
            the highest value is the winner. Hands being the same value results in 
            a draw.
          </p>
          <img
            className="blackjack-rules__img"
            src={require("../images/blackjack-card-values.png")}
            alt="A table with three rows and two columns, describing the scoring
                 for a game of Blackjack. The first row is images of Jack,
                 Queen, and King cards, accompanied by the text 'COUNT AS 10'.
                 The second row is an image of an Ace card, accompanied by the
                 text '1 OR 11'. The third row is an image of the cards numbered
                 Two to Ten, accompanied by the text 'FACE VALUE'."
          />
        </>
      )}
    </section>
  );
};
