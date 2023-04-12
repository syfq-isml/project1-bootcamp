import { Stack } from "@mui/material";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BackButton from "../Shared/BackButton";
import InfoButton from "../Shared/InfoButton";
import MuteButton from "../Shared/MuteButton";

class SSNav extends Component {
    render() {
        return (
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
                mt={3}
            >
                <Link to={"/"}>
                    <BackButton />
                </Link>
                <Stack direction={"row"} spacing={2}>
                    <InfoButton />
                    <MuteButton
                        onClick={this.props.muteSound}
                        muted={this.props.muted}
                    />
                </Stack>
            </Stack>
        );
    }
}

export default SSNav;
