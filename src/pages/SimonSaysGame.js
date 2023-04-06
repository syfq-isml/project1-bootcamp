import React, { Component } from "react";
import SSButton from "../components/SimonSays/SSButton";
import { getRandomIntInclusive } from "../utils";

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
        };
    }

    generateSequence = () => {
        let randomNumber = getRandomIntInclusive(0, 8);
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
                console.log("changing button in state");
            }, i * 1200);
        }
    };

    handleGameStart = async () => {
        await this.setState({ currentButtonToLightUp: 11 });
        await this.generateSequence();
        console.log("Sequece generated");
        await this.lightUpButtonsInSequence();
    };

    render() {
        return (
            <>
                <h1>Level: {this.state.currentSequence.length}</h1>
                <button onClick={this.handleGameStart}>Start Game</button>
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
                                key={crypto.randomUUID()}
                                id={index}
                                isDisabled={this.state.playerIsGuessing}
                                toLightUp={this.state.currentButtonToLightUp}
                            />
                        );
                    })}
                    {/* <SSButton id="0" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="1" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="2" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="3" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="4" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="5" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="6" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="7" isDisabled={this.state.playerIsGuessing} triggerMe={}/>
                    <SSButton id="8" isDisabled={this.state.playerIsGuessing} triggerMe={}/> */}
                </div>
            </>
        );
    }
}

export default SimonSaysGame;
