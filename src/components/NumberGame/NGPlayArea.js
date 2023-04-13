import { Stack, Typography } from "@mui/material";
import React, { Component } from "react";

class NGPlayArea extends Component {
    render() {
        return (
            <Stack justifyContent={"center"} alignItems={"center"}>
                <Typography
                    variant="h4"
                    component={"h3"}
                    color={"inherit"}
                    fontFamily={"inherit"}
                >
                    What was the number?
                </Typography>
                <form
                    onSubmit={this.props.handleSubmit}
                    className="fl-col fl-centered"
                >
                    <input
                        autoFocus
                        type="text"
                        onChange={this.props.handleChange}
                        value={this.props.userInput}
                    ></input>
                </form>
            </Stack>
        );
    }
}

export default NGPlayArea;
