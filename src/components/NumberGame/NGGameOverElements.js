import { Stack, Typography } from "@mui/material";
import React, { Component } from "react";

class NGGameOverElements extends Component {
    render() {
        return (
            <Stack alignItems={"center"} justifyContent={"center"}>
                <Typography variant="h4">Oops, your number was</Typography>
                <Typography variant="h3" fontWeight={"700"}>
                    {this.props.currentSequence}
                </Typography>
                <Typography variant="h4">You've entered</Typography>
                <Typography variant="h3" fontWeight={"700"}>
                    {this.props.userInput}
                </Typography>
            </Stack>
        );
    }
}

export default NGGameOverElements;
