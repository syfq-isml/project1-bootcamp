import { Button, Stack, Typography, styled } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getRandomIntInclusive } from "../../utils";

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

class HomeHeadings extends Component {
    render() {
        return (
            <Stack className="fl-col fl-centered" spacing={2}>
                <Typography variant="h1" component="h1" fontWeight={"800"}>
                    How brawny is your brain?
                </Typography>
                <Typography variant="h4" component={"h1"}>
                    Measure your abilities with these specially curated
                    cognitive tests.
                </Typography>
                <Link
                    style={{ textDecoration: "none" }}
                    to={`${map.get(getRandomIntInclusive(0, 3))}`}
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
        );
    }
}

export default HomeHeadings;
