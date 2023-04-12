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
    styled,
} from "@mui/material";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

import { isAllNumbers } from "../utils";

import BackButton from "../components/Shared/BackButton";
import MuteButton from "../components/Shared/MuteButton";
import InfoButton from "../components/Shared/InfoButton";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        allVariants: {
            color: "white",
        },
    },
});

const fontChange = createTheme({
    typography: {
        fontFamily: ["Space Mono", "monospace"].join(","),
        allVariants: {
            color: "#74D144",
        },
    },
});

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
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                width={"100%"}
                                mt={3}
                            >
                                <Link to={"/"}>
                                    <BackButton />
                                </Link>
                                <Stack direction={"row"} spacing={2}>
                                    <InfoButton />
                                    <MuteButton
                                        onClick={this.muteSound}
                                        muted={this.state.muted}
                                    />
                                </Stack>
                            </Stack>
                            <Typography variant="h3" fontWeight={"700"} mt={3}>
                                Try to remember the longest number you can.
                            </Typography>
                            <Typography variant="h4" fontWeight={"400"}>
                                The average person can remember 7 numbers at
                                once.
                            </Typography>
                            <Typography variant="h4" fontWeight={"400"}>
                                Can{" "}
                                <strong>
                                    <em>you</em>
                                </strong>{" "}
                                do more?
                            </Typography>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-evenly"}
                                width={"100%"}
                                padding={2}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor:
                                            "rgb(255, 255, 255, 0.2)",
                                        px: 2,
                                        py: 1,
                                    }}
                                >
                                    <Typography variant="h5" color={"white"}>
                                        Level:{" "}
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                display: "inline-flex",
                                                fontWeight: "700",
                                                color: "#3CA60F",
                                            }}
                                        >
                                            {this.state.currentSequence
                                                .length || 1}
                                        </Typography>
                                    </Typography>
                                </Paper>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor:
                                            "rgb(255, 255, 255, 0.2)",
                                        px: 2,
                                        py: 1,
                                    }}
                                >
                                    <Typography variant="h5">
                                        HiScore:{" "}
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                display: "inline-flex",
                                                fontWeight: "700",
                                                color: "#3CA60F",
                                            }}
                                        >
                                            {this.state.hiScore}
                                        </Typography>
                                    </Typography>
                                </Paper>
                            </Stack>

                            <Paper
                                sx={{
                                    backgroundColor: "#BAB6AE",
                                    padding: "1.5rem",
                                    height: "300px",
                                    width: "80%",
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        backgroundColor: "#2E2B26",
                                        color: "#74D144",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "'Inconsolata', monospace",
                                    }}
                                >
                                    <ThemeProvider theme={fontChange}>
                                        <Typography
                                            variant="h1"
                                            component="h3"
                                            fontFamily={
                                                "'Space Mono', monospace"
                                            }
                                            color={"#74D144"}
                                            fontSize={
                                                this.state.currentSequence
                                                    .length > 10
                                                    ? "4rem"
                                                    : "5rem"
                                            }
                                            fontWeight={"700"}
                                        >
                                            {this.state.display}
                                        </Typography>
                                        {this.state.userIsGuessing && (
                                            <Stack
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                            >
                                                <Typography
                                                    variant="h4"
                                                    component={"h3"}
                                                    color={"inherit"}
                                                    fontFamily={"inherit"}
                                                >
                                                    What was the number?
                                                </Typography>
                                                <form
                                                    onSubmit={this.handleSubmit}
                                                    className="fl-col fl-centered"
                                                >
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        value={
                                                            this.state.userInput
                                                        }
                                                    ></input>
                                                </form>
                                            </Stack>
                                        )}
                                        {this.state.showLossScreen && (
                                            <Stack
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Typography variant="h4">
                                                    Oops, your number was
                                                </Typography>
                                                <Typography
                                                    variant="h3"
                                                    fontWeight={"700"}
                                                >
                                                    {this.state.currentSequence}
                                                </Typography>
                                                <Typography variant="h4">
                                                    You've entered
                                                </Typography>
                                                <Typography
                                                    variant="h3"
                                                    fontWeight={"700"}
                                                >
                                                    {this.state.userInput}
                                                </Typography>
                                            </Stack>
                                        )}
                                    </ThemeProvider>
                                </Paper>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    spacing={1}
                                    mt={0.75}
                                >
                                    <Paper
                                        sx={{
                                            borderRadius: "50%",
                                            backgroundColor: "red",
                                            width: "10px",
                                            height: "10px",
                                        }}
                                    />
                                    <Paper
                                        sx={{
                                            borderRadius: "50%",
                                            backgroundColor: "green",
                                            width: "10px",
                                            height: "10px",
                                        }}
                                    />
                                    <Paper
                                        sx={{
                                            borderRadius: "50%",
                                            backgroundColor: "orange",
                                            width: "10px",
                                            height: "10px",
                                        }}
                                    />
                                </Stack>
                            </Paper>
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
                                // <Stack
                                //     alignItems={"center"}
                                //     justifyContent={"center"}
                                // >
                                //     <Typography variant="h4">
                                //         You memorized a total of{" "}
                                //         {this.state.currentSequence.length - 1}{" "}
                                //         numbers this round.
                                //     </Typography>
                                //     <h1>
                                //         Your best was {this.state.hiScore}{" "}
                                //         numbers!
                                //     </h1>
                                //     </Stack>
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
                                <>
                                    <StyledButton
                                        sx={{ mt: 3 }}
                                        onClick={this.startGame}
                                    >
                                        Start
                                    </StyledButton>
                                </>
                            )}
                        </Stack>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default NumberGame;
