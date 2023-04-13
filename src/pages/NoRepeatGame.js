import React, { Component } from "react";
import { getArrayOfWords, shuffle } from "../utils";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

import {
    Box,
    Container,
    Stack,
    ThemeProvider,
    createTheme,
} from "@mui/material";

import NRCards from "../components/NoRepeatGame/NRCards";
import SSNav from "../components/SimonSays/SSNav";
import NRHeadings from "../components/NoRepeatGame/NRHeadings";
import NRScoreboard from "../components/NoRepeatGame/NRScoreboard";
import NRGameOverElements from "../components/NoRepeatGame/NRGameOverElements";
import NRGameWonElements from "../components/NoRepeatGame/NRGameWonElements";
import NRCardsWrapper from "../components/NoRepeatGame/NRCardsWrapper";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        allVariants: {
            color: "white",
        },
    },
});

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
            isGameWon: false,

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
        if (storedHiScores && storedHiScores.NR)
            this.setState({ hiScore: storedHiScores.NR });
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
                        NR: this.state.hiScore,
                    })
                );
                return;
            }

            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    NR: this.state.hiScore,
                })
            );
        }
    }

    handleClick = (word) => {
        if (this.state.alreadyClicked.includes(word)) {
            console.log("Lose and restart");
            this.failSound.play();
            this.setState({ isGameOver: true, lastClickedWord: word });
        } else {
            this.successSound.play();
            this.setState(
                (prevState) => {
                    return {
                        score: prevState.score + 1,
                        hiScore: Math.max(
                            prevState.score + 1,
                            prevState.hiScore
                        ),
                        wordsArray: [...shuffle(prevState.wordsArray)],
                        alreadyClicked: [...prevState.alreadyClicked, word],
                    };
                },
                () => {
                    if (
                        this.state.wordsArray.length ===
                        this.state.alreadyClicked.length
                    ) {
                        this.setState({ isGameWon: true });
                        return;
                    }
                }
            );
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
            isGameWon: false,
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
            <ThemeProvider theme={theme}>
                <Box className="NO-REPEAT">
                    <Container>
                        <Box alignItems={"center"} justifyContent={"center"}>
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <SSNav
                                    muted={this.state.muted}
                                    muteSound={this.muteSound}
                                />
                                <NRHeadings />
                                <NRScoreboard
                                    score={this.state.score}
                                    hiScore={this.state.hiScore}
                                />

                                <NRCardsWrapper>
                                    {!this.state.isGameWon &&
                                        this.state.wordsArray.map((word) => {
                                            let bool =
                                                this.state.alreadyClicked.includes(
                                                    word
                                                );

                                            return (
                                                <NRCards
                                                    key={`00x${word}`}
                                                    word={word}
                                                    onClick={this.handleClick}
                                                    isGameOver={
                                                        this.state.isGameOver
                                                    }
                                                    isAlreadyClicked={bool}
                                                />
                                            );
                                        })}
                                </NRCardsWrapper>

                                {this.state.isGameOver && (
                                    <NRGameOverElements
                                        lastClickedWord={
                                            this.state.lastClickedWord
                                        }
                                        restartGame={this.restartGame}
                                    />
                                )}

                                {this.state.isGameWon && (
                                    <NRGameWonElements
                                        restartGame={this.restartGame}
                                    />
                                )}
                            </Stack>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default NoRepeatGame;
