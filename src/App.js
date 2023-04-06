import React from "react";
import "./App.css";

import SimonSaysGame from "./pages/SimonSaysGame";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <SimonSaysGame />
            </div>
        );
    }
}

export default App;
