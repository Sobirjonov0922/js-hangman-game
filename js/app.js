let hangmanImage = document.querySelector('.hangman-box__img'),
  wordDisplay = document.querySelector('.game-box__word-display'),
  guessesText = document.querySelector('.game-box__guesses b'),
  keyboardDiv = document.querySelector('.game-box__keyboard'),
  gameModal = document.querySelector('.game-modal'),
  playAgainBtn = document.querySelector('.game-modal__play')

let currentWord, correctLetters, wrongGuessCount
const maxGuesses = 6

const resetGame = () => {
  correctLetters = []
  wrongGuessCount = 0
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`
  keyboardDiv.querySelectorAll('button').forEach((btn) => btn.disabled = false)
  wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="game-box__word-letter"></li>`).join("")
  gameModal.classList.remove('active')
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]

  currentWord = word
  document.querySelector('.game-box__hint b').innerText = hint
  resetGame()
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? `You found the word:` : `The correct word was:`
    gameModal.querySelector('.game-modal__img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`
    gameModal.querySelector('.game-modal__title').innerText = `${isVictory ? 'Congratulations!' : 'Game Over!'}`
    gameModal.querySelector('.game-modal__txt').innerHTML = `${modalText} <b>${currentWord}</b>`
    gameModal.classList.add('active')
  }, 300)
}

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, idx) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter)
        wordDisplay.querySelectorAll('li')[idx].innerText = letter
        wordDisplay.querySelectorAll('li')[idx].classList.add("guessed")
      }
    })
  } else {
    wrongGuessCount++
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
  }

  button.disabled = true
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`

  if (wrongGuessCount === maxGuesses) return gameOver(false)
  if (correctLetters.length === currentWord.length) return gameOver(true)
}

for (let i = 97; i <= 122; i++) {
  const btn = document.createElement('button')

  btn.innerText = String.fromCharCode(i)
  keyboardDiv.append(btn)
  btn.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener('click', getRandomWord)