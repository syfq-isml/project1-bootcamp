import { Typography } from "@mui/material";
import React, { Component } from "react";

class WGHeadings extends Component {
    render() {
        return (
            <>
                <Typography variant="h3" fontWeight={"700"}>
                    Have you seen this word?
                </Typography>
                <Typography variant="h5" fontWeight={"400"}>
                    If you have, click "Seen".
                </Typography>
                <Typography variant="h5">
                    If you have not, click "New".
                </Typography>
            </>
        );
    }
}

export default WGHeadings;
