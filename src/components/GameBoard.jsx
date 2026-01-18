import { motion, AnimatePresence } from 'framer-motion';
import WordTile from './WordTile';

function GameBoard({ words, selectedWords, solvedCategories, onSelectWord }) {
    return (
        <div className="game-board">
            {/* Solved Categories */}
            <AnimatePresence>
                <div className="solved-categories">
                    {solvedCategories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            className={`solved-category ${category.color}`}
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                delay: index * 0.1
                            }}
                        >
                            <h4>{category.name}</h4>
                            <p>{category.words.join(' • ')}</p>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>

            {/* Word Grid */}
            <motion.div
                className="word-grid"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {words.map((wordObj, index) => (
                        <WordTile
                            key={wordObj.word}
                            word={wordObj.word}
                            isSelected={selectedWords.some(w => w.word === wordObj.word)}
                            onClick={() => onSelectWord(wordObj)}
                            index={index}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default GameBoard;
