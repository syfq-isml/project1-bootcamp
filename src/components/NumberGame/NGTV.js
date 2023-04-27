import {
    Paper,
    Stack,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from "@mui/material";
import React, { Component } from "react";

let fontChange = createTheme({
    typography: {
        fontFamily: ["Space Mono", "monospace"].join(","),
        allVariants: {
            color: "#74D144",
        },
    },
});

fontChange = responsiveFontSizes(fontChange);

class NGTV extends Component {
    render() {
        return (
            <Paper
                sx={{
                    backgroundColor: "#BAB6AE",
                    padding: "1.5rem",
                    height: "300px",
                    width: "80%",
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        backgroundColor: "#2E2B26",
                        color: "#74D144",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Inconsolata', monospace",
                    }}
                >
                    <ThemeProvider theme={fontChange}>
                        {this.props.children}
                    </ThemeProvider>
                </Paper>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                    mt={0.75}
                >
                    <Paper
                        sx={{
                            borderRadius: "50%",
                            backgroundColor: "red",
                            width: "10px",
                            height: "10px",
                        }}
                    />
                    <Paper
                        sx={{
                            borderRadius: "50%",
                            backgroundColor: "green",
                            width: "10px",
                            height: "10px",
                        }}
                    />
                    <Paper
                        sx={{
                            borderRadius: "50%",
                            backgroundColor: "orange",
                            width: "10px",
                            height: "10px",
                        }}
                    />
                </Stack>
            </Paper>
        );
    }
}

export default NGTV;
