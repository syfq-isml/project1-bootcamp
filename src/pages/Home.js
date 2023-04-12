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
import brainBrawn from "../assets/images/Brainbrawn_circle.png";

import { getRandomIntInclusive } from "../utils";
import Banner from "../components/Home/Banner";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

const StyledButton = styled(Button)({
    backgroundColor: "#affe9f",
    fontWeight: "700",
    fontSize: "1.7rem",
    padding: "1rem 2rem",
    color: "black",
    "&:hover": {
        backgroundColor: "#9AEB9E",
    },
});

const map = new Map([
    [0, "simon-says"],
    [1, "word-game"],
    [2, "number-game"],
    [3, "no-repeat-game"],
]);

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
                                className="fl-row fl-centered logo-spinner"
                                style={{
                                    borderRadius: "50%",
                                    width: "20vw",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    backgroundImage: `url(${brainBrawn})`,
                                    backgroundSize: "32vw",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "#fdf7ea",
                                }}
                                elevation={0}
                            >
                                <Paper
                                    className="fl-row fl-centered"
                                    style={{
                                        borderRadius: "50%",
                                        width: "60%",
                                        height: "auto",
                                        aspectRatio: "1/1",
                                        backgroundColor: "#fdf7ea",
                                    }}
                                    elevation={0}
                                >
                                    <img
                                        className="logo-spinner__child"
                                        src={brainImg}
                                        alt="animated brain"
                                        style={{
                                            width: "100%",
                                        }}
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
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`${map.get(
                                        getRandomIntInclusive(0, 3)
                                    )}`}
                                >
                                    <StyledButton
                                        disableRipple
                                        variant="contained"
                                        size="large"
                                    >
                                        Let's Go!
                                    </StyledButton>
                                </Link>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
                <Container>
                    <Stack component="section" id="games" spacing={3} my={5}>
                        <Link to={"word-game"}>
                            <Banner
                                className="red HOME-btns"
                                color="#70044B"
                                hiScore={this.state.hiScores.WG}
                            >
                                Seen it?
                            </Banner>
                        </Link>
                        <Link to={"no-repeat-game"}>
                            <Banner
                                className="orange HOME-btns"
                                color="#706804"
                                hiScore={this.state.hiScores.NR}
                            >
                                Repeat: null
                            </Banner>
                        </Link>
                        <Link to={"number-game"}>
                            <Banner
                                className="green HOME-btns"
                                color="#047018"
                                hiScore={this.state.hiScores.NG}
                            >
                                Numbrrr
                            </Banner>
                        </Link>
                        <Link to={"simon-says"}>
                            <Banner
                                className="blue HOME-btns"
                                color="#044C70"
                                hiScore={this.state.hiScores.SS}
                            >
                                Simone Sez
                            </Banner>
                        </Link>
                    </Stack>
                </Container>
            </>
        );
    }
}

export default Home;
