function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function timeout(timing) {
    return new Promise((resolve) => setTimeout(resolve, timing));
}

export { getRandomIntInclusive, timeout };
