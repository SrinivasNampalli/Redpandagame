import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomGrammarQuestions } from '../data/grammarQuestions';
import confetti from 'canvas-confetti';
import './MockExam.css';

const EXAM_DURATION = 15 * 60; // 15 minutes in seconds
const QUESTIONS_COUNT = 20;

function MockExam({ onBack }) {
    const [examState, setExamState] = useState('intro'); // intro, exam, review, results
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
    const [reviewMode, setReviewMode] = useState(false);

    const currentQuestion = questions[currentIndex];

    const startExam = () => {
        const newQuestions = getRandomGrammarQuestions(QUESTIONS_COUNT);
        setQuestions(newQuestions);
        setCurrentIndex(0);
        setAnswers({});
        setTimeLeft(EXAM_DURATION);
        setReviewMode(false);
        setExamState('exam');
    };

    // Timer
    useEffect(() => {
        if (examState !== 'exam') return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    finishExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examState]);

    const handleAnswer = (answer) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: answer
        }));
    };

    const goToQuestion = (index) => {
        setCurrentIndex(index);
    };

    const finishExam = useCallback(() => {
        const score = questions.reduce((total, q) => {
            return total + (answers[q.id] === q.correct ? 1 : 0);
        }, 0);

        if (score >= questions.length * 0.8) {
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        }

        setExamState('results');
    }, [questions, answers]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getScore = () => {
        return questions.reduce((total, q) => {
            return total + (answers[q.id] === q.correct ? 1 : 0);
        }, 0);
    };

    const getAnsweredCount = () => {
        return Object.keys(answers).length;
    };

    return (
        <div className="me-container">
            {/* Header */}
            <header className="me-header">
                <button className="me-back-btn" onClick={onBack}>←</button>
                <h1 className="me-title">📝 Mock Exam</h1>
                {examState === 'exam' && (
                    <div className={`me-timer ${timeLeft < 60 ? 'warning' : ''}`}>
                        {formatTime(timeLeft)}
                    </div>
                )}
            </header>

            {/* Intro Screen */}
            {examState === 'intro' && (
                <div className="me-intro">
                    <div className="me-icon">📝</div>
                    <h2>SAT Grammar Mock Exam</h2>
                    <p>Test your knowledge with a timed practice exam.</p>
                    <div className="me-info-card">
                        <div className="me-info-row">
                            <span>📊 Questions</span>
                            <strong>{QUESTIONS_COUNT}</strong>
                        </div>
                        <div className="me-info-row">
                            <span>⏱️ Time Limit</span>
                            <strong>15 minutes</strong>
                        </div>
                        <div className="me-info-row">
                            <span>📖 Topics</span>
                            <strong>All Grammar</strong>
                        </div>
                    </div>
                    <button className="me-start-btn" onClick={startExam}>
                        Begin Exam
                    </button>
                </div>
            )}

            {/* Exam Screen */}
            {examState === 'exam' && currentQuestion && (
                <div className="me-exam">
                    {/* Question Navigator */}
                    <div className="me-nav">
                        {questions.map((q, i) => (
                            <button
                                key={q.id}
                                className={`me-nav-btn ${i === currentIndex ? 'current' : ''} ${answers[q.id] ? 'answered' : ''}`}
                                onClick={() => goToQuestion(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Question */}
                    <div className="me-question-card">
                        <div className="me-question-header">
                            <span className="me-q-number">Question {currentIndex + 1}</span>
                            <span className="me-q-category">{currentQuestion.category}</span>
                        </div>
                        <p className="me-sentence">
                            {currentQuestion.sentence.split('_').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className="me-blank">
                                            {answers[currentQuestion.id] || '______'}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="me-options">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option}
                                className={`me-option ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="me-buttons">
                        <button
                            className="me-btn-nav"
                            onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
                            disabled={currentIndex === 0}
                        >
                            ← Previous
                        </button>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                className="me-btn-nav"
                                onClick={() => goToQuestion(currentIndex + 1)}
                            >
                                Next →
                            </button>
                        ) : (
                            <button className="me-btn-submit" onClick={finishExam}>
                                Submit Exam
                            </button>
                        )}
                    </div>

                    {/* Progress */}
                    <div className="me-progress">
                        {getAnsweredCount()} of {questions.length} answered
                    </div>
                </div>
            )}

            {/* Results Screen */}
            {examState === 'results' && (
                <motion.div
                    className="me-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="me-result-icon">
                        {getScore() >= 18 ? '🏆' : getScore() >= 14 ? '⭐' : '📚'}
                    </div>
                    <h2>
                        {getScore() >= 18 ? 'Excellent!' : getScore() >= 14 ? 'Good Job!' : 'Keep Practicing!'}
                    </h2>
                    <div className="me-score-circle">
                        <span className="score-number">{getScore()}</span>
                        <span className="score-total">/{questions.length}</span>
                    </div>
                    <div className="me-score-percent">
                        {Math.round((getScore() / questions.length) * 100)}%
                    </div>

                    <button
                        className="me-review-btn"
                        onClick={() => {
                            setReviewMode(true);
                            setCurrentIndex(0);
                            setExamState('review');
                        }}
                    >
                        📖 Review Answers
                    </button>

                    <div className="me-result-buttons">
                        <button className="me-btn-secondary" onClick={onBack}>Home</button>
                        <button className="me-btn-primary" onClick={startExam}>Retake</button>
                    </div>
                </motion.div>
            )}

            {/* Review Mode */}
            {examState === 'review' && currentQuestion && (
                <div className="me-review">
                    <div className="me-nav">
                        {questions.map((q, i) => {
                            const isCorrect = answers[q.id] === q.correct;
                            return (
                                <button
                                    key={q.id}
                                    className={`me-nav-btn ${i === currentIndex ? 'current' : ''} ${isCorrect ? 'correct' : 'wrong'}`}
                                    onClick={() => goToQuestion(i)}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="me-question-card review">
                        <div className="me-question-header">
                            <span className="me-q-number">Question {currentIndex + 1}</span>
                            <span className={`me-result-badge ${answers[currentQuestion.id] === currentQuestion.correct ? 'correct' : 'wrong'}`}>
                                {answers[currentQuestion.id] === currentQuestion.correct ? '✓ Correct' : '✗ Wrong'}
                            </span>
                        </div>
                        <p className="me-sentence">
                            {currentQuestion.sentence.split('_').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className={`me-blank ${answers[currentQuestion.id] === currentQuestion.correct ? 'correct' : 'wrong'}`}>
                                            {currentQuestion.correct}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </p>

                        <div className="me-your-answer">
                            <strong>Your answer:</strong> {answers[currentQuestion.id] || '(not answered)'}
                        </div>

                        <div className="me-explanation">
                            <strong>💡 Explanation:</strong> {currentQuestion.explanation}
                        </div>
                    </div>

                    <div className="me-buttons">
                        <button
                            className="me-btn-nav"
                            onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
                            disabled={currentIndex === 0}
                        >
                            ← Previous
                        </button>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                className="me-btn-nav"
                                onClick={() => goToQuestion(currentIndex + 1)}
                            >
                                Next →
                            </button>
                        ) : (
                            <button className="me-btn-submit" onClick={() => setExamState('results')}>
                                Back to Results
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MockExam;
