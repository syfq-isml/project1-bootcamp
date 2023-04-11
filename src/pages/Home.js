import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import brainImg from "../assets/images/brain_animated.png";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

const StyledButton = styled(Button)({
    backgroundColor: "#B5EBC6",
    fontWeight: "700",
    fontSize: "1.7rem",
    padding: "1rem 2rem",
    color: "black",
    "&:hover": {
        backgroundColor: "#61D8A8",
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiScores: {
                NR: 0,
                NG: 0,
                WG: 0,
                SS: 0,
            },
        };
    }

    componentDidMount() {
        const storedHiScores = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
        );
        if (storedHiScores) this.setState({ hiScores: { ...storedHiScores } });
        else
            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    NR: 0,
                    NG: 0,
                    WG: 0,
                    SS: 0,
                })
            );
    }

    render() {
        return (
            <>
                <Box
                    component="section"
                    bgcolor={"#E3E3E3"}
                    pt={"5vh"}
                    pb={"5vh"}
                >
                    <Container>
                        <Stack
                            component="section"
                            className="fl-col fl-centered"
                            textAlign={"center"}
                            spacing={2}
                        >
                            <Paper
                                className="fl-row fl-centered"
                                style={{
                                    borderRadius: "50%",
                                    width: "20vw",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                }}
                                elevation={0}
                            >
                                <Paper
                                    className="fl-row fl-centered"
                                    style={{
                                        borderRadius: "50%",
                                        width: "70%",
                                        height: "auto",
                                        aspectRatio: "1/1",
                                    }}
                                    elevation={0}
                                >
                                    <img
                                        src={brainImg}
                                        alt="animated brain"
                                        style={{ width: "100%" }}
                                    />
                                </Paper>
                            </Paper>
                            <Stack className="fl-col fl-centered" spacing={2}>
                                <Typography
                                    variant="h1"
                                    component="h1"
                                    fontWeight={"800"}
                                >
                                    How brawny is your brain?
                                </Typography>
                                <Typography variant="h4" component={"h1"}>
                                    Measure your abilities with these specially
                                    curated cognitive tests.
                                </Typography>
                                <StyledButton
                                    disableRipple
                                    variant="contained"
                                    size="large"
                                >
                                    Let's Go!
                                </StyledButton>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
                <Box component="section">
                    This is the image carousel
                    <Link to={"simon-says"}>
                        <button>To Simon Says</button>
                    </Link>
                    <Link to={"word-game"}>
                        <button>Word Game</button>
                    </Link>
                    <Link to={"number-game"}>
                        <button>number game</button>
                    </Link>
                    <Link to={"no-repeat-game"}>
                        <button>No repeat</button>
                    </Link>
                    <h1>All hiScores:</h1>
                    <h2>{this.state.hiScores.NR}</h2>
                </Box>
            </>
        );
    }
}

export default Home;
