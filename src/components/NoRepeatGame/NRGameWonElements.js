import { Button, Typography, styled } from "@mui/material";
import React, { Component } from "react";

import doggo from "../../assets/images/dog.png";

const StyledButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    backgroundColor: "white",
    color: "#F07C31",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#F3F2F2",
    },
});

class NRGameWonElements extends Component {
    render() {
        return (
            <>
                <Typography variant="h2" fontWeight={700}>
                    Hey, wow, you actually did it!
                </Typography>
                <Typography variant="h4">
                    For your hard work, enjoy this happy little doggo.
                </Typography>
                <img src={doggo} alt="lil dog" />
                <StyledButton onClick={this.props.restartGame}>
                    Play again
                </StyledButton>
            </>
        );
    }
}

export default NRGameWonElements;
