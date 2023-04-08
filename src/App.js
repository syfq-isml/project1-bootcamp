import React from "react";
import "./App.css";

import SimonSaysGame from "./pages/SimonSaysGame";
import NumberGame from "./pages/NumberGame";
import WordGame from "./pages/WordGame";
import NoRepeatGame from "./pages/NoRepeatGame";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <SimonSaysGame /> */}
                {/* <NumberGame /> */}
                {/* <WordGame /> */}
                <NoRepeatGame />
            </div>
        );
    }
}

export default App;
