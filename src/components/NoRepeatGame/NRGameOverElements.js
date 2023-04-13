import { Button, Stack, Typography, styled } from "@mui/material";
import React, { Component } from "react";

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

class NRGameOverElements extends Component {
    render() {
        return (
            <Stack spacing={2} alignItems={"center"} mt={2}>
                <Typography variant="h4" fontWeight={700} mt={2} mb={2}>
                    ❌ Oops, you've clicked on{" "}
                    <span
                        style={{
                            color: "white",
                            backgroundColor: "#F56100",
                            fontWeight: "700",
                            fontSize: "1.5rem",
                            padding: "1rem",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                        }}
                    >
                        {this.props.lastClickedWord}
                    </span>{" "}
                    twice. ❌
                </Typography>
                <StyledButton onClick={this.props.restartGame}>
                    Play again
                </StyledButton>
            </Stack>
        );
    }
}

export default NRGameOverElements;
