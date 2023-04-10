import React, { Component } from "react";
import { getRandomIntInclusive, getRandomWord, shuffle } from "../utils";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import llbreak from "../assets/sounds/fail.wav";
import succ808 from "../assets/sounds/succ808.wav";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

class WordGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            livesLeft: 3,
            words: new Set(),
            displayWord: "",
            score: 0,
            hiScore: 0,
            gameOver: false,
            atGameStart: true,

            muted: false,
        };

        this.successSound = new Howl({
            src: [succ808],
        });

        this.lostLifeSound = new Howl({
            src: [llbreak],
        });

        this.failSound = new Howl({
            src: [fail808],
        });
    }

    componentDidMount() {
        Howler.mute(false);
        Howler.volume(0.25);

        const storedHiScores = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
        );
        if (storedHiScores && storedHiScores.WG)
            this.setState({ hiScore: storedHiScores.WG });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hiScore !== this.state.hiScore) {
            const storedHiScores = JSON.parse(
                localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
            );

            if (storedHiScores) {
                localStorage.setItem(
                    LOCALSTORAGE_KEY_HISCORE,
                    JSON.stringify({
                        ...storedHiScores,
                        WG: this.state.hiScore,
                    })
                );
                return;
            }

            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    WG: this.state.hiScore,
                })
            );
        }
    }

    selectWord = () => {
        // roll a dice
        this.setState({ atGameStart: false });
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
            this.successSound.play();
            await this.setState((prevState) => {
                return {
                    score: prevState.score + 1,
                    words: new Set([...prevState.words, prevState.displayWord]),
                    hiScore: Math.max(prevState.score + 1, prevState.hiScore),
                };
            });
            await this.selectWord();
        } else {
            this.setState((prevState) => {
                if (prevState.livesLeft - 1 === 0) {
                    this.failSound.play();
                    return {
                        livesLeft: 0,
                        gameOver: true,
                    };
                }
                this.lostLifeSound.play();
                return {
                    livesLeft: prevState.livesLeft - 1,
                };
            });
        }
    };

    muteSound = () => {
        this.setState({ muted: !this.state.muted }, () => {
            if (this.state.muted) {
                Howler.mute(true);
                return;
            }

            Howler.mute(false);
        });
    };

    restartGame = () => {
        this.setState({
            livesLeft: 3,
            words: new Set(),
            displayWord: "",
            score: 0,
            gameOver: false,
            atGameStart: true,
        });
    };

    render() {
        return (
            <>
                <Link to={"/"}>
                    <button>Back to main</button>
                </Link>
                <button onClick={this.muteSound}>Mute sound</button>
                {this.state.atGameStart && (
                    <button onClick={this.selectWord}>Start Game</button>
                )}

                <h2>
                    Lives left:{" "}
                    {this.state.gameOver
                        ? "💀"
                        : Array(this.state.livesLeft).fill("❤")}
                </h2>
                <h2>Score: {this.state.score}</h2>
                <h2>HiScore: {this.state.hiScore}</h2>
                <h1>Have you seen this word?</h1>
                <br />
                {this.state.gameOver ? (
                    <button onClick={this.restartGame}>Play Again?</button>
                ) : (
                    <>
                        {!this.state.atGameStart && (
                            <>
                                <h1>{this.state.displayWord}</h1>
                                <h1>{this.state.words}</h1>
                                <br />
                                <button
                                    name="seen"
                                    onClick={this.checkUserInput}
                                >
                                    SEEN
                                </button>
                                <button
                                    name="not-seen"
                                    onClick={this.checkUserInput}
                                >
                                    NOT YET SEEN
                                </button>
                            </>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default WordGame;
