import { Paper, Typography } from "@mui/material";
import React, { Component } from "react";

class WGScoreboard extends Component {
    render() {
        return (
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: "rgb(255, 255, 255, 0.2)",
                    px: 2,
                    py: 1,
                }}
            >
                <Typography variant="h5" color={"white"}>
                    {this.props.firstPart}{" "}
                    <Typography
                        variant="h5"
                        sx={{
                            display: "inline-flex",
                            fontWeight: "700",
                            color: `${this.props.color}`,
                        }}
                    >
                        {this.props.children}
                    </Typography>
                </Typography>
            </Paper>
        );
    }
}

export default WGScoreboard;
