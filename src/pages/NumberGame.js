import React, { Component } from "react";
import { getRandomIntInclusive, timeout } from "../utils";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
    responsiveFontSizes,
    styled,
} from "@mui/material";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

import { isAllNumbers } from "../utils";

import SSNav from "../components/SimonSays/SSNav";
import NGHeadings from "../components/NumberGame/NGHeadings";
import NGScoreboard from "../components/NumberGame/NGScoreboard";
import NGTV from "../components/NumberGame/NGTV";
import NGPlayArea from "../components/NumberGame/NGPlayArea";
import NGGameOverElements from "../components/NumberGame/NGGameOverElements";

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

const StyledButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    backgroundColor: "#3CA60F",
    color: "white",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#3CA60F",
    },
});

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
            error: "",
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
        if (storedHiScores && storedHiScores.NG)
            this.setState({ hiScore: storedHiScores.NG });
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
                        NG: this.state.hiScore,
                    })
                );
                return;
            }

            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    NG: this.state.hiScore,
                })
            );
        }
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
        if (input === "" || !isAllNumbers(input)) {
            this.setState({ error: "Type in numbers only!" });
            return;
        }

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
        this.setState({ userInput: e.target.value, error: "" });
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
                <Box className="NUMBER-GAME">
                    <Container>
                        <Stack alignItems={"center"} justifyContent={"center"}>
                            <SSNav
                                muted={this.state.muted}
                                muteSound={this.muteSound}
                            />
                            <NGHeadings />
                            <NGScoreboard
                                currentSequence={this.state.currentSequence}
                                hiScore={this.state.hiScore}
                            />

                            <NGTV>
                                <Typography
                                    variant="h1"
                                    component="h3"
                                    fontFamily={"'Space Mono', monospace"}
                                    color={"#74D144"}
                                    // fontSize={
                                    //     this.state.currentSequence
                                    //         .length > 10
                                    //         ? "4rem"
                                    //         : "5rem"
                                    // }

                                    fontWeight={"700"}
                                    sx={{
                                        fontSize: {
                                            xs: "30px",
                                            sm: "4rem",
                                        },
                                    }}
                                >
                                    {this.state.display}
                                </Typography>
                                {this.state.userIsGuessing && (
                                    <NGPlayArea
                                        handleChange={this.handleChange}
                                        handleSubmit={this.handleSubmit}
                                        userInput={this.state.userInput}
                                    />
                                )}
                                {this.state.showLossScreen && (
                                    <NGGameOverElements
                                        currentSequence={
                                            this.state.currentSequence
                                        }
                                        userInput={this.state.userInput}
                                    />
                                )}
                            </NGTV>

                            {this.state.error !== "" && (
                                <Alert
                                    variant="filled"
                                    severity="error"
                                    sx={{
                                        backgroundColor: "#F64F4F",
                                    }}
                                >
                                    {this.state.error}
                                </Alert>
                            )}
                            {this.state.showLossScreen && (
                                <StyledButton
                                    sx={{
                                        mt: 3,
                                        backgroundColor: "white",
                                        color: "#3CA60F",
                                        "&:hover": {
                                            backgroundColor: "#F2F2F2",
                                        },
                                    }}
                                    onClick={this.restartGame}
                                >
                                    Try again?
                                </StyledButton>
                            )}
                            {this.state.level === 1 && (
                                <StyledButton
                                    sx={{ mt: 3 }}
                                    onClick={this.startGame}
                                >
                                    Start
                                </StyledButton>
                            )}
                        </Stack>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default NumberGame;
