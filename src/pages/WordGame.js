import React, { Component } from "react";
import { getRandomIntInclusive, getRandomWord, shuffle } from "../utils";
import { Link } from "react-router-dom";
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
    Typography,
    createTheme,
    styled,
} from "@mui/material";
import BackButton from "../components/Shared/BackButton";
import InfoButton from "../components/Shared/InfoButton";
import MuteButton from "../components/Shared/MuteButton";
import WGScoreboard from "../components/WordGame/WGScoreboard";
import WGPolaroid from "../components/WordGame/WGPolaroid";

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
    backgroundColor: "#BC0066",
    color: "white",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#940050",
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

        // 1/2 chance to get a new word
        if (this.state.score < 5 || outcome !== 1) {
            let newWord = getRandomWord();
            this.setState((prevState) => {
                return {
                    displayWord: newWord,
                };
            });
        } else {
            let newWord = shuffle([...this.state.words])[0];
            this.setState((prevState) => {
                return {
                    displayWord: newWord,
                };
            });
        }

        // (1/3 chance to get show a duplicate)
    };

    checkUserInput = async (e) => {
        let result = this.state.words.has(this.state.displayWord);
        if (
            (e.target.name === "seen" && result) ||
            (e.target.name === "not-seen" && !result)
        ) {
            this.successSound.play();
            await this.setState((prevState) => {
                return {
                    score: prevState.score + 1,
                    words: new Set([...prevState.words, prevState.displayWord]),
                    hiScore: Math.max(prevState.score + 1, prevState.hiScore),
                };
            });
            await this.selectWord();
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

                            <Typography variant="h3" fontWeight={"700"}>
                                Have you seen this word?
                            </Typography>
                            <Typography variant="h5" fontWeight={"400"}>
                                If you have, click "Seen".
                            </Typography>
                            <Typography variant="h5">
                                If you have not, click "New".
                            </Typography>

                            <Stack
                                direction={"row"}
                                justifyContent={"space-evenly"}
                                alignItems={"center"}
                                width={"100%"}
                                padding={2}
                            >
                                <WGScoreboard
                                    firstPart="Score:"
                                    color="#BC0066"
                                >
                                    {this.state.score}
                                </WGScoreboard>
                                <WGScoreboard
                                    firstPart="Lives left:"
                                    color="#BC0066"
                                >
                                    {this.state.gameOver
                                        ? "💀"
                                        : Array(this.state.livesLeft).fill("❤")}
                                </WGScoreboard>
                                <WGScoreboard
                                    firstPart="HiScore:"
                                    color="#BC0066"
                                >
                                    {this.state.hiScore}
                                </WGScoreboard>
                            </Stack>

                            {this.state.atGameStart && (
                                <StyledButton
                                    disableRipple
                                    onClick={this.selectWord}
                                    sx={{ mt: 3 }}
                                >
                                    Start Game
                                </StyledButton>
                            )}

                            {!this.state.gameOver &&
                                !this.state.atGameStart && (
                                    <>
                                        <WGPolaroid>
                                            <Typography
                                                variant="h2"
                                                fontWeight={"700"}
                                                fontFamily={
                                                    "'Merriweather', serif"
                                                }
                                            >
                                                {this.state.displayWord}
                                            </Typography>

                                            {/* <h1>{this.state.words}</h1> */}
                                        </WGPolaroid>
                                        <Stack
                                            direction={"row"}
                                            spacing={5}
                                            mt={3}
                                        >
                                            <StyledButton
                                                disableRipple
                                                name="seen"
                                                onClick={this.checkUserInput}
                                            >
                                                SEEN
                                            </StyledButton>
                                            <StyledButton
                                                disableRipple
                                                name="not-seen"
                                                onClick={this.checkUserInput}
                                            >
                                                NEW
                                            </StyledButton>
                                        </Stack>
                                    </>
                                )}
                            {this.state.gameOver && (
                                <StyledButton
                                    disableRipple
                                    onClick={this.restartGame}
                                    sx={{
                                        mt: 3,
                                        backgroundColor: "white",
                                        color: "#BC0066",
                                        "&:hover": {
                                            backgroundColor: "#F2F2F2",
                                        },
                                    }}
                                >
                                    Play Again?
                                </StyledButton>
                            )}
                        </Stack>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

export default WordGame;
