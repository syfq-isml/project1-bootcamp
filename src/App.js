import React from "react";
import "./App.css";

import SimonSaysGame from "./pages/SimonSaysGame";
import NumberGame from "./pages/NumberGame";
import WordGame from "./pages/WordGame";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <SimonSaysGame /> */}
                {/* <NumberGame /> */}
                <WordGame />
            </div>
        );
    }
}

export default App;
