import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { puzzles } from './data/puzzles';
import GameBoard from './components/GameBoard';
import RadleyMascot from './components/RadleyMascot';
import HintSystem from './components/HintSystem';
import TransitionTracks from './components/TransitionTracks';
import CommaFall from './components/CommaFall';
import GrammarDrops from './components/GrammarDrops';
import WordBank from './components/WordBank';
import MockExam from './components/MockExam';
import confetti from 'canvas-confetti';

function App() {
    const [currentGame, setCurrentGame] = useState('menu');
    const game = useGameState();

    // Confetti on win
    useEffect(() => {
        if (game.isGameWon) {
            const duration = 3000;
            const end = Date.now() + duration;
            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FF6B35', '#00C9B7', '#F7DF1E', '#6BCB77', '#4D96FF', '#9B5DE5']
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF6B35', '#00C9B7', '#F7DF1E', '#6BCB77', '#4D96FF', '#9B5DE5']
                });
                if (Date.now() < end) requestAnimationFrame(frame);
            };
            frame();
        }
    }, [game.isGameWon]);

    // Transition Tracks
    if (currentGame === 'transitions') {
        return <TransitionTracks onBack={() => setCurrentGame('menu')} />;
    }

    // Comma Fall
    if (currentGame === 'commafall') {
        return <CommaFall onBack={() => setCurrentGame('menu')} />;
    }

    // Grammar Drops
    if (currentGame === 'grammar') {
        return <GrammarDrops onBack={() => setCurrentGame('menu')} />;
    }

    // Word Bank
    if (currentGame === 'wordbank') {
        return <WordBank onBack={() => setCurrentGame('menu')} />;
    }

    // Mock Exam
    if (currentGame === 'mockexam') {
        return <MockExam onBack={() => setCurrentGame('menu')} />;
    }

    // Connections game
    if (currentGame === 'connections') {
        return (
            <div className="app-container connections-game">
                {/* Header */}
                <header className="game-header">
                    <button
                        className="back-btn"
                        onClick={() => {
                            game.goHome();
                            setCurrentGame('menu');
                        }}
                    >
                        ←
                    </button>
                    <span className="header-title">Connections</span>
                    <div className="score-badge">
                        <span>🔥 {game.streak}</span>
                    </div>
                </header>

                {/* Home */}
                {game.screen === 'home' && (
                    <div className="home-screen">
                        <img
                            src="/imagesradley/heropromptbradly.png"
                            alt="Radley"
                            className="mascot-image"
                        />
                        <h1>Ready to Connect?</h1>
                        <p>Match 4 words that share a theme</p>

                        <div className="puzzle-list">
                            {puzzles.slice(0, 3).map((puzzle) => (
                                <button
                                    key={puzzle.id}
                                    className="puzzle-btn"
                                    onClick={() => game.startGame(puzzle)}
                                >
                                    {puzzle.title}
                                </button>
                            ))}
                            <button
                                className="puzzle-btn primary"
                                onClick={() => game.startGame()}
                            >
                                🎲 Random
                            </button>
                        </div>

                        <button
                            className="back-link"
                            onClick={() => setCurrentGame('menu')}
                        >
                            ← Back to Games
                        </button>
                    </div>
                )}

                {/* Playing */}
                {game.screen === 'game' && (
                    <>
                        <RadleyMascot
                            state={game.selectedWords.length === 4 ? 'thinking' : 'idle'}
                            solvedCount={game.solvedCategories.length}
                            mistakes={game.mistakes}
                        />

                        <GameBoard
                            words={game.words}
                            selectedWords={game.selectedWords}
                            solvedCategories={game.solvedCategories}
                            onSelectWord={game.selectWord}
                        />

                        <div className="mistakes-display">
                            <span>Mistakes:</span>
                            {[...Array(game.maxMistakes)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`mistake-dot ${i < game.mistakes ? 'used' : ''}`}
                                />
                            ))}
                        </div>

                        <div className="action-buttons">
                            <button className="btn btn-secondary" onClick={game.shuffleWords}>
                                🔀
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={game.deselectAll}
                                disabled={game.selectedWords.length === 0}
                            >
                                ↩️
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={game.submitGuess}
                                disabled={game.selectedWords.length !== 4}
                            >
                                Submit
                            </button>
                        </div>

                        <HintSystem
                            puzzleId={game.currentPuzzle?.id}
                            onUseHint={game.useHint}
                            hintsUsed={game.hintsUsed}
                        />
                    </>
                )}

                {/* Results */}
                {game.screen === 'results' && (
                    <div className="results-screen">
                        <img
                            src={game.isGameWon
                                ? "/imagesradley/bradleywinnervip.png"
                                : "/imagesradley/wronganswerbradley.png"
                            }
                            alt={game.isGameWon ? "Victory!" : "Keep trying!"}
                            className="mascot-image"
                        />
                        <h1>{game.isGameWon ? '🎉 Amazing!' : '💪 Nice Try!'}</h1>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="value">{game.solvedCategories.length}/4</div>
                                <div className="label">Solved</div>
                            </div>
                            <div className="stat-card">
                                <div className="value">{game.mistakes}</div>
                                <div className="label">Mistakes</div>
                            </div>
                            <div className="stat-card">
                                <div className="value">{game.getGameDuration()}s</div>
                                <div className="label">Time</div>
                            </div>
                        </div>

                        {game.isGameWon && (
                            <div className="solved-categories">
                                {game.currentPuzzle?.categories.map((cat) => (
                                    <div key={cat.name} className={`solved-category ${cat.color}`}>
                                        <h4>{cat.name}</h4>
                                        <p>{cat.words.join(' • ')}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="action-buttons">
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    game.goHome();
                                    setCurrentGame('menu');
                                }}
                            >
                                Home
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => game.startGame()}
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Main Menu
    return (
        <div className="main-menu">
            <header className="menu-header">
                <img
                    src="/imagesradley/bradleyapplogo.png"
                    alt="Radley"
                    className="menu-logo"
                />
                <h1>Radley's SAT English</h1>
                <p>Choose your game!</p>
            </header>

            <div className="game-cards">
                {/* Connections */}
                <div
                    className="game-card connections-card"
                    onClick={() => setCurrentGame('connections')}
                >
                    <div className="game-card-icon">🔗</div>
                    <div className="game-card-content">
                        <h2>Connections</h2>
                        <p>Match 4 words by theme</p>
                    </div>
                    <div className="game-card-arrow">›</div>
                </div>

                {/* Transition Tracks */}
                <div
                    className="game-card transitions-card"
                    onClick={() => setCurrentGame('transitions')}
                >
                    <div className="game-card-icon">🚂</div>
                    <div className="game-card-content">
                        <h2>Transition Tracks</h2>
                        <p>Tap the right train car</p>
                    </div>
                    <div className="game-card-arrow">›</div>
                </div>

                {/* Comma Fall */}
                <div
                    className="game-card commafall-card"
                    onClick={() => setCurrentGame('commafall')}
                >
                    <div className="game-card-icon">✨</div>
                    <div className="game-card-content">
                        <h2>Comma Fall</h2>
                        <p>Catch falling punctuation</p>
                    </div>
                    <div className="game-card-arrow">›</div>
                </div>

                {/* Word Bank */}
                <div
                    className="game-card wordbank-card"
                    onClick={() => setCurrentGame('wordbank')}
                >
                    <div className="game-card-icon">📚</div>
                    <div className="game-card-content">
                        <h2>Word Bank</h2>
                        <p>Learn SAT vocabulary</p>
                    </div>
                    <div className="game-card-arrow">›</div>
                </div>
            </div>

            <div className="menu-mascot">
                <img
                    src="/imagesradley/heropromptbradly.png"
                    alt="Radley"
                />
            </div>
        </div>
    );
}

export default App;
