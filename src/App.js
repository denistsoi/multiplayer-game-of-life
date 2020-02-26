import React from 'react';
import './App.css';

import Game from "./components/Game"
const connection = new WebSocket("ws://localhost:3001");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game connection={connection}></Game>
      </header>
    </div>
  );
}

export default App;
