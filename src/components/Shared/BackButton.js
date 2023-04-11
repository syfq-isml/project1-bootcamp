import { Button, styled } from "@mui/material";
import React, { Component } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledButton = styled(Button)({
    backgroundColor: "rgb(255, 255, 255, 0.3)",
    fontWeight: "700",
    fontSize: "3rem",
    borderRadius: "50%",
    width: "1rem",
    aspectRatio: "1/1",
    color: "white",
    "&:hover": {
        backgroundColor: "rgb(255, 255, 255, 0.5)",
    },
});

class BackButton extends Component {
    render() {
        return (
            <StyledButton disableRipple {...this.props}>
                <ArrowBackIcon fontSize="inherit" sx={{ opacity: "1" }} />
            </StyledButton>
        );
    }
}

export default BackButton;
