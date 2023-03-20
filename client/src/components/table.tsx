import React from "react";
import { Controls } from "./controls";
import { DealerHand } from "./dealerHand";
import PlayerHand from "./playerHand"

export const Table: React.FC = () => {
  return (
    <main className="table">
      <DealerHand />
      <Controls />
      <PlayerHand />
    </main>
  );
};
