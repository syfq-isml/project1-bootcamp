import React, { Component } from "react";
import SSButton from "../components/SimonSays/SSButton";
import { getRandomIntInclusive, timeout } from "../utils";

let emptyArray = new Array(9).fill("");

class SimonSaysGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSequence: [],
            currentButtonToLightUp: 11,
            highScore: 0,
            playerIsGuessing: false,
            steps: 0,
            announcement: "",
            showNextButton: true,
        };
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
        await this.lightUpButtonsInSequence();
        await timeout(1000 * this.state.currentSequence.length);
        await this.setState({ playerIsGuessing: true });
    };

    checkCorrectInput = (id) => {
        if (this.state.currentSequence[this.state.steps] !== id) {
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
                    this.setState({
                        announcement: "Round won!",
                        steps: 0,
                        showNextButton: true,
                        playerIsGuessing: false,
                    });
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

    render() {
        return (
            <>
                <h1>Level: {this.state.currentSequence.length}</h1>
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
