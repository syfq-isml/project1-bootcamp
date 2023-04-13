import { Box } from "@mui/material";
import React, { Component } from "react";

class SSButtonsWrapper extends Component {
    render() {
        return (
            <Box
                sx={{
                    display: "flex",
                    width: "600px",
                    flexWrap: "wrap",
                    gap: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {this.props.children}
            </Box>
        );
    }
}

export default SSButtonsWrapper;
