const squares = document.querySelectorAll('[data-square]')
const board = document.getElementById('board')
const strike = document.querySelectorAll('[strike]')
const winMessageScene = document.getElementById("winMessage")
const winMessageText = document.querySelector('[winMessageText]')
const winButton = document.getElementById('reset')
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
	xTurn = false
	squares.forEach(square => {
		square.addEventListener('click', handleClick, {once: true})
	})
	winButton.addEventListener('click', resetGame)
	setBoardHover()
}

function handleClick(e) {
	const square = e.target
	const currentClass = xTurn ? 'x' : 'o'
	placeMark(square, currentClass)

	if(checkWin(currentClass)) {
		count = 0
		switch(winningCombination) {
			case POSSIBLE_WINS[0]:
				strike[0].style.marginTop = '-31vh'
				strike[0].style.width = '450px'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[1]:
				strike[0].style.width = '450px'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[2]:
				strike[0].style.width = '450px'
				strike[0].style.marginTop = '31vh'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[3]:
				strike[0].style.transform = 'rotate(90deg)'
				strike[0].style.width = '450px'
				strike[0].style.marginLeft = '-31vh'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[4]:
				strike[0].style.transform = 'rotate(90deg)'
				strike[0].style.width = '450px'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[5]:
				strike[0].style.transform = 'rotate(90deg)'
				strike[0].style.width = '450px'
				strike[0].style.marginLeft = '31vh'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[6]:
				strike[0].style.transform = 'rotate(45deg)'
				strike[0].style.width = '640px'
				strike[0].style.opacity = 1
			break;
			case POSSIBLE_WINS[7]:
				strike[0].style.transform = 'rotate(-45deg)'
				strike[0].style.width = '640px'
				strike[0].style.opacity = 1
			break;
		}
		squares.forEach(square => {
			square.style.pointerEvents = 'none'
		})
		endGame(false)
	} else if (checkDraw()) {
		endGame(true)
	}

	swapTurn()
	setBoardHover() 
}


function endGame(isDraw) {
	if (isDraw) {
		winMessageText.innerText = 'It\'s a Draw!'
		winMessage.classList.add('show')
	} else {
		winMessageText.innerText = xTurn ? 'Crosses Wins!' : 'Noughts Wins!'
		winMessage.classList.add('show')
	}

}


function placeMark(square, currentClass) {
	square.classList.add(currentClass)
}

function swapTurn() {
	xTurn = !xTurn
}

function checkDraw() {
	return [...squares].every(square => {
		return square.classList.contains('x') || square.classList.contains('o')
	})
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

function resetGame() {
	location.reload()
}