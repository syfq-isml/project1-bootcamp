import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <>
                <div>This is home page</div>
                <Link to={"simon-says"}>
                    <button>To Simon Says</button>
                </Link>
                <Link to={"word-game"}>
                    <button>Word Game</button>
                </Link>
                <Link to={"number-game"}>
                    <button>number game</button>
                </Link>
                <Link to={"no-repeat-game"}>
                    <button>No repeat</button>
                </Link>
            </>
        );
    }
}

export default Home;
