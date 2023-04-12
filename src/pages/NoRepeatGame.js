import React, { Component } from "react";
import { getArrayOfWords, shuffle } from "../utils";
import NRCards from "../components/NoRepeatGame/NRCards";
import { Link } from "react-router-dom";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";
import BackButton from "../components/Shared/BackButton";
import InfoButton from "../components/Shared/InfoButton";
import MuteButton from "../components/Shared/MuteButton";
import {
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

import doggo from "../assets/images/dog.png";

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
    backgroundColor: "white",
    color: "#F07C31",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#F3F2F2",
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

                                <Typography
                                    variant="h4"
                                    fontWeight={"700"}
                                    textAlign={"center"}
                                >
                                    Click on each card exactly once!
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
                                        <Typography variant="h5">
                                            Score:{" "}
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    display: "inline-flex",
                                                    fontWeight: "700",
                                                    color: "#F56100",
                                                }}
                                            >
                                                {this.state.score}
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
                                                    color: "#F56100",
                                                }}
                                            >
                                                {this.state.hiScore}
                                            </Typography>
                                        </Typography>
                                    </Paper>
                                </Stack>

                                <Box
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    sx={{
                                        display: "flex",
                                        gap: "1rem",
                                        width: { sm: "700px", xs: "300px" },
                                        flexWrap: "wrap",
                                    }}
                                >
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
                                </Box>
                                {this.state.isGameOver && (
                                    <Stack
                                        spacing={2}
                                        alignItems={"center"}
                                        mt={2}
                                    >
                                        <Typography
                                            variant="h4"
                                            fontWeight={700}
                                            mt={2}
                                            mb={2}
                                        >
                                            ❌ Oops, you've clicked on{" "}
                                            <span
                                                style={{
                                                    color: "white",
                                                    backgroundColor: "#F56100",
                                                    fontWeight: "700",
                                                    fontSize: "1.5rem",
                                                    padding: "1rem",
                                                    borderRadius: "4px",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {this.state.lastClickedWord}
                                            </span>{" "}
                                            twice. ❌
                                        </Typography>
                                        <StyledButton
                                            onClick={this.restartGame}
                                        >
                                            Play again
                                        </StyledButton>
                                    </Stack>
                                )}
                                {this.state.isGameWon && (
                                    <>
                                        <Typography
                                            variant="h2"
                                            fontWeight={700}
                                        >
                                            Hey, wow, you actually did it!
                                        </Typography>
                                        <Typography variant="h4">
                                            For your hard work, enjoy this happy
                                            little doggo.
                                        </Typography>
                                        <img src={doggo} alt="lil dog" />
                                        <StyledButton
                                            onClick={this.restartGame}
                                        >
                                            Play again
                                        </StyledButton>
                                    </>
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
