// Comma Fall - Punctuation question data
// Sentences with missing punctuation

export const punctuationQuestions = [
    {
        id: 1,
        sentence: "The cat sat on the mat_ it was very comfortable.",
        correctPunctuation: ";",
        options: [",", ";", ".", ":"],
        explanation: "A semicolon connects two related independent clauses."
    },
    {
        id: 2,
        sentence: "She bought apples_ oranges_ and bananas.",
        correctPunctuation: ",",
        options: [",", ";", ":", "."],
        explanation: "Commas separate items in a list."
    },
    {
        id: 3,
        sentence: "Wait_ I have something to tell you.",
        correctPunctuation: "!",
        options: ["!", ",", ".", "?"],
        explanation: "An exclamation mark shows urgency or strong emotion."
    },
    {
        id: 4,
        sentence: "The recipe requires the following ingredients_ flour, sugar, and eggs.",
        correctPunctuation: ":",
        options: [":", ";", ",", "."],
        explanation: "A colon introduces a list."
    },
    {
        id: 5,
        sentence: "It_s a beautiful day outside.",
        correctPunctuation: "'",
        options: ["'", ",", ".", "-"],
        explanation: "An apostrophe shows the contraction of 'It is'."
    },
    {
        id: 6,
        sentence: "The well_known author wrote many books.",
        correctPunctuation: "-",
        options: ["-", ",", "'", ";"],
        explanation: "A hyphen joins compound adjectives before a noun."
    },
    {
        id: 7,
        sentence: "She asked_ \"Where are you going?\"",
        correctPunctuation: ",",
        options: [",", ":", ";", "."],
        explanation: "A comma introduces direct speech."
    },
    {
        id: 8,
        sentence: "The storm was coming_ however_ we continued our hike.",
        correctPunctuation: ";",
        options: [";", ",", ":", "."],
        explanation: "Semicolons set off conjunctive adverbs like 'however'."
    },
    {
        id: 9,
        sentence: "Is this your book_",
        correctPunctuation: "?",
        options: ["?", ".", "!", ","],
        explanation: "A question mark ends a direct question."
    },
    {
        id: 10,
        sentence: "My mother_in_law is visiting next week.",
        correctPunctuation: "-",
        options: ["-", "'", ",", ";"],
        explanation: "Hyphens connect parts of compound nouns."
    },
    {
        id: 11,
        sentence: "The students_ essays were excellent.",
        correctPunctuation: "'",
        options: ["'", ",", ";", ":"],
        explanation: "An apostrophe shows plural possession."
    },
    {
        id: 12,
        sentence: "I love reading_ it relaxes me after work.",
        correctPunctuation: ";",
        options: [";", ",", ".", ":"],
        explanation: "A semicolon connects two closely related sentences."
    },
    {
        id: 13,
        sentence: "The concert was amazing_",
        correctPunctuation: "!",
        options: ["!", ".", "?", ","],
        explanation: "An exclamation mark shows enthusiasm."
    },
    {
        id: 14,
        sentence: "Dear Mr. Smith_",
        correctPunctuation: ",",
        options: [",", ":", ".", ";"],
        explanation: "A comma follows the greeting in informal letters."
    },
    {
        id: 15,
        sentence: "He said he would come_ but he never did.",
        correctPunctuation: ",",
        options: [",", ";", ":", "."],
        explanation: "A comma precedes coordinating conjunctions in compound sentences."
    }
];

export function getRandomPunctuationQuestions(count = 5) {
    const shuffled = [...punctuationQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
