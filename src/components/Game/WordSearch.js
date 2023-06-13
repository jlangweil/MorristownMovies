import React, { useEffect, useState } from 'react';

const WordSearch = () => {
    const gridSize = 12;
    const words = ['apple', 'grape', 'banana', 'cherry', 'pear'];

    const [grid, setGrid] = useState([]);

    // Create the grid
    useEffect(() => {
        let newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(' '));
        for (let word of words) {
            placeWordInGrid(newGrid, word);
        }
        setGrid(newGrid);
    }, []);

    const placeWordInGrid = (grid, word) => {
        let placed = false;
        while (!placed) {
            let dir = Math.floor(Math.random() * 2); // 0 for horizontal, 1 for vertical
            let startRow = Math.floor(Math.random() * gridSize);
            let startCol = Math.floor(Math.random() * gridSize);
            if (dir === 0 && startCol + word.length <= gridSize) {
                for (let i = 0; i < word.length; i++) {
                    grid[startRow][startCol + i] = word.charAt(i);
                }
                placed = true;
            } else if (dir === 1 && startRow + word.length <= gridSize) {
                for (let i = 0; i < word.length; i++) {
                    grid[startRow + i][startCol] = word.charAt(i);
                }
                placed = true;
            }
        }
    }

    return (
        <div>
            <h2>Word Search</h2>
            <div>
                {grid.map((row, i) => (
                    <div key={i}>
                        {row.map((col, j) => (
                            <span key={j} style={{ margin: "5px" }}>{col}</span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordSearch;
