import { Paper } from "@mui/material";
import React, { Component } from "react";

import brainImg from "../../assets/images/brain_animated.png";
import brainBrawn from "../../assets/images/Brainbrawn_circle.png";

class HomeLogo extends Component {
    render() {
        return (
            <Paper
                className="fl-row fl-centered logo-spinner"
                style={{
                    borderRadius: "50%",
                    width: "20vw",
                    height: "auto",
                    aspectRatio: "1/1",
                    backgroundImage: `url(${brainBrawn})`,
                    backgroundSize: "32vw",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#fdf7ea",
                }}
                elevation={0}
            >
                <Paper
                    className="fl-row fl-centered"
                    style={{
                        borderRadius: "50%",
                        width: "60%",
                        height: "auto",
                        aspectRatio: "1/1",
                        backgroundColor: "#fdf7ea",
                    }}
                    elevation={0}
                >
                    <img
                        className="logo-spinner__child"
                        src={brainImg}
                        alt="animated brain"
                        style={{
                            width: "100%",
                        }}
                    />
                </Paper>
            </Paper>
        );
    }
}

export default HomeLogo;
