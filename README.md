# Conway's game of life

### description

Conway's game of life

### instructions

```
Create a multiplayer Web app version of Game of Life, with the following functions. 

Implement the Game of Life in browser. You can use any representation such as <canvas>, simple DOM manipulation or even <table> cells. 

The game should tick automatically at a predefined interval, at say, 1 step per second.

The browser connects to an HTTP server, written in Ruby or Node.js (can be any frameworks, e.g. Ruby on Rails, Sinatra, EventMachine, Hapi or just plain listening on a socket). This server allows multiple browser to share the same, synchronized world view.

Each client is assigned a random color on initialization. From the browser, clicking on any grid will create a live cell on that grid with the client's color. This change should be synchronized across all connected clients. (You can use any mechanism to achieve this, such as polling, comet or WebSocket)

When a dead cell revives by rule #4 "Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", it will be given a color that is the average of its neighbours (that revive it).

To make the evolution more interesting, include a toolbar that places some predefined patterns at random places with the player's color, such as those found at here https://en.wikipedia.org/wiki/Conway's_Game_of_Life#Examples_of_patterns (not necessary to implement all, just 3 - 4 is fine).
```

> This server allows multiple browser to share the same, synchronized world view.
> Each client is assigned a random color on initialization. 
> From the browser, clicking on any grid will create a live cell on that grid with the client's color.
> This change should be synchronized across all connected clients.

### Todo:

- [x] move number of Cells declaration as a config (and send that information on client init)
  - [x] server
  - [x] client (__removed__)

- [ ] add patterns  

- [ ] fix pause/realtime toggle (and update game server)  
- [ ] add preview (current state) ... i.e. one window is for designing pattern, another is for showing the current state  
- [ ] add color/ random color to server game state (to generate average color)  

### how to use

```
npm i
npm run dev:server
npm run start
```

### author
Denis Tsoi <denistsoi@gmail.com>