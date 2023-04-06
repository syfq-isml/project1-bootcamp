import React from "react";
import "./App.css";

import SimonSaysGame from "./pages/SimonSaysGame";
import NumberGame from "./pages/NumberGame";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <SimonSaysGame />
                {/* <NumberGame /> */}
            </div>
        );
    }
}

export default App;
