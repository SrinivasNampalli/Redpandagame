// SAT Vocabulary Bank
// Definitions, examples, and SAT tips

export const vocabulary = [
    {
        id: 1,
        word: "However",
        partOfSpeech: "adverb",
        definition: "Used to introduce a statement that contrasts with a previous statement",
        example: "The experiment failed; however, the scientists learned valuable lessons.",
        satTip: "Use 'however' to show contrast between two related ideas. It usually follows a semicolon.",
        category: "transitions"
    },
    {
        id: 2,
        word: "Therefore",
        partOfSpeech: "adverb",
        definition: "For that reason; consequently",
        example: "She studied hard; therefore, she passed the exam with flying colors.",
        satTip: "Use 'therefore' to show cause and effect. It signals a logical conclusion.",
        category: "transitions"
    },
    {
        id: 3,
        word: "Nevertheless",
        partOfSpeech: "adverb",
        definition: "In spite of that; nonetheless",
        example: "The weather was terrible; nevertheless, we continued our journey.",
        satTip: "Similar to 'however' but slightly more formal. Shows unexpected contrast.",
        category: "transitions"
    },
    {
        id: 4,
        word: "Consequently",
        partOfSpeech: "adverb",
        definition: "As a result",
        example: "He didn't study; consequently, he failed the test.",
        satTip: "Shows direct cause-and-effect relationship. Interchangeable with 'therefore'.",
        category: "transitions"
    },
    {
        id: 5,
        word: "Furthermore",
        partOfSpeech: "adverb",
        definition: "In addition; besides",
        example: "The plan is cost-effective; furthermore, it's environmentally friendly.",
        satTip: "Adds information to strengthen an argument. Don't use to show contrast!",
        category: "transitions"
    },
    {
        id: 6,
        word: "Semicolon",
        partOfSpeech: "punctuation",
        definition: "Connects two closely related independent clauses",
        example: "I love coffee; my sister prefers tea.",
        satTip: "Both sides must be complete sentences. Never use before 'and' or 'but'.",
        category: "punctuation"
    },
    {
        id: 7,
        word: "Colon",
        partOfSpeech: "punctuation",
        definition: "Introduces a list, explanation, or elaboration",
        example: "There are three things I need: coffee, sleep, and motivation.",
        satTip: "What comes before the colon MUST be a complete sentence.",
        category: "punctuation"
    },
    {
        id: 8,
        word: "Apostrophe",
        partOfSpeech: "punctuation",
        definition: "Shows possession or forms contractions",
        example: "The student's book (possession) vs. It's raining (contraction)",
        satTip: "Watch for its vs. it's! 'Its' = possessive, 'It's' = it is.",
        category: "punctuation"
    },
    {
        id: 9,
        word: "Subject-Verb Agreement",
        partOfSpeech: "grammar rule",
        definition: "Verbs must agree in number with their subjects",
        example: "The dog runs (singular) vs. The dogs run (plural)",
        satTip: "Find the true subject, ignoring phrases between subject and verb.",
        category: "grammar"
    },
    {
        id: 10,
        word: "Parallel Structure",
        partOfSpeech: "grammar rule",
        definition: "Items in a list or comparison should have the same grammatical form",
        example: "I like swimming, biking, and running (all gerunds)",
        satTip: "Look for lists with 'and' or 'or' - all items should match in form.",
        category: "grammar"
    },
    {
        id: 11,
        word: "Dangling Modifier",
        partOfSpeech: "grammar rule",
        definition: "A modifying phrase that doesn't clearly refer to the right word",
        example: "Wrong: Walking to school, the rain started. Right: Walking to school, I got wet.",
        satTip: "The subject after the comma should be doing the action in the opening phrase.",
        category: "grammar"
    },
    {
        id: 12,
        word: "Although",
        partOfSpeech: "conjunction",
        definition: "In spite of the fact that; even though",
        example: "Although it was raining, we went to the park.",
        satTip: "'Although' starts a DEPENDENT clause. Can't stand alone as a sentence.",
        category: "transitions"
    },
    {
        id: 13,
        word: "Because",
        partOfSpeech: "conjunction",
        definition: "For the reason that",
        example: "She succeeded because she worked hard.",
        satTip: "'Because' introduces a reason. Creates a dependent clause.",
        category: "transitions"
    },
    {
        id: 14,
        word: "Despite",
        partOfSpeech: "preposition",
        definition: "Without being affected by; in spite of",
        example: "Despite the rain, we went outside.",
        satTip: "'Despite' is followed by a noun or gerund, never a clause.",
        category: "transitions"
    },
    {
        id: 15,
        word: "Comma Splice",
        partOfSpeech: "grammar error",
        definition: "Incorrectly joining two independent clauses with just a comma",
        example: "Wrong: I love pizza, it's my favorite. Right: I love pizza; it's my favorite.",
        satTip: "Fix with semicolon, period, or comma + coordinating conjunction (FANBOYS).",
        category: "grammar"
    }
];

export const categories = [
    { id: "transitions", name: "Transition Words", icon: "🔗" },
    { id: "punctuation", name: "Punctuation", icon: "✏️" },
    { id: "grammar", name: "Grammar Rules", icon: "📝" }
];

export function getVocabByCategory(category) {
    return vocabulary.filter(v => v.category === category);
}

export function searchVocab(query) {
    const q = query.toLowerCase();
    return vocabulary.filter(v =>
        v.word.toLowerCase().includes(q) ||
        v.definition.toLowerCase().includes(q)
    );
}
