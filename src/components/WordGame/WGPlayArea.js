import { Button, Stack, Typography, styled } from "@mui/material";
import React, { Component } from "react";
import WGPolaroid from "./WGPolaroid";

const StyledButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    backgroundColor: "#BC0066",
    color: "white",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#940050",
    },
});

class WGPlayArea extends Component {
    render() {
        return (
            <>
                <WGPolaroid>
                    <Typography
                        variant="h2"
                        fontWeight={"700"}
                        fontFamily={"'Merriweather', serif"}
                    >
                        {this.props.displayWord}
                    </Typography>

                    {/* <h1>{this.state.words}</h1> */}
                </WGPolaroid>
                <Stack direction={"row"} spacing={5} mt={3}>
                    <StyledButton
                        disableRipple
                        name="seen"
                        onClick={this.props.checkUserInput}
                    >
                        SEEN
                    </StyledButton>
                    <StyledButton
                        disableRipple
                        name="not-seen"
                        onClick={this.props.checkUserInput}
                    >
                        NEW
                    </StyledButton>
                </Stack>
            </>
        );
    }
}

export default WGPlayArea;
