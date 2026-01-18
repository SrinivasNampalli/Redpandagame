import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vocabulary, categories, getVocabByCategory, searchVocab } from '../data/vocabulary';
import './WordBank.css';

function WordCard({ word, isExpanded, onToggle }) {
    return (
        <motion.div
            className={`word-card ${isExpanded ? 'expanded' : ''}`}
            onClick={onToggle}
            layout
        >
            <div className="word-header">
                <span className="word-term">{word.word}</span>
                <span className="word-pos">{word.partOfSpeech}</span>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="word-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="word-definition">
                            <strong>Definition:</strong> {word.definition}
                        </div>
                        <div className="word-example">
                            <strong>Example:</strong> "{word.example}"
                        </div>
                        <div className="word-tip">
                            <span className="tip-icon">💡</span>
                            <strong>SAT Tip:</strong> {word.satTip}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="expand-hint">
                {isExpanded ? '▲ Tap to collapse' : '▼ Tap to expand'}
            </div>
        </motion.div>
    );
}

function WordBank({ onBack }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const filteredWords = searchQuery
        ? searchVocab(searchQuery)
        : selectedCategory === 'all'
            ? vocabulary
            : getVocabByCategory(selectedCategory);

    return (
        <div className="wb-container">
            {/* Header */}
            <header className="wb-header">
                <button className="wb-back-btn" onClick={onBack}>←</button>
                <h1 className="wb-title">📚 Word Bank</h1>
                <span className="wb-count">{filteredWords.length}</span>
            </header>

            {/* Search */}
            <div className="wb-search">
                <input
                    type="text"
                    placeholder="Search words..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="wb-search-input"
                />
            </div>

            {/* Category Tabs */}
            <div className="wb-tabs">
                <button
                    className={`wb-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`wb-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.icon} {cat.name}
                    </button>
                ))}
            </div>

            {/* Word List */}
            <div className="wb-list">
                {filteredWords.length === 0 ? (
                    <div className="wb-empty">No words found</div>
                ) : (
                    filteredWords.map(word => (
                        <WordCard
                            key={word.id}
                            word={word}
                            isExpanded={expandedId === word.id}
                            onToggle={() => setExpandedId(expandedId === word.id ? null : word.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default WordBank;
