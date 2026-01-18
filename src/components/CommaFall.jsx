import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomPunctuationQuestions } from '../data/punctuationQuestions';
import confetti from 'canvas-confetti';
import './CommaFall.css';

const GAME_DURATION = 60; // Total game time in seconds
const FALL_DURATION = 6; // Slower - 6 seconds to fall
const READ_TIME = 3; // 3 seconds to read before falling starts

// Falling punctuation box component
function FallingPunctuation({ mark, x, delay, onClick, id }) {
    return (
        <motion.button
            className="falling-punct"
            onClick={() => onClick(mark, id)}
            style={{ left: `${x}%` }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: '100vh', opacity: 1 }}
            transition={{
                y: { duration: FALL_DURATION, ease: "linear", delay },
                opacity: { duration: 0.3, delay }
            }}
            whileTap={{ scale: 1.2 }}
        >
            {mark}
        </motion.button>
    );
}

function CommaFall({ onBack }) {
    const [gameState, setGameState] = useState('menu'); // menu, reading, playing, results
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [readCountdown, setReadCountdown] = useState(READ_TIME);
    const [fallingMarks, setFallingMarks] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const markIdRef = useRef(0);

    const currentQuestion = questions[currentIndex];

    // Start game
    const startGame = () => {
        const newQuestions = getRandomPunctuationQuestions(8);
        setQuestions(newQuestions);
        setCurrentIndex(0);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setFallingMarks([]);
        setFeedback(null);
        setReadCountdown(READ_TIME);
        setGameState('reading'); // Start with reading phase
    };

    // Reading countdown before playing
    useEffect(() => {
        if (gameState !== 'reading') return;

        const timer = setInterval(() => {
            setReadCountdown(prev => {
                if (prev <= 1) {
                    setGameState('playing');
                    return READ_TIME;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);

    // Spawn falling punctuation marks - SPREAD ACROSS ALL LANES
    const laneIndexRef = useRef(0);

    useEffect(() => {
        if (gameState !== 'playing' || !currentQuestion) return;

        const allMarks = currentQuestion.options;
        const lanes = [15, 45, 75]; // Left, middle, right (percentage from left)

        // Spawn punctuation cycling through lanes
        const spawnInterval = setInterval(() => {
            const randomMark = allMarks[Math.floor(Math.random() * allMarks.length)];
            // Cycle through lanes
            const lane = lanes[laneIndexRef.current % 3];
            laneIndexRef.current++;

            markIdRef.current += 1;
            const newMark = {
                id: markIdRef.current,
                mark: randomMark,
                x: lane,
                delay: 0
            };

            setFallingMarks(prev => [...prev, newMark]);

            // Clean up old marks
            setTimeout(() => {
                setFallingMarks(prev => prev.filter(m => m.id !== newMark.id));
            }, FALL_DURATION * 1000);
        }, 1200);

        return () => clearInterval(spawnInterval);
    }, [gameState, currentQuestion]);

    // Game timer
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('results');
                    if (score >= 5) {
                        confetti({
                            particleCount: 150,
                            spread: 100,
                            origin: { y: 0.6 }
                        });
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState, score]);

    // Handle clicking a punctuation mark
    const handlePunctClick = useCallback((mark, id) => {
        if (!currentQuestion) return;

        // Remove clicked mark
        setFallingMarks(prev => prev.filter(m => m.id !== id));

        const isCorrect = mark === currentQuestion.correctPunctuation;

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback({ type: 'correct', message: '✓ Correct!' });

            confetti({
                particleCount: 30,
                spread: 45,
                origin: { y: 0.6 },
                colors: ['#34C759', '#00C853']
            });

            // Next question with reading phase
            setTimeout(() => {
                setFeedback(null);
                setFallingMarks([]);
                if (currentIndex < questions.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setReadCountdown(READ_TIME);
                    setGameState('reading');
                } else {
                    setGameState('results');
                }
            }, 1000);
        } else {
            setFeedback({ type: 'wrong', message: `✗ Try ${currentQuestion.correctPunctuation}` });
            setTimeout(() => setFeedback(null), 800);
        }
    }, [currentQuestion, currentIndex, questions.length]);

    return (
        <div className="cf-container">
            {/* Header */}
            <header className="cf-header">
                <button className="cf-back-btn" onClick={onBack}>←</button>
                <h1 className="cf-title">✨ Comma Fall</h1>
                {(gameState === 'playing' || gameState === 'reading') && (
                    <div className="cf-stats">
                        <span className="cf-score">{score}</span>
                        <span className="cf-timer">{timeLeft}s</span>
                    </div>
                )}
            </header>

            {/* Menu Screen */}
            {gameState === 'menu' && (
                <div className="cf-menu">
                    <div className="cf-demo-marks">
                        <span className="demo-mark">,</span>
                        <span className="demo-mark">;</span>
                        <span className="demo-mark">!</span>
                        <span className="demo-mark">?</span>
                    </div>
                    <h2>Catch the Right Punctuation!</h2>
                    <p>Read the sentence, then tap the correct falling mark.</p>
                    <ul className="cf-rules">
                        <li>📖 Read the sentence first (3s)</li>
                        <li>👆 Tap the correct falling mark</li>
                        <li>⏱️ 60 seconds total</li>
                    </ul>
                    <button className="cf-start-btn" onClick={startGame}>
                        Start Game
                    </button>
                </div>
            )}

            {/* Reading Phase - Show sentence before falling starts */}
            {gameState === 'reading' && currentQuestion && (
                <div className="cf-game">
                    <div className="cf-question-area reading">
                        <div className="cf-read-prompt">📖 Read the sentence...</div>
                        <p className="cf-sentence">
                            {currentQuestion.sentence.replace('_', '   ⬜   ')}
                        </p>
                        <div className="cf-countdown">
                            Starting in {readCountdown}...
                        </div>
                    </div>
                </div>
            )}

            {/* Game Screen */}
            {gameState === 'playing' && currentQuestion && (
                <div className="cf-game">
                    {/* Question display */}
                    <div className="cf-question-area">
                        <p className="cf-sentence">
                            {currentQuestion.sentence.replace('_', '   ⬜   ')}
                        </p>
                    </div>

                    {/* Feedback popup */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                className={`cf-feedback ${feedback.type}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Falling area */}
                    <div className="cf-fall-area">
                        <AnimatePresence>
                            {fallingMarks.map((item) => (
                                <FallingPunctuation
                                    key={item.id}
                                    id={item.id}
                                    mark={item.mark}
                                    x={item.x}
                                    delay={item.delay}
                                    onClick={handlePunctClick}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Progress indicator */}
                    <div className="cf-progress">
                        Question {currentIndex + 1} / {questions.length}
                    </div>
                </div>
            )}

            {/* Results Screen */}
            {gameState === 'results' && (
                <motion.div
                    className="cf-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="cf-result-marks">
                        <span className="result-mark">🎯</span>
                    </div>
                    <h2>
                        {score >= 6 ? '🌟 Amazing!' : score >= 4 ? '👏 Good Job!' : '💪 Keep Practicing!'}
                    </h2>
                    <div className="cf-final-score">
                        <span className="score-number">{score}</span>
                        <span className="score-label">points</span>
                    </div>
                    <div className="cf-result-buttons">
                        <button className="cf-btn-secondary" onClick={onBack}>Home</button>
                        <button className="cf-btn-primary" onClick={startGame}>Play Again</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default CommaFall;
