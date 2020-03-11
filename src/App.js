import React from 'react';
import './App.css';

import Game from "./components/Game"
const connection = new WebSocket("ws://localhost:3001");

function App() {
  return (
    <div className="App">
      <Game connection={connection}></Game>
    </div>
  );
}

export default App;
