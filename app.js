const fs = require('fs');
const chalk = require('chalk');  // Use CommonJS instead of ESM


/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    try {
        return fs.readFileSync('declaration.txt', 'utf8');
    } catch (error) {
        console.error('Error reading file:', error);
        process.exit(1);
    }
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    const wordCount = {};
    const words = content
        .toLowerCase()
        .replace(/[^a-z\s]/g, '') // Remove punctuation
        .split(/\s+/)
        .filter(Boolean); // Remove empty strings

    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    if (count === 1) return chalk.blue(word);
    if (count >= 2 && count <= 5) return chalk.green(word);
    return chalk.red(word);
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    // Split the file into lines
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        // Split on non-word chars, filter out empties
        const words = line.split(/\W+/).filter(Boolean);

        // Convert each word to its colored variant
        const coloredWords = words.map((rawWord) => {
            // Lowercase for the frequency lookup
            const lower = rawWord.toLowerCase();
            const freq = wordCount[lower] || 0;
            // Color the original word OR the cleaned word
            return colorWord(rawWord, freq);
        });

        // Join with spaces and add a trailing space
        const finalLine = coloredWords.join(' ') + ' ';
        console.log(finalLine);
    }
}





/**
 * Main function to read the file, count the word occurrences, and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

// Only execute when running directly
if (require.main === module) {
    processFile();
}

// Export functions for testing
module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines
};
