import { useState, useEffect } from "react";
import { useGame } from "../context/game_provider";
import { isSuccessResponse } from "../types/game-types";

export function isError(e: unknown): e is Error {
  return (e as Error).message !== undefined;
}

export function useFetchData<TResponse>(url: string) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<number>();

  const [toCallApi, setApiExecution] = useState(false);
  const { setStateOfGame, setCards, setDealerCards } = useGame();

  const execute = () => {
    console.log("executing now");
    setApiExecution(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const json = await response.json();
          if (isSuccessResponse(json)) {
            setStateOfGame(json.stateOfGame);
            setCards(json.cards);
            json.dealerCards && setDealerCards(json.dealerCards);
            setApiExecution(false);
          }
        }
        setIsFetching(false);
        setStatus(response.status);
      } catch (e: unknown) {
        if (isError(e)) {
          setError(e.message);
        }
        setIsFetching(false);
        setApiExecution(false);
      }
    };
    if (toCallApi) {
      console.log("calling api");
      fetchData();
    }
  }, [url, toCallApi]);

  return { isFetching, error, status, execute };
}
