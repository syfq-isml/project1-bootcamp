import React, { Component } from "react";
import { getRandomIntInclusive, getRandomWord, shuffle } from "../utils";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import llbreak from "../assets/sounds/fail.wav";
import succ808 from "../assets/sounds/succ808.wav";
import {
    Box,
    Button,
    Container,
    Stack,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    styled,
} from "@mui/material";

import SSNav from "../components/SimonSays/SSNav";
import WGPlayArea from "../components/WordGame/WGPlayArea";
import WGHeadings from "../components/WordGame/WGHeadings";
import WGScoreboards from "../components/WordGame/WGScoreboards";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

let theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        allVariants: {
            color: "white",
        },
    },
});

theme = responsiveFontSizes(theme);

const StartButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    backgroundColor: "#BC0066",
    color: "white",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#940050",
    },
});

const RestartButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    width: "fit-content",
    backgroundColor: "white",
    color: "#BC0066",
    "&:hover": {
        backgroundColor: "#F2F2F2",
    },
});

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
            previousWord: "",

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
        let outcome = getRandomIntInclusive(1, 2);

        // 2/3 chance to get a new word
        if (this.state.score < 5 || outcome !== 1) {
            let newWord = getRandomWord();
            if (newWord === this.state.previousWord) {
                console.log("Same as prev word, getting new one...");
                this.selectWord();
                return;
            }
            this.setState((prevState) => {
                return {
                    displayWord: newWord,
                };
            });
        } else {
            let newWord = shuffle([...this.state.words])[0];
            if (newWord === this.state.previousWord) {
                console.log("Same as prev word, getting new one...");
                this.selectWord();
                return;
            }

            this.setState((prevState) => {
                return {
                    displayWord: newWord,
                };
            });
        }
    };

    checkUserInput = async (e) => {
        let result = this.state.words.has(this.state.displayWord);
        if (
            (e.target.name === "seen" && result) ||
            (e.target.name === "not-seen" && !result)
        ) {
            this.successSound.play();
            this.setState(
                (prevState) => {
                    return {
                        score: prevState.score + 1,
                        words: new Set([
                            ...prevState.words,
                            prevState.displayWord,
                        ]),
                        hiScore: Math.max(
                            prevState.score + 1,
                            prevState.hiScore
                        ),
                        previousWord: prevState.displayWord,
                    };
                },
                () => this.selectWord()
            );
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
            <ThemeProvider theme={theme}>
                <Box className="WORD-GAME">
                    <Container>
                        <Stack justifyContent={"center"} alignItems={"center"}>
                            <SSNav
                                muted={this.state.muted}
                                muteSound={this.muteSound}
                            />
                            <WGHeadings />
                            <WGScoreboards
                                score={this.state.score}
                                hiScore={this.state.hiScore}
                                gameOver={this.state.gameOver}
                                livesLeft={this.state.livesLeft}
                            />

                            {this.state.atGameStart && (
                                <StartButton
                                    disableRipple
                                    onClick={this.selectWord}
                                    sx={{ mt: 3 }}
                                >
                                    Start Game
                                </StartButton>
                            )}

                            {!this.state.gameOver &&
                                !this.state.atGameStart && (
                                    <WGPlayArea
                                        checkUserInput={this.checkUserInput}
                                        displayWord={this.state.displayWord}
                                    />
                                )}
                            {this.state.gameOver && (
                                <RestartButton
                                    disableRipple
                                    onClick={this.restartGame}
                                    sx={{ mt: 3 }}
                                >
                                    Play Again?
                                </RestartButton>
                            )}
                        </Stack>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default WordGame;
