import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple local storage for hints
const HINTS_STORAGE_KEY = 'radley-sat-hints';

function getStoredHints(puzzleId) {
    try {
        const stored = localStorage.getItem(HINTS_STORAGE_KEY);
        if (!stored) return [];
        const allHints = JSON.parse(stored);
        return allHints[puzzleId] || [];
    } catch {
        return [];
    }
}

function saveHint(puzzleId, hint) {
    try {
        const stored = localStorage.getItem(HINTS_STORAGE_KEY);
        const allHints = stored ? JSON.parse(stored) : {};
        if (!allHints[puzzleId]) {
            allHints[puzzleId] = [];
        }
        allHints[puzzleId].push({
            id: Date.now(),
            text: hint,
            votes: 0,
            createdAt: new Date().toISOString(),
        });
        localStorage.setItem(HINTS_STORAGE_KEY, JSON.stringify(allHints));
        return allHints[puzzleId];
    } catch {
        return [];
    }
}

function voteHint(puzzleId, hintId) {
    try {
        const stored = localStorage.getItem(HINTS_STORAGE_KEY);
        if (!stored) return [];
        const allHints = JSON.parse(stored);
        if (!allHints[puzzleId]) return [];

        allHints[puzzleId] = allHints[puzzleId].map(h =>
            h.id === hintId ? { ...h, votes: h.votes + 1 } : h
        );
        localStorage.setItem(HINTS_STORAGE_KEY, JSON.stringify(allHints));
        return allHints[puzzleId];
    } catch {
        return [];
    }
}

function HintSystem({ puzzleId, onUseHint, hintsUsed }) {
    const [hints, setHints] = useState([]);
    const [newHint, setNewHint] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showHints, setShowHints] = useState(false);

    useEffect(() => {
        if (puzzleId) {
            setHints(getStoredHints(puzzleId));
            setShowHints(false);
        }
    }, [puzzleId]);

    const handleAddHint = () => {
        if (!newHint.trim() || !puzzleId) return;
        const updatedHints = saveHint(puzzleId, newHint.trim());
        setHints(updatedHints);
        setNewHint('');
    };

    const handleVote = (hintId) => {
        if (!puzzleId) return;
        const updatedHints = voteHint(puzzleId, hintId);
        setHints(updatedHints);
    };

    const handleRevealHints = () => {
        setShowHints(true);
        onUseHint?.();
    };

    const sortedHints = [...hints].sort((a, b) => b.votes - a.votes);

    return (
        <div className="hint-panel">
            <button
                className="btn btn-hint"
                onClick={() => setIsOpen(!isOpen)}
                style={{ width: '100%', marginBottom: isOpen ? 'var(--space-md)' : 0 }}
            >
                💡 Hints ({hints.length})
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        {/* Create Your Own Hint */}
                        <h3>✍️ Create Your Hint</h3>
                        <div className="hint-input-group">
                            <input
                                type="text"
                                className="hint-input"
                                placeholder="Write a hint for others..."
                                value={newHint}
                                onChange={(e) => setNewHint(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddHint()}
                                maxLength={100}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleAddHint}
                                disabled={!newHint.trim()}
                                style={{ padding: 'var(--space-sm) var(--space-md)' }}
                            >
                                Add
                            </button>
                        </div>

                        {/* View Community Hints */}
                        {hints.length > 0 && (
                            <>
                                {!showHints ? (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleRevealHints}
                                        style={{ width: '100%', marginTop: 'var(--space-sm)' }}
                                    >
                                        👀 Reveal Community Hints (costs 1 hint)
                                    </button>
                                ) : (
                                    <div className="hint-list">
                                        <h3 style={{ marginTop: 'var(--space-md)' }}>🌟 Community Hints</h3>
                                        {sortedHints.map((hint) => (
                                            <motion.div
                                                key={hint.id}
                                                className="hint-item"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                            >
                                                <span className="hint-text">{hint.text}</span>
                                                <button
                                                    className="hint-votes"
                                                    onClick={() => handleVote(hint.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: 'inherit',
                                                        color: 'inherit',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <span>👍</span>
                                                    <span>{hint.votes}</span>
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {hints.length === 0 && (
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: 'var(--font-size-sm)',
                                textAlign: 'center',
                                marginTop: 'var(--space-md)'
                            }}>
                                No hints yet! Be the first to help others 🌟
                            </p>
                        )}

                        {/* Share Hints */}
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                const shareUrl = `${window.location.origin}?puzzle=${puzzleId}`;
                                navigator.clipboard?.writeText(shareUrl);
                                alert('Link copied! Share with friends to play this puzzle.');
                            }}
                            style={{
                                width: '100%',
                                marginTop: 'var(--space-md)',
                                fontSize: 'var(--font-size-sm)'
                            }}
                        >
                            🔗 Share This Puzzle
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HintSystem;
