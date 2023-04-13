import { Box, Container, Stack } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import Banner from "../components/Home/Banner";
import HomeLogo from "../components/Home/HomeLogo";
import HomeHeadings from "../components/Home/HomeHeadings";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

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
                            <HomeLogo />
                            <HomeHeadings />
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
