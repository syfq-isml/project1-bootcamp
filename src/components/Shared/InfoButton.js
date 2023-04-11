import { Button, styled } from "@mui/material";
import React, { Component } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const StyledButton = styled(Button)({
    backgroundColor: "rgb(255, 255, 255, 0.3)",
    fontWeight: "700",
    fontSize: "2.5rem",
    width: "1rem",
    aspectRatio: "1/1",
    borderRadius: "50%",
    color: "white",
    "&:hover": {
        backgroundColor: "rgb(255, 255, 255, 0.5)",
    },
});

class InfoButton extends Component {
    render() {
        return (
            <StyledButton disableRipple {...this.props}>
                <QuestionMarkIcon fontSize="inherit" />
            </StyledButton>
        );
    }
}

export default InfoButton;
