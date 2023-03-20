import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DealerHand } from './dealerHand';
import { GameContext, IGameContext } from '../context/game_provider';
import { GameState, Card } from '../types/game-types';

const customRender = (ui : React.ReactNode, providerProps: IGameContext) => {
    return render(
      <GameContext.Provider value={providerProps}>{ui}</GameContext.Provider>,
    )
  }
  
test("DealerHand renders the cards given to it", () => {
    const providerProps = {
        stateOfGame: "INPLAY" as GameState,
        setStateOfGame: (stateOfGame : GameState | "new") => {
          // empty function
        },
        cards: [],
        setCards: (cards : Array<Card>) => {
          // empty function
        },
        dealerCards: [
            {
                value: "ACE",
                suit: "DIAMONDS",
                pointValue: 1,
                image: "https://deckofcardsapi.com/static/img/AD.png",
              },
        ] as Array<Card>,
        setDealerCards: (cards : Array<Card>) => {
            // empty function
          },
    };
    customRender(<DealerHand />, providerProps);
    expect(screen.getByAltText(/DIAMONDS/i)).toBeInTheDocument();
})