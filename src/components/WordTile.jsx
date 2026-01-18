import { motion } from 'framer-motion';

function WordTile({ word, isSelected, onClick, index }) {
    return (
        <motion.button
            className={`word-tile ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: index * 0.02
            }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
        >
            {word}
        </motion.button>
    );
}

export default WordTile;
