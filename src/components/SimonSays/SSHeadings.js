import { Typography } from "@mui/material";
import React, { Component } from "react";

class SSHeadings extends Component {
    render() {
        return (
            <>
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
                    The pattern gets longer every time you get it right.
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight={"400"}
                    textAlign={"center"}
                >
                    1 mistake and you're out!
                </Typography>
            </>
        );
    }
}

export default SSHeadings;
