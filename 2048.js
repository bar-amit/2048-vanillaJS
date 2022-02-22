function TwoThousandFourtyEight(){
	this.board = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]];
	this.gameStatus = null;
}
TwoThousandFourtyEight.prototype.printBoard = function(){
	this.board.forEach(row => console.log(row));
}
TwoThousandFourtyEight.prototype.initialize = function(){
	var [tile1, tile2] = [
		{
			index: getRandomIndex(),
			value: getRandomTileValue()
		},
		{
			index: getRandomIndex(),
			value: getRandomTileValue()
		}];
	while (tile1.index==tile2.index) tile2.index = getRandomIndex();
	this.setTile(tile1.index, tile1.value);
	this.setTile(tile2.index, tile2.value);
}
TwoThousandFourtyEight.prototype.play = function(direction){
	if(this.status!=null) return;
	switch (direction) {
		case 'left':
		this.moveLeft();
		break;
		case 'right':
		this.moveRight();
		break;
		case 'up':
		this.moveUp();
		break;
		case 'down':
		this.moveDown();
		break;
		default:
		return;
	}
	this.addNewTile();
	this.updateGameStatus();
}
TwoThousandFourtyEight.prototype.moveLeft = function(){
	this.board = this.board.map(squeezLeft);
}
TwoThousandFourtyEight.prototype.moveRight = function(){
	this.board = this.board.map(row => squeezLeft(row.reverse()).reverse());
}
TwoThousandFourtyEight.prototype.moveUp = function(){
	for(let i=0; i<4; i++){
		let column = this.board.map(row => row[i])
		column = squeezLeft(column);
		column.forEach((tile,idx) => this.setTile(idx*4 + i, tile));
	}
}

TwoThousandFourtyEight.prototype.moveDown = function(){
	for(let i=0; i<4; i++){
		let column = this.board.map(row => row[i])
		column = squeezLeft(column.reverse()).reverse();
		column.forEach((tile,idx) => this.setTile(idx*4 + i, tile));
	}
}
TwoThousandFourtyEight.prototype.addNewTile = function(){
	var emptyTiles = this.findEmptyTiles();
	var tileIndex = getRandomIndex(emptyTiles.length-1);
	var tileValue = getRandomTileValue();

	this.setTile(emptyTiles[tileIndex], tileValue)
}
TwoThousandFourtyEight.prototype.findEmptyTiles = function(){
	var res = [];

	for(let i=0; i<4; i++)
		for(let j=0;j<4;j++)
			if(this.board[i][j]==0) res.push(i*4+j);
	return res;
}
TwoThousandFourtyEight.prototype.setTile = function(tileNumber,value){
	var row = Math.floor(tileNumber/4);
	var column = tileNumber%4;
	this.board[row][column] = value;
}
TwoThousandFourtyEight.prototype.getLegalMoves = function(){
	let isLeftMoveLegal = this.board.some(row => row[0]==0);
	let isRightMoveLegal = this.board.some(row => row[3]==0);
	let isUpMoveLegal = this.board[0].some(tile => tile==0);
	let isDownMoveLegal = this.board[3].some(tile => tile==0);

	let isHorizontalMergeable = this.board.some(isMergeable);
	let isVerticalMergeable = [0,1,2,3].some(idx =>
		isMergeable([this.board[0][idx],this.board[1][idx],this.board[2][idx],this.board[3][idx]]));

	return {
		left: isLeftMoveLegal||isHorizontalMergeable,
		right: isRightMoveLegal||isHorizontalMergeable,
		up: isUpMoveLegal||isVerticalMergeable,
		down: isDownMoveLegal||isVerticalMergeable
	};
}
TwoThousandFourtyEight.prototype.updateGameStatus = function(){
	const {left,right,up,down} = this.getLegalMoves();

	if(this.board.flat().some(tile => tile==2048)) this.gameStatus = won;
	else if(!left&&!right&&!up&&!down) this.gameStatus = lost;
}
function isMergeable(arr){
	return arr[0]==arr[1]||arr[1]==arr[2]||arr[2]==arr[3];
}
function getRandomTileValue(){
	return Math.random() <= 0.1 ? 4 : 2;
}
function getRandomIndex(max=15){
	return Math.round(Math.random()*max);
}
function squeezLeft(arr){
	var res = [];
	
	let values = arr.filter(tile => tile!=0);
	let i = 0;
	for(let j=0; j<4;j++){
		if(values[i]==values[i+1]&&i<values.length){
			res[j] = values[i]+values[i+1];
			i += 2;
		}
		else{
			res[j] = values[i] || 0;
			i++;
		}
	}
	return res;
}

module.exports = TwoThousandFourtyEight;


//////////////////////
// Tests:
//////////////////////

// // Can be imported using 'require':
// const TwoThousandFourtyEight = require('./2048.js');

// // create a game instance:
// let game = new TwoThousandFourtyEight();

// // Show the currentboard:
// game.printBoard();

// // Start the game by adding the frist to tiles:
// game.initialize();
// game.printBoard();

// // Make a move left:  ( you may choose: ['left'/'right'/'up'/'down'] )
// game.play('left');
// game.printBoard();
// game.play('right');
// game.printBoard();
// game.play('up');
// game.printBoard();
// game.play('down');
// game.printBoard();
