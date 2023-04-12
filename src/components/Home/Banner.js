import { Box, Paper, Typography } from "@mui/material";
import React, { Component } from "react";

class Banner extends Component {
    render() {
        return (
            <Paper
                className={this.props.className}
                sx={{ height: "16vh", borderRadius: 2, overflow: "hidden" }}
            >
                <Typography variant="h2" fontWeight={700} p={2}>
                    {this.props.children}
                </Typography>
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: "rgb(255, 255, 255, 0.2)",
                        px: 2,
                        py: 1,
                        height: "100%",
                    }}
                >
                    <Typography variant="h5" color={"white"}>
                        HiScore:{" "}
                        <Typography
                            variant="h5"
                            sx={{
                                display: "inline-flex",
                                fontWeight: "700",
                                color: `${this.props.color}`,
                            }}
                        >
                            {this.props.hiScore}
                        </Typography>
                    </Typography>
                </Paper>
            </Paper>
        );
    }
}

export default Banner;
