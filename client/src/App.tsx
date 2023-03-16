import React from "react";
import "./App.css";
import { GameProvider } from "./context/game_provider";
import { Table } from "./components/table";


function App() {
  return (
    <div className="App">
      <h1 className="main-title">TechReturners Casino</h1>
      <GameProvider>
        <Table />
      </GameProvider>
    </div>
  );
}

export default App;
