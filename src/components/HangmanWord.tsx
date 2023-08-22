interface HangmanWordProps {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}

export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps){
    return (
        <div
            style={{
                display: "flex",
                gap: ".25em",
                fontSize: "6rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "monospace"
            }}
        >
        {wordToGuess.split("").map((letter,index)=> (
            <span style={{ borderBottom: ".1em solid black"  }} key={index}>
                <span
                    style={{
                        color: !guessedLetters.includes(letter) && reveal ? "red" : "black",
                        visibility: 
                            guessedLetters.includes(letter) || reveal? "visible" : "hidden"
                    }}
                >
                    {letter}
                </span>
            </span>
        ))}
        </div>
    )
}