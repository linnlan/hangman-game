import { HangmanDrawing } from "./components/HangmanDrawing"
import { HangmanWord } from "./components/HangmanWord"
import { Keyboard } from "./components/Keyboard/Keyboard"
import words from "./assets/wordList.json"
import { useState, useEffect, useCallback } from "react";

function getWord() {
  return words[Math.floor(Math.random()*words.length)]
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const correctLetters = guessedLetters.filter(letter => wordToGuess.includes(letter))
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetters = useCallback(
    (letter: string) => {
      if(guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
  [guessedLetters, isWinner, isLoser])

  useEffect(()=>{
    const handler = (e:KeyboardEvent) => {
      const key = e.key
      if(!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetters(key)
    }
    document.addEventListener("keypress",handler)
    return () => {
      document.removeEventListener("keypress",handler)
    }
  },[guessedLetters])

  useEffect(()=>{
    const handler = (e:KeyboardEvent) => {
      const key = e.key
      if(key!== "Enter") return;

      e.preventDefault();
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress",handler)
    return () => {
      document.removeEventListener("keypress",handler)
    }
  },[])

  return (
    <div
      style = {{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}>
      
      <div style={{fontSize: "2rem", textAlign: "center"}}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfIncorrectGuesses = {incorrectLetters.length} />
      <HangmanWord
        reveal = {isLoser}
        guessedLetters = {guessedLetters}
        wordToGuess = {wordToGuess}
      />
      <div style={{alignSelf: "stretch"}}>
      <Keyboard
        disabled = {isWinner || isLoser}
        activeLetters={correctLetters}
        inactiveLetters={incorrectLetters}
        addGuessedLetters={addGuessedLetters}
      />
      </div>
    </div>
  )
}

export default App
