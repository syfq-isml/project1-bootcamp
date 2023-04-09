import React, { Component } from "react";
import { getRandomIntInclusive, timeout } from "../utils";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

const LOCALSTORAGE_KEY_HISCORE = "hiScore_NG";

class NumberGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            currentSequence: [],
            level: 1,
            hiScore: 0,
            display: "",
            userIsGuessing: false,
            showLossScreen: false,

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

        const storedHiScore = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
        );
        if (storedHiScore) this.setState({ hiScore: storedHiScore });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hiScore !== this.state.hiScore)
            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify(this.state.hiScore)
            );
    }

    generateSequence = () => {
        let randomNumber = [];
        for (let i = 0; i < this.state.level; i++) {
            randomNumber.push(getRandomIntInclusive(0, 9));
        }

        this.setState((prevState) => {
            return {
                currentSequence: [...randomNumber],
                level: prevState.level + 1,
                hiScore: Math.max(
                    this.state.currentSequence.length,
                    prevState.hiScore
                ),
            };
        });
    };

    startGame = async () => {
        await this.generateSequence();
        await this.setState({
            display: this.state.currentSequence,
            userIsGuessing: false,
            userInput: "",
        });
        await timeout(this.state.currentSequence.length * 1000);
        await this.setState({ display: "", userIsGuessing: true });
    };

    restartGame = () => {
        this.setState({
            userInput: "",
            currentSequence: [],
            level: 1,
            display: "",
            userIsGuessing: false,
            showLossScreen: false,

            muted: false,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let input = this.state.userInput.trim();
        if (input === "") return;

        if (input === this.state.currentSequence.join("")) {
            this.successSound.play();
            this.startGame();
        } else {
            this.failSound.play();
            this.setState((prevState) => {
                return {
                    userIsGuessing: false,
                    showLossScreen: true,
                };
            });
        }
    };

    handleChange = (e) => {
        this.setState({ userInput: e.target.value });
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
                {this.state.level === 1 && (
                    <button onClick={this.startGame}>Start Game</button>
                )}
                <h1>Level: {this.state.currentSequence.length || 1}</h1>
                <h2>{this.state.hiScore}</h2>
                <h1>{this.state.display}</h1>
                {this.state.userIsGuessing && (
                    <>
                        <h1>What was the number?</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.userInput}
                            ></input>
                        </form>
                    </>
                )}
                {this.state.showLossScreen && (
                    <>
                        <h1>Oops, your number was</h1>
                        <h1>{this.state.currentSequence}</h1>
                        <h1>You've entered</h1>
                        <h1>{this.state.userInput}</h1>
                        <h1>
                            You memorized a total of{" "}
                            {this.state.currentSequence.length - 1} numbers this
                            round.
                        </h1>
                        <h1>Your best was {this.state.hiScore} numbers!</h1>
                        <button onClick={this.restartGame}>Try again?</button>
                    </>
                )}
            </>
        );
    }
}

export default NumberGame;
