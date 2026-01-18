import { useState, useCallback } from 'react';
import { getPuzzleWords, checkCategory, getRandomPuzzle } from '../data/puzzles';

const INITIAL_STATE = {
    screen: 'home', // 'home', 'game', 'results'
    currentPuzzle: null,
    words: [],
    selectedWords: [],
    solvedCategories: [],
    mistakes: 0,
    maxMistakes: 4,
    score: 0,
    streak: 0,
    hintsUsed: 0,
    completedPuzzleIds: [],
    gameStartTime: null,
    gameEndTime: null,
};

export function useGameState() {
    const [state, setState] = useState(INITIAL_STATE);

    const startGame = useCallback((puzzle = null) => {
        const selectedPuzzle = puzzle || getRandomPuzzle(state.completedPuzzleIds);
        const words = getPuzzleWords(selectedPuzzle);

        setState(prev => ({
            ...prev,
            screen: 'game',
            currentPuzzle: selectedPuzzle,
            words,
            selectedWords: [],
            solvedCategories: [],
            mistakes: 0,
            hintsUsed: 0,
            gameStartTime: Date.now(),
            gameEndTime: null,
        }));
    }, [state.completedPuzzleIds]);

    const selectWord = useCallback((wordObj) => {
        setState(prev => {
            const isSelected = prev.selectedWords.some(w => w.word === wordObj.word);

            if (isSelected) {
                return {
                    ...prev,
                    selectedWords: prev.selectedWords.filter(w => w.word !== wordObj.word)
                };
            }

            if (prev.selectedWords.length >= 4) {
                return prev;
            }

            return {
                ...prev,
                selectedWords: [...prev.selectedWords, wordObj]
            };
        });
    }, []);

    const deselectAll = useCallback(() => {
        setState(prev => ({ ...prev, selectedWords: [] }));
    }, []);

    const shuffleWords = useCallback(() => {
        setState(prev => {
            const unsolvedWords = prev.words.filter(
                w => !prev.solvedCategories.some(cat => cat.words.includes(w.word))
            );
            const shuffled = [...unsolvedWords].sort(() => Math.random() - 0.5);
            return { ...prev, words: shuffled, selectedWords: [] };
        });
    }, []);

    const submitGuess = useCallback(() => {
        setState(prev => {
            if (prev.selectedWords.length !== 4) return prev;

            const result = checkCategory(prev.currentPuzzle, prev.selectedWords);

            if (result.correct) {
                const newSolvedCategories = [...prev.solvedCategories, result.category];
                const newWords = prev.words.filter(
                    w => !result.category.words.includes(w.word)
                );

                const isGameWon = newSolvedCategories.length === 4;
                const pointsEarned = (5 - result.category.difficulty) * 100;

                return {
                    ...prev,
                    words: newWords,
                    selectedWords: [],
                    solvedCategories: newSolvedCategories,
                    score: prev.score + pointsEarned,
                    streak: prev.streak + 1,
                    screen: isGameWon ? 'results' : 'game',
                    gameEndTime: isGameWon ? Date.now() : null,
                    completedPuzzleIds: isGameWon
                        ? [...prev.completedPuzzleIds, prev.currentPuzzle.id]
                        : prev.completedPuzzleIds,
                };
            } else {
                const newMistakes = prev.mistakes + 1;
                const isGameOver = newMistakes >= prev.maxMistakes;

                return {
                    ...prev,
                    selectedWords: [],
                    mistakes: newMistakes,
                    streak: 0,
                    screen: isGameOver ? 'results' : 'game',
                    gameEndTime: isGameOver ? Date.now() : null,
                };
            }
        });
    }, []);

    const useHint = useCallback(() => {
        setState(prev => ({
            ...prev,
            hintsUsed: prev.hintsUsed + 1,
        }));
    }, []);

    const goHome = useCallback(() => {
        setState(prev => ({
            ...prev,
            screen: 'home',
            selectedWords: [],
        }));
    }, []);

    const resetGame = useCallback(() => {
        setState(prev => ({
            ...INITIAL_STATE,
            score: prev.score,
            completedPuzzleIds: prev.completedPuzzleIds,
        }));
    }, []);

    const getGameDuration = useCallback(() => {
        if (!state.gameStartTime) return 0;
        const endTime = state.gameEndTime || Date.now();
        return Math.floor((endTime - state.gameStartTime) / 1000);
    }, [state.gameStartTime, state.gameEndTime]);

    const isGameWon = state.screen === 'results' && state.solvedCategories.length === 4;
    const isGameLost = state.screen === 'results' && state.mistakes >= state.maxMistakes;

    return {
        ...state,
        isGameWon,
        isGameLost,
        startGame,
        selectWord,
        deselectAll,
        shuffleWords,
        submitGuess,
        useHint,
        goHome,
        resetGame,
        getGameDuration,
    };
}
