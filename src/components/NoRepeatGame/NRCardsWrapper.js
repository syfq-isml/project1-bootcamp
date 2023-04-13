import React, { Component } from "react";
import { Box } from "@mui/material";

class NRCardsWrapper extends Component {
    render() {
        return (
            <Box
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    display: "flex",
                    gap: "1rem",
                    width: { sm: "700px", xs: "300px" },
                    flexWrap: "wrap",
                }}
            >
                {this.props.children}
            </Box>
        );
    }
}

export default NRCardsWrapper;
