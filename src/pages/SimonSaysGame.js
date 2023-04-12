import React, { Component } from "react";
import SSButton from "../components/SimonSays/SSButton";
import { getRandomIntInclusive, timeout } from "../utils";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

import xyloSounds from "../assets/sounds/xylo/xyloSounds.mp3";
import SSNav from "../components/SimonSays/SSNav";
import {
    Box,
    Button,
    Container,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import SSScoreboard from "../components/SimonSays/SSScoreboard";
import styled from "@emotion/styled";

let emptyArray = new Array(9).fill("");

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        allVariants: {
            color: "white",
        },
    },
});

const StyledButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    backgroundColor: "#0D4C85",
    color: "white",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#0B3B66",
    },
});

class SimonSaysGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSequence: [],
            currentButtonToLightUp: 11,
            hiScore: 0,
            playerIsGuessing: false,
            steps: 0,
            isGameOver: false,
            showNextButton: true,
            lastLitButton: 11,

            muted: false,
        };

        this.successSound = new Howl({
            src: [succ808],
        });

        this.failSound = new Howl({
            src: [fail808],
        });

        this.xyloSound = new Howl({
            src: [xyloSounds],
            sprite: {
                xylo1: [0, 755.9863945578231],
                xylo2: [2000, 961.609977324263],
                xylo3: [4000, 491.38321995464815],
                xylo4: [6000, 530.4535147392287],
                xylo5: [8000, 547.913832199546],
                xylo6: [10000, 564.1269841269842],
                xylo7: [12000, 355.9637188208615],
                xylo8: [14000, 484.6712018140593],
                xylo9: [16000, 427.46031746031576],
            },
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
        this.setState((prevState) => {
            return {
                currentSequence: [...prevState.currentSequence, randomNumber],
            };
        });
    };

    lightUpButtonsInSequence = () => {
        for (let i = 0; i < this.state.currentSequence.length; i++) {
            setTimeout(() => {
                this.setState(
                    (prevState) => {
                        return {
                            currentButtonToLightUp: `${
                                prevState.currentSequence[i]
                            }${String.fromCharCode(97 + i)}`,
                        };
                    },
                    () => {
                        let buttonId = this.state.currentButtonToLightUp[0];
                        this.xyloSound.play(`xylo${+buttonId + 1}`);
                    }
                );
                console.log(
                    "Button to light up: " + this.state.currentButtonToLightUp
                );
            }, i * 1000);
        }
    };

    handleGameStart = async () => {
        await this.setState({
            currentButtonToLightUp: 11,
            showNextButton: false,
            isGameOver: false,
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
            this.setState({
                isGameOver: true,
                lastLitButton: this.state.currentSequence[this.state.steps],
            });
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
                    // setTimeout(() => this.successSound.play(), 150);
                    this.setState(
                        (prevState) => {
                            return {
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
            // isGameOver: false,
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

    handleTest = () => {
        this.xyloSound.play("xylo1");
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box className="SIMON-SAYS">
                    <Container>
                        <Stack alignItems={"center"} justifyContent={"center"}>
                            <SSNav
                                muted={this.state.muted}
                                muteSound={this.muteSound}
                            />
                            <Typography
                                variant="h3"
                                fontWeight={"700"}
                                textAlign={"center"}
                            >
                                How long can you go?
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={"400"}
                                textAlign={"center"}
                            >
                                Memorize the pattern and click them in sequence.
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={"400"}
                                textAlign={"center"}
                            >
                                The pattern gets longer every time you get it
                                right.
                            </Typography>
                            <Typography
                                variant="h5"
                                fontWeight={"400"}
                                textAlign={"center"}
                            >
                                1 mistake and you're out!
                            </Typography>

                            <SSScoreboard
                                level={this.state.currentSequence.length}
                                hiScore={this.state.hiScore}
                                color="blue"
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    width: "700px",
                                    flexWrap: "wrap",
                                    gap: "1rem",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {emptyArray.map((elem, index) => {
                                    return (
                                        <SSButton
                                            key={index}
                                            id={index}
                                            isDisabled={
                                                !this.state.playerIsGuessing
                                            }
                                            toLightUp={
                                                this.state
                                                    .currentButtonToLightUp
                                            }
                                            onCheckCorrectInput={
                                                this.checkCorrectInput
                                            }
                                            isGameOver={this.state.isGameOver}
                                            lastLight={this.state.lastLitButton}
                                        />
                                    );
                                })}
                            </Box>
                            {this.state.showNextButton && (
                                <StyledButton
                                    disableRipple
                                    onClick={this.handleGameStart}
                                    sx={{
                                        mt: 3,
                                    }}
                                >
                                    Start Game
                                </StyledButton>
                            )}
                            {this.state.isGameOver && (
                                <StyledButton
                                    disableRipple
                                    onClick={this.handleGameStart}
                                    sx={{
                                        mt: 3,
                                        backgroundColor: "white",
                                        color: "#1164AF",
                                        "&:hover": {
                                            backgroundColor: "#F2F2F2",
                                        },
                                    }}
                                >
                                    Play Again
                                </StyledButton>
                            )}
                        </Stack>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default SimonSaysGame;
