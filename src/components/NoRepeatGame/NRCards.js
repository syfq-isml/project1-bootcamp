import React, { Component } from "react";

class NRCards extends Component {
    render() {
        let bgColor;
        if (!this.props.isGameOver) bgColor = "#E7F6F3";
        else if (this.props.isGameOver && this.props.isAlreadyClicked)
            bgColor = "#1CB319";
        else bgColor = "#B31930";
        return (
            <button
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: bgColor,
                }}
                onClick={() => this.props.onClick(this.props.word)}
                disabled={this.props.isGameOver}
            >
                <h2>{this.props.word}</h2>
            </button>
        );
    }
}

export default NRCards;
