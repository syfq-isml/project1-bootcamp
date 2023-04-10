import React, { Component } from "react";
import SSButton from "../components/SimonSays/SSButton";
import { getRandomIntInclusive, timeout } from "../utils";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

let emptyArray = new Array(9).fill("");

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

class SimonSaysGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSequence: [],
            currentButtonToLightUp: 11,
            hiScore: 0,
            playerIsGuessing: false,
            steps: 0,
            announcement: "",
            showNextButton: true,

            muted: false,
        };

        this.successSound = new Howl({
            src: [succ808],
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
        if (storedHiScores && storedHiScores.SS)
            this.setState({ hiScore: storedHiScores.SS });
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
                        SS: this.state.hiScore,
                    })
                );
                return;
            }

            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    SS: this.state.hiScore,
                })
            );
        }
    }

    generateSequence = () => {
        let randomNumber = getRandomIntInclusive(0, 8);
        if (
            randomNumber ===
            this.state.currentSequence[this.state.currentSequence.length - 1]
        ) {
            this.generateSequence();
            return;
        }
        this.setState((prevState) => {
            return {
                currentSequence: [...prevState.currentSequence, randomNumber],
            };
        });
    };

    lightUpButtonsInSequence = () => {
        for (let i = 0; i < this.state.currentSequence.length; i++) {
            setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        currentButtonToLightUp: prevState.currentSequence[i],
                    };
                });
                console.log(
                    "Button to light up: " + this.state.currentButtonToLightUp
                );
            }, i * 1000);
        }
    };

    handleGameStart = async () => {
        await this.setState({
            currentButtonToLightUp: 11,
            announcement: "",
            showNextButton: false,
        });
        await this.generateSequence();
        await timeout(1000);
        await this.lightUpButtonsInSequence();
        await timeout(1000 * this.state.currentSequence.length);
        await this.setState({ playerIsGuessing: true });
    };

    checkCorrectInput = (id) => {
        if (this.state.currentSequence[this.state.steps] !== id) {
            this.failSound.play();
            this.setState({ announcement: "Wrong!" });
            this.restartGame();
            return;
        }

        this.setState(
            (prevState) => {
                return {
                    steps: prevState.steps + 1,
                };
            },
            () => {
                if (this.state.steps === this.state.currentSequence.length) {
                    this.successSound.play();
                    this.setState(
                        (prevState) => {
                            return {
                                announcement: "Round won!",
                                steps: 0,
                                showNextButton: true,
                                playerIsGuessing: false,
                                hiScore: Math.max(
                                    prevState.hiScore,
                                    prevState.currentSequence.length
                                ),
                            };
                        },
                        () => this.handleGameStart()
                    );
                }
            }
        );
    };

    restartGame = () => {
        this.setState({
            currentSequence: [],
            currentButtonToLightUp: 11,
            highScore: 0,
            playerIsGuessing: false,
            steps: 0,
            showNextButton: true,
        });
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

    render() {
        return (
            <>
                <Link to={"/"}>
                    <button>Back to main</button>
                </Link>
                <button onClick={this.muteSound}>Mute sound</button>
                <h1>Level: {this.state.currentSequence.length}</h1>
                <h2>HiScore: {this.state.hiScore}</h2>
                {this.state.showNextButton && (
                    <button onClick={this.handleGameStart}>Start Game</button>
                )}
                <h1>{this.state.announcement}</h1>
                <div
                    style={{
                        display: "flex",
                        width: "700px",
                        height: "700px",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {emptyArray.map((elem, index) => {
                        return (
                            <SSButton
                                key={index}
                                id={index}
                                isDisabled={!this.state.playerIsGuessing}
                                toLightUp={this.state.currentButtonToLightUp}
                                onCheckCorrectInput={this.checkCorrectInput}
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}

export default SimonSaysGame;
