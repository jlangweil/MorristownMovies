import React, { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './Wordle.css';
//import _ from 'lodash'; 


const Wordle = () => {
    const [guess, setGuess] = useState(Array(5).fill(''));
    const [guesses, setGuesses] = useState(Array(6).fill().map(() => Array(5).fill('')));
    const [letterStatuses, setLetterStatuses] = useState(Array(6).fill().map(() => Array(5).fill('incorrect')));
    const [gameStatus, setGameStatus] = useState('ongoing');
    const [dictionary, setDictionary] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [secretFrequency, setSecretFrequency] = useState({}); // New state variable
    const inputRefs = Array(6).fill().map(() => Array(5).fill().map(() => createRef()));
    const [secretWord, setSecretWord] = useState(null);
    const [guessRevealed, setGuessRevealed] = useState(true);
    const currentRow = guesses.filter(row => row.join('') !== '').length;

    useEffect(() => {
        fetch('/dict.txt').then(response => response.text()).then(dictText => {
            const words = dictText.split('\n').map(word => word.toLowerCase().trim());
            setDictionary(words);
    
            axios.get(`${process.env.REACT_APP_API_URL}/games`, {
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                }})
                .then(response => {
                    if (response.data && response.data.select_wordle_word) {
                        const secretWord = response.data.select_wordle_word;
                        setSecretWord(secretWord);
                        
                        const secretFrequency = secretWord.split('').reduce((acc, letter) => {
                            acc[letter] = (acc[letter] || 0) + 1;
                            return acc;
                        }, {});
                        setSecretFrequency(secretFrequency);
                    }
                })
                .catch(error => console.error(error));
        });
        inputRefs[0][0].current.focus();
    }, []);
    

    useEffect(() => {
        if (gameStatus === 'ongoing' && currentRow < 6) {
            inputRefs[currentRow][0].current.focus();
        }
    }, [currentRow, gameStatus]);

    const handleChange = (row, col, event) => {
        const newGuess = [...guess];
        newGuess[col] = event.target.value;
        setGuess(newGuess);

        if (event.target.value && col < 4) {
            inputRefs[row][col + 1].current.focus();
        }
    }

    const handleKeyDown = (row, col, event) => {
         if (event.key === 'Backspace') {
            const newGuess = [...guess];
            newGuess[col] = '';

            setGuess(newGuess);
            if (col > 0) {
                inputRefs[row][col].current.value='';
                inputRefs[row][col - 1].current.focus();
            }
        } 
        else if (event.key === 'Enter' && guessRevealed) {
            submitGuess();
        }
    }

     const submitGuess = () => {
        const guessWord = guess.join('').toLowerCase();
        if (guessWord.length !== 5 || !dictionary.includes(guessWord)) {
            setModalMessage('Please enter a valid 5-letter English word');
            setIsModalOpen(true);
            return;
        }
    
        const newGuesses = [...guesses];
        const currentRow = guesses.filter(row => row.join('') !== '').length;
        newGuesses[currentRow] = guess;
        setGuesses(newGuesses);
    
        // Check letter statuses
        const newLetterStatuses = [...letterStatuses];
    
        const guessFrequency = guessWord.split('').reduce((acc, letter) => {
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {});
    
        const secretFrequency = secretWord.split('').reduce((acc, letter) => {
            acc[letter] = (acc[letter] || 0) + 1;
            return acc;
        }, {});
    
        newLetterStatuses[currentRow] = guessWord.split('').map((char, index) => {
            if (char === secretWord[index]) {
                guessFrequency[char] -= 1;
                secretFrequency[char] -= 1;
                return 'correct';
            }
        });
    
        newLetterStatuses[currentRow] = guessWord.split('').map((char, index) => {
            if (newLetterStatuses[currentRow][index] !== 'correct' && secretFrequency[char] > 0) {
                secretFrequency[char] -= 1;
                guessFrequency[char] -= 1;
                return 'misplaced';
            } else if (newLetterStatuses[currentRow][index] !== 'correct') {
                return 'incorrect';
            } else {
                return 'correct';
            }
        });
    
        setLetterStatuses(newLetterStatuses);
    
        if (guessWord === secretWord) {
            setGameStatus('won');
            setTimeout(()=> {
                setModalMessage('Great job!');
                setIsModalOpen(true);
            }, 2600);
        } else if (currentRow >= 5) {
            setGameStatus('lost');
            setTimeout(()=> {
                setModalMessage('Too bad! :(');
                setIsModalOpen(true);
            }, 2600);
        } else {
            setGuessRevealed(false);
            setTimeout(() => {
                setGuess(Array(5).fill(''));
                setGuessRevealed(true);
            }, 2600);
        }
    }
    
    
    

    const getBackgroundColor = (row, col) => {
        if (row === currentRow) {
            return '#FFF';
        } else if (row > currentRow) {
            return '#777';
        }
    
        switch (letterStatuses[row][col]) {
            case 'correct':
                return '#0F0';  // green color for letters in the correct position
            case 'misplaced':
                return '#FF0';  // yellow color for letters in the word but not in the correct position
            default:
                return '#777';  // gray color for letters not in the word
        }
    }
    
    return (
        <div className="wordle-container">
            <h1>Hollywordle</h1>
            {Array(6).fill().map((_, rowIndex) => (
                <div className="wordle-board" key={rowIndex}>
                    {Array(5).fill().map((_, colIndex) => (
                        <input 
                        key={colIndex}
                        style={{ 
                            textTransform: 'uppercase', 
                            backgroundColor: getBackgroundColor(rowIndex, colIndex),
                            transitionDelay: getBackgroundColor(rowIndex, colIndex) !== '#FFF' ? `${colIndex * 0.5}s` : '2.5s',
                        }}
                        ref={inputRefs[rowIndex][colIndex]}
                        type="text"
                        maxLength="1"
                        className="wordle-square"
                        onChange={(event) => rowIndex === currentRow && handleChange(rowIndex, colIndex, event)}
                        onKeyDown={(event) => rowIndex === currentRow && handleKeyDown(rowIndex, colIndex, event)}
                        disabled={rowIndex !== currentRow || gameStatus !== 'ongoing'}
                    />
                    ))}
                </div>
            ))}
            {isModalOpen && <Modal message={modalMessage} handleClose={() => setIsModalOpen(false)} />}
            <button className="wordle-submit-button" onClick={submitGuess} disabled={!guessRevealed}>Submit</button>
        </div>
    );
}

export default Wordle;
