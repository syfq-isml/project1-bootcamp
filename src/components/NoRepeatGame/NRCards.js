import { Button, styled } from "@mui/material";
import React, { Component } from "react";

const StyledButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1rem",
    width: "170px",
    aspectRatio: "1/1",
    color: "white",
});

class NRCards extends Component {
    render() {
        let bgColor, borderStyle;
        if (!this.props.isGameOver) bgColor = "#F07C31";
        else if (this.props.isGameOver && this.props.isAlreadyClicked) {
            bgColor = "rgb(240, 124, 49, 0.4)";
            borderStyle = "4px solid white";
        } else {
            borderStyle = "none";
            bgColor = "rgb(240, 124, 49)";
        }
        return (
            <StyledButton
                disableRipple
                sx={{
                    backgroundColor: bgColor,
                    "&:hover": {
                        backgroundColor: "#F56100",
                    },
                    "&:disabled": {
                        backgroundColor: bgColor,
                        color: "white",
                        border: borderStyle,
                    },
                }}
                onClick={() => this.props.onClick(this.props.word)}
                disabled={this.props.isGameOver}
            >
                <h2>{this.props.word}</h2>
            </StyledButton>
        );
    }
}

export default NRCards;
