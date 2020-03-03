import React from 'react';
import './App.css';

import Game from "./components/Game"
const connection = new WebSocket("ws://localhost:3001");

function App() {
  connection.onopen = (event) => {
    // console.log("WebSocket is open now.");
  };

  connection.onclose = (event) => {
    // console.log("WebSocket is closed now.");
  };

  connection.onerror = (event) => {
    // console.error("WebSocket error observed:", event);
  };

  return (
    <div className="App">
      <Game connection={connection}></Game>
    </div>
  );
}

export default App;
