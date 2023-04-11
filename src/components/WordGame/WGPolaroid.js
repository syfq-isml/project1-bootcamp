import { Paper, Stack } from "@mui/material";
import React, { Component } from "react";

import polaroidLogo from "../../assets/images/Polaroid-1960.svg.png";
import blurredImage from "../../assets/images/blurredImage.jpg";

class WGPolaroid extends Component {
    render() {
        return (
            <Paper
                sx={{ padding: "1rem", height: "33vh", width: "350px", mt: 3 }}
            >
                <Paper
                    elevation={0}
                    className="fl-col fl-centered"
                    sx={{
                        bgcolor: "black",
                        height: "75%",
                        backgroundImage: `url(${blurredImage})`,
                        backgroundPosition: "10% 40%",
                    }}
                >
                    {this.props.children}
                </Paper>
                <Stack
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    mt={1}
                >
                    <img
                        src={polaroidLogo}
                        alt="polaroid logo"
                        style={{ height: "10px" }}
                    />
                </Stack>
            </Paper>
        );
    }
}

export default WGPolaroid;
