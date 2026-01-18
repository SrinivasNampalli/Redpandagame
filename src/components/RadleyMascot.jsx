import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MASCOT_IMAGES = {
    idle: '/imagesradley/heropromptbradly.png',
    thinking: '/imagesradley/sophistactedbradlety.png',
    correct: '/imagesradley/correctanswerbradly.png',
    wrong: '/imagesradley/wronganswerbradley.png',
    streak: '/imagesradley/bradleycorrectstreak.png',
    studying: '/imagesradley/studiouisbradleyenglushexam.png',
};

const MESSAGES = {
    idle: [
        "Select 4 words that share a theme! 🎯",
        "You've got this! Look for patterns! 🔍",
        "Think like the SAT! What connects these? 🤔",
    ],
    thinking: [
        "Hmm, interesting choice... 🧐",
        "I see what you're doing there! 👀",
        "Ready to submit? Let's see! ✨",
    ],
    correct: [
        "AMAZING! You nailed it! 🎉",
        "Brilliant connection! 🌟",
        "That's the SAT spirit! 💪",
    ],
    wrong: [
        "Not quite! Keep trying! 💪",
        "So close! Think about it differently! 🤔",
        "Learning happens through mistakes! 📚",
    ],
    streak: [
        "You're on FIRE! 🔥🔥🔥",
        "Unstoppable! Keep going! ⚡",
        "SAT genius in the making! 🏆",
    ],
};

function RadleyMascot({ state = 'idle', solvedCount = 0, mistakes = 0 }) {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(true);
    const [currentState, setCurrentState] = useState(state);

    // Determine actual state based on game progress
    useEffect(() => {
        if (solvedCount >= 2 && mistakes === 0) {
            setCurrentState('streak');
        } else {
            setCurrentState(state);
        }
    }, [state, solvedCount, mistakes]);

    // Update message when state changes
    useEffect(() => {
        const messages = MESSAGES[currentState] || MESSAGES.idle;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMessage);
        setShowMessage(true);

        // Hide message after a few seconds
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, [currentState, solvedCount]);

    const imageSrc = MASCOT_IMAGES[currentState] || MASCOT_IMAGES.idle;

    return (
        <div className="mascot-section">
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        className="speech-bubble"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="mascot-container"
                animate={{
                    scale: currentState === 'correct' || currentState === 'streak' ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
            >
                <motion.img
                    key={imageSrc}
                    src={imageSrc}
                    alt="Radley the Red Panda"
                    className={`mascot-image ${currentState === 'correct' ? 'celebrating' : ''}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
            </motion.div>
        </div>
    );
}

export default RadleyMascot;
