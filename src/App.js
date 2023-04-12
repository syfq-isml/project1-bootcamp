import React from "react";
import "./App.css";

import SimonSaysGame from "./pages/SimonSaysGame";
import NumberGame from "./pages/NumberGame";
import WordGame from "./pages/WordGame";
import NoRepeatGame from "./pages/NoRepeatGame";
import Home from "./pages/Home";

import { HashRouter, Route, Routes } from "react-router-dom";

import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
    },
});
theme = responsiveFontSizes(theme);

class App extends React.Component {
    sayHello = () => {
        console.log("say hello");
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <HashRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="simon-says"
                                element={<SimonSaysGame />}
                            />
                            <Route path="word-game" element={<WordGame />} />
                            <Route
                                path="number-game"
                                element={<NumberGame />}
                            />
                            <Route
                                path="no-repeat-game"
                                element={<NoRepeatGame />}
                            />
                        </Routes>
                    </HashRouter>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
