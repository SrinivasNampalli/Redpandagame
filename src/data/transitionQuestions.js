// Transition Tracks - Fill in the blank with transition words
// Each question has a sentence with a blank and multiple choice answers

export const transitionQuestions = [
    {
        id: 1,
        sentence: "The experiment failed; _____, the scientists learned valuable lessons.",
        blank: "_____",
        options: ["however", "because", "although", "since"],
        correct: "however",
        category: "contrast",
        explanation: "'However' shows contrast between the failure and the positive outcome."
    },
    {
        id: 2,
        sentence: "She studied for weeks; _____, she passed the exam with flying colors.",
        blank: "_____",
        options: ["therefore", "but", "although", "despite"],
        correct: "therefore",
        category: "cause-effect",
        explanation: "'Therefore' shows the result of her hard work."
    },
    {
        id: 3,
        sentence: "_____ the rain, they continued the outdoor concert.",
        blank: "_____",
        options: ["Despite", "Because of", "Due to", "Since"],
        correct: "Despite",
        category: "contrast",
        explanation: "'Despite' introduces an unexpected contrast."
    },
    {
        id: 4,
        sentence: "The book was boring; _____, she finished it anyway.",
        blank: "_____",
        options: ["nevertheless", "therefore", "because", "since"],
        correct: "nevertheless",
        category: "contrast",
        explanation: "'Nevertheless' shows she continued despite the book being boring."
    },
    {
        id: 5,
        sentence: "He loves reading; _____, he visits the library every week.",
        blank: "_____",
        options: ["consequently", "however", "although", "but"],
        correct: "consequently",
        category: "cause-effect",
        explanation: "'Consequently' shows the result of his love for reading."
    },
    {
        id: 6,
        sentence: "_____ exercising regularly, she also maintains a healthy diet.",
        blank: "_____",
        options: ["In addition to", "Despite", "Although", "However"],
        correct: "In addition to",
        category: "addition",
        explanation: "'In addition to' adds information about her healthy habits."
    },
    {
        id: 7,
        sentence: "The project was complex; _____, the team completed it on time.",
        blank: "_____",
        options: ["nonetheless", "therefore", "because", "since"],
        correct: "nonetheless",
        category: "contrast",
        explanation: "'Nonetheless' shows they succeeded despite the complexity."
    },
    {
        id: 8,
        sentence: "_____ the evidence suggests otherwise, he maintains his innocence.",
        blank: "_____",
        options: ["Although", "Because", "Therefore", "Moreover"],
        correct: "Although",
        category: "contrast",
        explanation: "'Although' introduces a contrast between evidence and his claim."
    },
    {
        id: 9,
        sentence: "She speaks Spanish; _____, she is learning French.",
        blank: "_____",
        options: ["furthermore", "however", "because", "therefore"],
        correct: "furthermore",
        category: "addition",
        explanation: "'Furthermore' adds to her language abilities."
    },
    {
        id: 10,
        sentence: "The traffic was terrible; _____, they arrived late to the meeting.",
        blank: "_____",
        options: ["as a result", "however", "although", "despite"],
        correct: "as a result",
        category: "cause-effect",
        explanation: "'As a result' shows the consequence of heavy traffic."
    },
    {
        id: 11,
        sentence: "_____ I agree with your point, I think we need more evidence.",
        blank: "_____",
        options: ["While", "Because", "Therefore", "Moreover"],
        correct: "While",
        category: "contrast",
        explanation: "'While' introduces partial agreement with a reservation."
    },
    {
        id: 12,
        sentence: "The restaurant is popular; _____, it's often crowded.",
        blank: "_____",
        options: ["hence", "although", "despite", "but"],
        correct: "hence",
        category: "cause-effect",
        explanation: "'Hence' shows the logical result of its popularity."
    },
    {
        id: 13,
        sentence: "She completed her degree; _____, she pursued a master's program.",
        blank: "_____",
        options: ["subsequently", "however", "although", "despite"],
        correct: "subsequently",
        category: "sequence",
        explanation: "'Subsequently' shows what happened after her degree."
    },
    {
        id: 14,
        sentence: "The movie was long; _____, it was entertaining throughout.",
        blank: "_____",
        options: ["yet", "therefore", "because", "since"],
        correct: "yet",
        category: "contrast",
        explanation: "'Yet' contrasts the length with the entertainment value."
    },
    {
        id: 15,
        sentence: "_____ the initial setbacks, the project was a success.",
        blank: "_____",
        options: ["Notwithstanding", "Because of", "Due to", "Since"],
        correct: "Notwithstanding",
        category: "contrast",
        explanation: "'Notwithstanding' shows success despite setbacks."
    }
];

// Shuffle function for options
export function shuffleOptions(options) {
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get random questions
export function getRandomQuestions(count = 5) {
    const shuffled = [...transitionQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
