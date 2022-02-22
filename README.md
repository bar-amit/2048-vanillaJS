# 2048-vanillaJS

A node module for [playing 2048](https://play2048.co/).

Go also to [this repository](https://github.com/bar-amit/2048-react/), where I have built a full react app using a similar module.

* Can be imported using 'require':
```
const TwoThousandFourtyEight = require('./2048.js');
```
* create a game instance:
```
let game = new TwoThousandFourtyEight();
```

* Show the currentboard:
```
game.printBoard(); // console.log: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
```

* Start the game by adding the frist to tiles:
```
game.initialize();
game.printBoard();
```

* Make a move left:  ( you may choose: 'left' or 'right' or 'up' or 'down' )
```
game.play('left');
game.printBoard();
game.play('right');
game.printBoard();
game.play('up');
game.printBoard();
game.play('down');
game.printBoard();
```
