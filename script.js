const squares = document.querySelectorAll('[data-square]')
const board = document.getElementById('board')
const strikethrough = document.getElementById('strikethrough')
let winningCombination

const POSSIBLE_WINS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

startGame()

function startGame() {
	xTurn = true
	squares.forEach(square => {
		square.addEventListener('click', handleClick, {once: true})
	})
	setBoardHover()
}

function handleClick(e) {
	const square = e.target
	const currentClass = xTurn ? 'x' : 'o'
	placeMark(square, currentClass)

	if(checkWin(currentClass)) {
		console.log('win')

		switch(winningCombination) {
			case POSSIBLE_WINS[0]:
				strikethrough.top = 97;
				strikethrough.left = 58;
				strikethrough.width = 285;
				strikethrough.show()
				break;
		}

	}

	swapTurn()
	setBoardHover() 
}


function placeMark(square, currentClass) {
	square.classList.add(currentClass)
}

function swapTurn() {
	xTurn = !xTurn
}

function setBoardHover() {
	board.classList.remove('x')
	board.classList.remove('o')

	if (xTurn) {
		board.classList.add('x')
	} else {
		board.classList.add('o')
	}
}

function checkWin(currentClass) {
	return POSSIBLE_WINS.some(combination => {
		return combination.every(index => {
			winningCombination = combination
			return squares[index].classList.contains(currentClass)
		}) 
	})

}