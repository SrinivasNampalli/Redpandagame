import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomQuestions, shuffleOptions } from '../data/transitionQuestions';
import confetti from 'canvas-confetti';
import './TransitionTracks.css';

const TIMER_DURATION = 10; // Faster gameplay

// DIY Train Car Component
function TrainCar({ word, isCorrect, onClick, color, index }) {
    return (
        <motion.div
            className={`train-car ${color}`}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02, y: -4 }}
        >
            <div className="train-car-body">
                <div className="train-car-window"></div>
                <div className="train-car-word">{word}</div>
            </div>
            <div className="train-car-wheels">
                <div className="wheel"></div>
                <div className="wheel"></div>
            </div>
            <div className="train-car-connector"></div>
        </motion.div>
    );
}

// DIY Locomotive
function Locomotive() {
    return (
        <div className="locomotive">
            <div className="locomotive-cabin">
                <div className="locomotive-window"></div>
            </div>
            <div className="locomotive-body">
                <div className="locomotive-front"></div>
            </div>
            <div className="locomotive-chimney">
                <motion.div
                    className="smoke"
                    animate={{ y: [-5, -15, -5], opacity: [0.8, 0.4, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
            <div className="locomotive-wheels">
                <div className="wheel big"></div>
                <div className="wheel"></div>
                <div className="wheel"></div>
            </div>
        </div>
    );
}

function TransitionTracks({ onBack }) {
    const [gameState, setGameState] = useState('menu');
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [trainPosition, setTrainPosition] = useState(0); // 0 to 100 percent

    const currentQuestion = questions[currentIndex];
    const trainColors = ['red', 'blue', 'green', 'yellow'];

    const startGame = () => {
        const newQuestions = getRandomQuestions(5);
        setQuestions(newQuestions);
        setCurrentIndex(0);
        setScore(0);
        setTimeLeft(TIMER_DURATION);
        setSelectedAnswer(null);
        setShowResult(false);
        setShuffledOptions(shuffleOptions(newQuestions[0].options));
        setTrainPosition(0);
        setGameState('playing');
    };

    // Timer and train movement - SMOOTH SPRING ANIMATION
    useEffect(() => {
        if (gameState !== 'playing' || showResult) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleAnswer(null);
                    return TIMER_DURATION;
                }
                return prev - 1;
            });
        }, 1000);

        // Smooth continuous train movement
        const trainTimer = setInterval(() => {
            setTrainPosition(prev => {
                const elapsed = TIMER_DURATION - timeLeft;
                // Smooth easing function
                const target = (elapsed / TIMER_DURATION) * 200;
                return prev + (target - prev) * 0.15; // Smooth interpolation
            });
        }, 16); // 60fps smooth updates

        return () => {
            clearInterval(timer);
            clearInterval(trainTimer);
        };
    }, [gameState, showResult, timeLeft]);

    useEffect(() => {
        if (currentQuestion) {
            setShuffledOptions(shuffleOptions(currentQuestion.options));
        }
    }, [currentIndex, questions]);

    const handleAnswer = useCallback((answer) => {
        if (showResult) return;

        setSelectedAnswer(answer);
        setShowResult(true);

        const isCorrect = answer === currentQuestion?.correct;

        if (isCorrect) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#34C759', '#00C853', '#69F0AE']
            });
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setTimeLeft(TIMER_DURATION);
                setSelectedAnswer(null);
                setShowResult(false);
                setTrainPosition(0);
            } else {
                setGameState('results');
                if (score + (isCorrect ? 1 : 0) >= 4) {
                    confetti({
                        particleCount: 150,
                        spread: 100,
                        origin: { y: 0.6 }
                    });
                }
            }
        }, 1500);
    }, [showResult, currentQuestion, currentIndex, questions.length, score]);

    // Render sentence with blank
    const renderSentence = () => {
        if (!currentQuestion) return null;
        const parts = currentQuestion.sentence.split(currentQuestion.blank);
        return (
            <p className="tt-sentence">
                {parts[0]}
                <span className={`tt-blank ${showResult ? (selectedAnswer === currentQuestion.correct ? 'correct' : 'wrong') : ''}`}>
                    {showResult ? (selectedAnswer || currentQuestion.correct) : '______'}
                </span>
                {parts[1]}
            </p>
        );
    };

    return (
        <div className="tt-container">
            {/* Header */}
            <header className="tt-header">
                <button className="tt-back-btn" onClick={onBack}>←</button>
                <h1 className="tt-title">🚂 Transition Tracks</h1>
                {gameState === 'playing' && (
                    <div className="tt-score">{score}/{questions.length}</div>
                )}
            </header>

            {/* Menu Screen */}
            {gameState === 'menu' && (
                <div className="tt-menu">
                    <div className="tt-train-preview">
                        <Locomotive />
                        <TrainCar word="However" color="red" index={0} />
                        <TrainCar word="Therefore" color="blue" index={1} />
                    </div>
                    <h2>All Aboard! 🚂</h2>
                    <p>Tap the train car with the right transition word!</p>
                    <ul className="tt-rules">
                        <li>⏱️ 15 seconds per question</li>
                        <li>🚃 Tap the correct train car</li>
                        <li>📝 5 questions per round</li>
                    </ul>
                    <button className="tt-start-btn" onClick={startGame}>
                        Start Journey
                    </button>
                </div>
            )}

            {/* Game Screen */}
            {gameState === 'playing' && currentQuestion && (
                <div className="tt-game">
                    {/* Timer Bar */}
                    <div className="tt-timer-container">
                        <motion.div
                            className="tt-timer-bar"
                            initial={{ width: '100%' }}
                            animate={{
                                width: `${(timeLeft / TIMER_DURATION) * 100}%`,
                                backgroundColor: timeLeft <= 5 ? '#FF3B30' : timeLeft <= 10 ? '#FFCC00' : '#34C759'
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="tt-timer-text">{timeLeft}s</span>
                    </div>

                    {/* Question Card */}
                    <div className="tt-question-card">
                        <div className="tt-question-number">
                            Question {currentIndex + 1} of {questions.length}
                        </div>
                        {renderSentence()}

                        <AnimatePresence>
                            {showResult && (
                                <motion.div
                                    className={`tt-feedback ${selectedAnswer === currentQuestion.correct ? 'correct' : 'wrong'}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    {selectedAnswer === currentQuestion.correct ? '✅ Correct!' : `❌ It was "${currentQuestion.correct}"`}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Train Track Area - Centered */}
                    <div className="tt-track-area">
                        <div className="tt-tracks"></div>

                        {/* Train centered, moves left-to-right */}
                        <motion.div
                            className="tt-train-container"
                            animate={{ x: trainPosition * 3 }} // Pixel movement
                            transition={{ duration: 0.05, ease: "linear" }}
                        >
                            <Locomotive />
                            {shuffledOptions.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isCorrect = option === currentQuestion.correct;
                                let carClass = '';

                                if (showResult) {
                                    if (isCorrect) carClass = 'correct';
                                    else if (isSelected && !isCorrect) carClass = 'wrong';
                                }

                                return (
                                    <TrainCar
                                        key={option}
                                        word={option}
                                        color={trainColors[index]}
                                        index={index}
                                        isCorrect={isCorrect}
                                        onClick={() => !showResult && handleAnswer(option)}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            )}

            {/* Results Screen */}
            {gameState === 'results' && (
                <motion.div
                    className="tt-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="tt-train-preview celebration">
                        <Locomotive />
                        <TrainCar word="🎉" color="green" index={0} />
                    </div>
                    <h2>
                        {score >= 4 ? '🎉 Amazing!' : score >= 3 ? '👍 Good Job!' : '💪 Keep Going!'}
                    </h2>
                    <div className="tt-final-score">
                        <span className="tt-score-number">{score}</span>
                        <span className="tt-score-divider">/</span>
                        <span className="tt-score-total">{questions.length}</span>
                    </div>
                    <div className="tt-result-buttons">
                        <button className="tt-btn-secondary" onClick={onBack}>Home</button>
                        <button className="tt-btn-primary" onClick={startGame}>Play Again</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default TransitionTracks;
