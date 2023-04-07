import React, { Component } from "react";
import { getRandomIntInclusive, getRandomWord, shuffle } from "../utils";

class WordGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livesLeft: 3,
            words: new Set(),
            displayWord: "",
            score: 0,
            gameOver: false,
            testArr: new Set([1, 2, 3, 4]),
        };
    }

    selectWord = () => {
        // roll a dice
        let outcome = getRandomIntInclusive(1, 3);

        // 2/3 chance to get a new word
        if (this.state.score < 5 || outcome !== 1) {
            let newWord = getRandomWord();
            this.setState((prevState) => {
                return {
                    displayWord: newWord,
                };
            });
        } else {
            let newWord = shuffle([...this.state.words])[0];
            this.setState((prevState) => {
                return {
                    displayWord: newWord,
                };
            });
        }

        // (1/3 chance to get show a duplicate)
    };

    checkUserInput = async (e) => {
        let result = this.state.words.has(this.state.displayWord);
        if (
            (e.target.name === "seen" && result) ||
            (e.target.name === "not-seen" && !result)
        ) {
            await this.setState((prevState) => {
                return {
                    score: prevState.score + 1,
                    words: new Set([...prevState.words, prevState.displayWord]),
                };
            });
            await this.selectWord();
        } else {
            this.setState((prevState) => {
                if (prevState.livesLeft - 1 === 0) {
                    return {
                        livesLeft: 0,
                        gameOver: true,
                    };
                }
                return {
                    livesLeft: prevState.livesLeft - 1,
                };
            });
        }
    };

    render() {
        return (
            <>
                <button onClick={this.selectWord}>Start Game</button>
                <h2>Lives left: {this.state.livesLeft}</h2>
                <h2>Score: {this.state.score}</h2>
                <h1>Have you seen this word?</h1>
                <br />
                <h1>{this.state.displayWord}</h1>
                <h1>{this.state.words}</h1>
                <br />
                <button name="seen" onClick={this.checkUserInput}>
                    SEEN
                </button>
                <button name="not-seen" onClick={this.checkUserInput}>
                    NOT YET SEEN
                </button>
            </>
        );
    }
}

export default WordGame;
