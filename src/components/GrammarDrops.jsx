import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomGrammarQuestions } from '../data/grammarQuestions';
import confetti from 'canvas-confetti';
import './GrammarDrops.css';

const QUESTIONS_PER_ROUND = 8;

function GrammarDrops({ onBack }) {
    const [gameState, setGameState] = useState('menu'); // menu, playing, results
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const currentQuestion = questions[currentIndex];

    const startGame = () => {
        const newQuestions = getRandomGrammarQuestions(QUESTIONS_PER_ROUND);
        setQuestions(newQuestions);
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowExplanation(false);
        setGameState('playing');
    };

    const handleAnswer = useCallback((answer) => {
        if (showResult) return;

        setSelectedAnswer(answer);
        setShowResult(true);

        const isCorrect = answer === currentQuestion?.correct;

        if (isCorrect) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#34C759', '#00C853']
            });

            // Auto-advance on correct
            setTimeout(() => {
                goToNext();
            }, 1200);
        } else {
            // Show explanation on wrong
            setShowExplanation(true);
        }
    }, [showResult, currentQuestion]);

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setShowExplanation(false);
        } else {
            setGameState('results');
            if (score >= 6) {
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            }
        }
    };

    return (
        <div className="gd-container">
            {/* Header */}
            <header className="gd-header">
                <button className="gd-back-btn" onClick={onBack}>←</button>
                <h1 className="gd-title">📰 Grammar Drops</h1>
                {gameState === 'playing' && (
                    <div className="gd-progress">{currentIndex + 1}/{questions.length}</div>
                )}
            </header>

            {/* Menu Screen */}
            {gameState === 'menu' && (
                <div className="gd-menu">
                    <div className="gd-icon">📰</div>
                    <h2>NYT-Style Grammar</h2>
                    <p>Choose the correct word or punctuation to complete each sentence.</p>
                    <ul className="gd-rules">
                        <li>📝 SAT-style questions</li>
                        <li>💡 Explanations for wrong answers</li>
                        <li>🎯 {QUESTIONS_PER_ROUND} questions per round</li>
                    </ul>
                    <button className="gd-start-btn" onClick={startGame}>
                        Start Quiz
                    </button>
                </div>
            )}

            {/* Game Screen */}
            {gameState === 'playing' && currentQuestion && (
                <div className="gd-game">
                    {/* Category Badge */}
                    <div className="gd-category">{currentQuestion.category}</div>

                    {/* Question Card */}
                    <div className="gd-question-card">
                        <p className="gd-sentence">
                            {currentQuestion.sentence.split('_').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className={`gd-blank ${showResult ? (selectedAnswer === currentQuestion.correct ? 'correct' : 'wrong') : ''}`}>
                                            {showResult ? (selectedAnswer || currentQuestion.correct) : '______'}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="gd-options">
                        {currentQuestion.options.map((option, index) => {
                            let optionClass = '';
                            if (showResult) {
                                if (option === currentQuestion.correct) optionClass = 'correct';
                                else if (option === selectedAnswer) optionClass = 'wrong';
                            }

                            return (
                                <motion.button
                                    key={option}
                                    className={`gd-option ${optionClass}`}
                                    onClick={() => handleAnswer(option)}
                                    disabled={showResult}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {option}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Explanation (on wrong answer) */}
                    <AnimatePresence>
                        {showExplanation && (
                            <motion.div
                                className="gd-explanation"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="gd-explanation-header">
                                    <span className="wrong-icon">❌</span>
                                    <strong>Correct Answer: {currentQuestion.correct}</strong>
                                </div>
                                <p className="gd-explanation-text">{currentQuestion.explanation}</p>
                                <button className="gd-next-btn" onClick={goToNext}>
                                    {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Results Screen */}
            {gameState === 'results' && (
                <motion.div
                    className="gd-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="gd-result-icon">
                        {score >= 7 ? '🏆' : score >= 5 ? '⭐' : '📚'}
                    </div>
                    <h2>
                        {score >= 7 ? 'Grammar Master!' : score >= 5 ? 'Great Job!' : 'Keep Learning!'}
                    </h2>
                    <div className="gd-final-score">
                        <span className="score-number">{score}</span>
                        <span className="score-divider">/</span>
                        <span className="score-total">{questions.length}</span>
                    </div>
                    <p className="gd-score-message">
                        {score >= 7
                            ? "You're ready for the SAT!"
                            : score >= 5
                                ? "Good progress! Review the Word Bank for tips."
                                : "Visit the Word Bank to study grammar rules."}
                    </p>
                    <div className="gd-result-buttons">
                        <button className="gd-btn-secondary" onClick={onBack}>Home</button>
                        <button className="gd-btn-primary" onClick={startGame}>Play Again</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default GrammarDrops;
