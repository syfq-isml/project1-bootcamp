import { Stack, Typography } from "@mui/material";
import React, { Component } from "react";
import dog from "../assets/images/dog.png";

class ErrorPage extends Component {
    render() {
        return (
            <Stack
                sx={{ minHeight: "100vh" }}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <img src={dog} alt="dog" />
                <Typography variant="h1">Woof woof</Typography>
                <Typography variant="h5">Error 404!</Typography>
            </Stack>
        );
    }
}

export default ErrorPage;
