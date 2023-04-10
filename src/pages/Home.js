import React, { Component } from "react";
import { Link } from "react-router-dom";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiScores: {
                NR: 0,
                NG: 0,
                WG: 0,
                SS: 0,
            },
        };
    }

    componentDidMount() {
        const storedHiScores = JSON.parse(
            localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
        );
        if (storedHiScores) this.setState({ hiScores: { ...storedHiScores } });
        else
            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    NR: 0,
                    NG: 0,
                    WG: 0,
                    SS: 0,
                })
            );
    }

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
                <h1>All hiScores:</h1>
                <h2>{this.state.hiScores.NR}</h2>
            </>
        );
    }
}

export default Home;
