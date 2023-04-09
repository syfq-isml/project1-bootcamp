import React, { Component } from "react";
import { getArrayOfWords, shuffle } from "../utils";
import NRCards from "../components/NoRepeatGame/NRCards";
import { Link } from "react-router-dom";

class NoRepeatGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            hiScore: 0,
            wordsArray: getArrayOfWords(16),
            alreadyClicked: [],
            isGameOver: false,
            lastClickedWord: "",
        };
    }

    handleClick = (word) => {
        if (this.state.alreadyClicked.includes(word)) {
            console.log("Lose and restart");
            this.setState({ isGameOver: true, lastClickedWord: word });
        } else {
            this.setState((prevState) => {
                return {
                    score: prevState.score + 1,
                    hiScore: Math.max(prevState.score + 1, prevState.hiScore),
                    wordsArray: [...shuffle(prevState.wordsArray)],
                    alreadyClicked: [...prevState.alreadyClicked, word],
                };
            });
        }

        // let newHighScore = Math.max(this.state.score, this.state.hiScore);
        // this.setState({ hiScore: newHighScore });
    };

    restartGame = () => {
        this.setState({
            score: 0,
            wordsArray: getArrayOfWords(16),
            alreadyClicked: [],
            isGameOver: false,
        });
    };

    render() {
        return (
            <>
                <Link to={"/"}>
                    <button>Back to main</button>
                </Link>
                <h1>Click on each card exactly once!</h1>
                <h2>Score: {this.state.score}</h2>
                <h2>HiScore: {this.state.hiScore}</h2>

                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        width: "450px",
                        flexWrap: "wrap",
                    }}
                >
                    {this.state.wordsArray.map((word) => {
                        let bool = this.state.alreadyClicked.includes(word);

                        return (
                            <NRCards
                                key={`00x${word}`}
                                word={word}
                                onClick={this.handleClick}
                                isGameOver={this.state.isGameOver}
                                isAlreadyClicked={bool}
                            />
                        );
                    })}
                </div>
                {this.state.isGameOver && (
                    <>
                        <h2>
                            Oops, you've clicked '{this.state.lastClickedWord}'{" "}
                            twice.
                        </h2>
                        <button onClick={this.restartGame}>Play again</button>
                    </>
                )}
            </>
        );
    }
}

export default NoRepeatGame;
