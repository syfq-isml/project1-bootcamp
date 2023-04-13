import { Typography } from "@mui/material";
import React, { Component } from "react";

class NGHeadings extends Component {
    render() {
        return (
            <>
                <Typography
                    variant="h3"
                    fontWeight={"700"}
                    mt={3}
                    textAlign={"center"}
                >
                    Try to remember the longest number you can.
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight={"400"}
                    textAlign={"center"}
                >
                    The average person can remember 7 numbers at once.
                </Typography>
                <Typography variant="h5" fontWeight={"400"}>
                    Can{" "}
                    <strong>
                        <em>you</em>
                    </strong>{" "}
                    do more?
                </Typography>
            </>
        );
    }
}

export default NGHeadings;
