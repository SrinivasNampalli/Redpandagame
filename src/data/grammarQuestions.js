// Grammar Questions for Grammar Drops Game
// SAT-style questions with explanations

export const grammarQuestions = [
    {
        id: 1,
        category: "Subject-Verb Agreement",
        sentence: "The group of students _ working on the project.",
        options: ["is", "are", "was", "were"],
        correct: "is",
        explanation: "The subject is 'group' (singular), not 'students'. Collective nouns take singular verbs when acting as one unit."
    },
    {
        id: 2,
        category: "Subject-Verb Agreement",
        sentence: "Neither the teacher nor the students _ prepared for the test.",
        options: ["was", "were", "is", "has been"],
        correct: "were",
        explanation: "With 'neither...nor', the verb agrees with the nearest subject. 'Students' is plural, so use 'were'."
    },
    {
        id: 3,
        category: "Punctuation",
        sentence: "The scientist made a discovery_ it changed the field forever.",
        options: [",", ";", ":", "—"],
        correct: ";",
        explanation: "Use a semicolon to connect two related independent clauses. A comma alone creates a comma splice error."
    },
    {
        id: 4,
        category: "Punctuation",
        sentence: "I need three things_ patience, practice, and persistence.",
        options: [":", ";", ",", "—"],
        correct: ":",
        explanation: "Use a colon to introduce a list when the preceding text is a complete sentence."
    },
    {
        id: 5,
        category: "Parallel Structure",
        sentence: "She likes hiking, swimming, and _.",
        options: ["to run", "runs", "running", "she runs"],
        correct: "running",
        explanation: "Items in a list must have the same grammatical form. Use gerunds (-ing) to match 'hiking' and 'swimming'."
    },
    {
        id: 6,
        category: "Parallel Structure",
        sentence: "The coach asked us to work hard, stay focused, and _.",
        options: ["being positive", "we should be positive", "positivity", "be positive"],
        correct: "be positive",
        explanation: "After 'to', use base verbs in parallel. 'Work', 'stay', and 'be' are all base forms."
    },
    {
        id: 7,
        category: "Modifiers",
        sentence: "Walking through the park, _.",
        options: [
            "the flowers were beautiful",
            "I saw beautiful flowers",
            "beautiful flowers appeared",
            "beauty was everywhere"
        ],
        correct: "I saw beautiful flowers",
        explanation: "The subject after the comma must be doing the walking. Only 'I' can walk through the park, not flowers."
    },
    {
        id: 8,
        category: "Modifiers",
        sentence: "Exhausted after the marathon, _.",
        options: [
            "the medal was received by the runner",
            "the runner collapsed at the finish line",
            "it was time to rest",
            "the finish line was crossed"
        ],
        correct: "the runner collapsed at the finish line",
        explanation: "The runner is exhausted, so 'runner' must immediately follow the comma. This avoids a dangling modifier."
    },
    {
        id: 9,
        category: "Pronoun Agreement",
        sentence: "Every student must bring _ own laptop to class.",
        options: ["their", "his or her", "ones", "its"],
        correct: "their",
        explanation: "Modern style guides accept 'their' as a singular pronoun for indefinite antecedents like 'every student'."
    },
    {
        id: 10,
        category: "Pronoun Agreement",
        sentence: "The committee announced _ decision yesterday.",
        options: ["their", "its", "his", "one's"],
        correct: "its",
        explanation: "Collective nouns like 'committee' are typically singular and take 'its'. Use 'their' only if emphasizing individual members."
    },
    {
        id: 11,
        category: "Transitions",
        sentence: "The research was thorough_ the results were inconclusive.",
        options: ["; therefore,", "; however,", "; furthermore,", "; consequently,"],
        correct: "; however,",
        explanation: "'However' shows contrast between thorough research and inconclusive results. 'Therefore' shows cause-effect, which doesn't fit here."
    },
    {
        id: 12,
        category: "Transitions",
        sentence: "She studied all night_ she passed the exam.",
        options: ["; therefore,", "; however,", "; nevertheless,", "; meanwhile,"],
        correct: "; therefore,",
        explanation: "'Therefore' shows cause and effect: studying led to passing. 'However' would incorrectly suggest contrast."
    },
    {
        id: 13,
        category: "Word Choice",
        sentence: "The new policy will _ all departments equally.",
        options: ["effect", "affect", "effecting", "affecting"],
        correct: "affect",
        explanation: "'Affect' is usually a verb meaning 'to influence'. 'Effect' is usually a noun meaning 'result'."
    },
    {
        id: 14,
        category: "Word Choice",
        sentence: "_ studying for hours, she still felt unprepared.",
        options: ["Despite", "Although", "Because", "Whereas"],
        correct: "Despite",
        explanation: "'Despite' is followed by a noun/gerund ('studying'). 'Although' requires a full clause ('she studied')."
    },
    {
        id: 15,
        category: "Sentence Fragments",
        sentence: "The professor, having reviewed all submissions._",
        options: [
            "Decided to extend the deadline",
            "decided to extend the deadline",
            "To extend the deadline",
            "Which extended the deadline"
        ],
        correct: "decided to extend the deadline",
        explanation: "The original has no main verb. Adding 'decided' creates a complete sentence with subject and predicate."
    },
    {
        id: 16,
        category: "Run-on Sentences",
        sentence: "I wanted to go to the concert _ tickets were sold out.",
        options: ["but", ", but", "however", ", however"],
        correct: ", but",
        explanation: "Use a comma + coordinating conjunction (FANBOYS) to join two independent clauses. 'However' needs a semicolon before it."
    }
];

export function getRandomGrammarQuestions(count = 8) {
    const shuffled = [...grammarQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function getGrammarByCategory(category) {
    return grammarQuestions.filter(q => q.category === category);
}

export const grammarCategories = [
    "Subject-Verb Agreement",
    "Punctuation",
    "Parallel Structure",
    "Modifiers",
    "Pronoun Agreement",
    "Transitions",
    "Word Choice",
    "Sentence Fragments",
    "Run-on Sentences"
];
