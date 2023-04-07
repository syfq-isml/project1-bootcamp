import words from "./data/words.json";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function timeout(timing) {
    return new Promise((resolve) => setTimeout(resolve, timing));
}

const getRandomWord = () => {
    // Lowercase words for simplicity
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export { getRandomIntInclusive, timeout, getRandomWord, shuffle };
