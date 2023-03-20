import React from "react";
import "./App.css";
import { GameProvider } from "./context/game_provider";
import { Table } from "./components/table";
import { Rules } from "./components/rule";


function App() {
  return (
    <div className="App">
      <h1 className="main-title">Blackjack</h1>
      <GameProvider>
        <Rules />
        <Table />
      </GameProvider>
    </div>
  );
}

export default App;
