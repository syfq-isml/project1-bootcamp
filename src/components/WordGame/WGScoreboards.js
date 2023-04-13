import { Stack } from "@mui/material";
import React, { Component } from "react";
import WGScoreboard from "./WGScoreboard";

class WGScoreboards extends Component {
    render() {
        return (
            <Stack
                direction={"row"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                width={"100%"}
                padding={2}
            >
                <WGScoreboard firstPart="Score:" color="#BC0066">
                    {this.props.score}
                </WGScoreboard>
                <WGScoreboard firstPart="Lives left:" color="#BC0066">
                    {this.props.gameOver
                        ? "💀"
                        : Array(this.props.livesLeft).fill("❤")}
                </WGScoreboard>
                <WGScoreboard firstPart="HiScore:" color="#BC0066">
                    {this.props.hiScore}
                </WGScoreboard>
            </Stack>
        );
    }
}

export default WGScoreboards;
