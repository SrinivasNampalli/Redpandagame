// SAT English themed puzzle sets
// Each puzzle has 4 categories of 4 words

export const puzzles = [
    {
        id: 'vocab-001',
        title: 'Word Relationships',
        description: 'Group words by their shared meaning',
        categories: [
            {
                name: 'WORDS MEANING "ANGRY"',
                words: ['IRATE', 'LIVID', 'FURIOUS', 'INCENSED'],
                difficulty: 1,
                color: 'yellow'
            },
            {
                name: 'WORDS MEANING "HAPPY"',
                words: ['ELATED', 'JUBILANT', 'ECSTATIC', 'GLEEFUL'],
                difficulty: 2,
                color: 'green'
            },
            {
                name: 'WORDS MEANING "SAD"',
                words: ['MOROSE', 'DEJECTED', 'MELANCHOLY', 'DISMAL'],
                difficulty: 3,
                color: 'blue'
            },
            {
                name: 'WORDS MEANING "SCARED"',
                words: ['PETRIFIED', 'AGHAST', 'DAUNTED', 'ANXIOUS'],
                difficulty: 4,
                color: 'purple'
            }
        ]
    },
    {
        id: 'grammar-001',
        title: 'Parts of Speech',
        description: 'Group words by how they function in a sentence',
        categories: [
            {
                name: 'CONJUNCTIONS',
                words: ['ALTHOUGH', 'BECAUSE', 'WHEREAS', 'UNLESS'],
                difficulty: 1,
                color: 'yellow'
            },
            {
                name: 'PREPOSITIONS',
                words: ['BENEATH', 'AMID', 'THROUGHOUT', 'DESPITE'],
                difficulty: 2,
                color: 'green'
            },
            {
                name: 'ADVERBS',
                words: ['SWIFTLY', 'MERELY', 'SCARCELY', 'THOROUGHLY'],
                difficulty: 3,
                color: 'blue'
            },
            {
                name: 'INTERJECTIONS',
                words: ['ALAS', 'BRAVO', 'EUREKA', 'HURRAH'],
                difficulty: 4,
                color: 'purple'
            }
        ]
    },
    {
        id: 'vocab-002',
        title: 'SAT Power Words',
        description: 'Find the connection between these SAT vocabulary words',
        categories: [
            {
                name: 'MEANS "TO CRITICIZE HARSHLY"',
                words: ['DENOUNCE', 'LAMBASTE', 'CASTIGATE', 'REBUKE'],
                difficulty: 1,
                color: 'yellow'
            },
            {
                name: 'MEANS "TO PRAISE HIGHLY"',
                words: ['EXTOL', 'LAUD', 'EXALT', 'ACCLAIM'],
                difficulty: 2,
                color: 'green'
            },
            {
                name: 'MEANS "TO WEAKEN"',
                words: ['UNDERMINE', 'ENERVATE', 'DEBILITATE', 'SAP'],
                difficulty: 3,
                color: 'blue'
            },
            {
                name: 'MEANS "TO STRENGTHEN"',
                words: ['BOLSTER', 'FORTIFY', 'REINFORCE', 'BUTTRESS'],
                difficulty: 4,
                color: 'purple'
            }
        ]
    },
    {
        id: 'literary-001',
        title: 'Literary Devices',
        description: 'Match words to their literary category',
        categories: [
            {
                name: 'TYPES OF IRONY',
                words: ['VERBAL', 'DRAMATIC', 'SITUATIONAL', 'COSMIC'],
                difficulty: 1,
                color: 'yellow'
            },
            {
                name: 'FIGURATIVE LANGUAGE',
                words: ['SIMILE', 'METAPHOR', 'HYPERBOLE', 'PERSONIFICATION'],
                difficulty: 2,
                color: 'green'
            },
            {
                name: 'SOUND DEVICES',
                words: ['ALLITERATION', 'ASSONANCE', 'CONSONANCE', 'ONOMATOPOEIA'],
                difficulty: 3,
                color: 'blue'
            },
            {
                name: 'NARRATIVE TECHNIQUES',
                words: ['FORESHADOWING', 'FLASHBACK', 'JUXTAPOSITION', 'PARALLELISM'],
                difficulty: 4,
                color: 'purple'
            }
        ]
    },
    {
        id: 'transitions-001',
        title: 'Transition Words',
        description: 'Group transition words by their purpose',
        categories: [
            {
                name: 'SHOW CONTRAST',
                words: ['HOWEVER', 'NEVERTHELESS', 'CONVERSELY', 'NOTWITHSTANDING'],
                difficulty: 1,
                color: 'yellow'
            },
            {
                name: 'SHOW ADDITION',
                words: ['FURTHERMORE', 'MOREOVER', 'ADDITIONALLY', 'LIKEWISE'],
                difficulty: 2,
                color: 'green'
            },
            {
                name: 'SHOW CAUSE/EFFECT',
                words: ['CONSEQUENTLY', 'THEREFORE', 'HENCE', 'ACCORDINGLY'],
                difficulty: 3,
                color: 'blue'
            },
            {
                name: 'SHOW EMPHASIS',
                words: ['INDEED', 'CERTAINLY', 'UNDOUBTEDLY', 'NOTABLY'],
                difficulty: 4,
                color: 'purple'
            }
        ]
    },
    {
        id: 'vocab-003',
        title: 'Tone Words',
        description: 'Match words used to describe author\'s tone',
        categories: [
            {
                name: 'POSITIVE TONES',
                words: ['OPTIMISTIC', 'REVERENT', 'EARNEST', 'WHIMSICAL'],
                difficulty: 1,
                color: 'yellow'
            },
            {
                name: 'NEGATIVE TONES',
                words: ['SARDONIC', 'CONDESCENDING', 'DISMISSIVE', 'CYNICAL'],
                difficulty: 2,
                color: 'green'
            },
            {
                name: 'NEUTRAL TONES',
                words: ['OBJECTIVE', 'DETACHED', 'IMPARTIAL', 'PRAGMATIC'],
                difficulty: 3,
                color: 'blue'
            },
            {
                name: 'EMOTIONAL TONES',
                words: ['NOSTALGIC', 'WISTFUL', 'IMPASSIONED', 'FERVENT'],
                difficulty: 4,
                color: 'purple'
            }
        ]
    }
];

// Shuffle words for gameplay
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get all words from a puzzle, shuffled
export function getPuzzleWords(puzzle) {
    const allWords = puzzle.categories.flatMap(cat =>
        cat.words.map(word => ({ word, category: cat.name, color: cat.color }))
    );
    return shuffleArray(allWords);
}

// Check if selected words form a valid category
export function checkCategory(puzzle, selectedWords) {
    const wordStrings = selectedWords.map(w => w.word);

    for (const category of puzzle.categories) {
        const categoryWords = category.words;
        const matchCount = wordStrings.filter(w => categoryWords.includes(w)).length;

        if (matchCount === 4) {
            return { correct: true, category };
        }
        if (matchCount === 3) {
            return { correct: false, closeMatch: true, category };
        }
    }

    return { correct: false, closeMatch: false };
}

// Get a random puzzle
export function getRandomPuzzle(excludeIds = []) {
    const available = puzzles.filter(p => !excludeIds.includes(p.id));
    if (available.length === 0) return puzzles[0];
    return available[Math.floor(Math.random() * available.length)];
}
