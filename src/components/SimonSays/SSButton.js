import { Howl } from "howler";
import React, { Component } from "react";

import xyloSounds from "../../assets/sounds/xylo/xyloSounds.mp3";

class SSButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLitUp: false,
        };

        this.xyloSound = new Howl({
            src: [xyloSounds],
            sprite: {
                xylo1: [0, 755.9863945578231],
                xylo2: [2000, 961.609977324263],
                xylo3: [4000, 491.38321995464815],
                xylo4: [6000, 530.4535147392287],
                xylo5: [8000, 547.913832199546],
                xylo6: [10000, 564.1269841269842],
                xylo7: [12000, 355.9637188208615],
                xylo8: [14000, 484.6712018140593],
                xylo9: [16000, 427.46031746031576],
            },
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.toLightUp !== this.props.toLightUp) {
            if (this.props.id.toString() === this.props.toLightUp[0]) {
                this.computerClick();
                console.log("Being called in children");
            }
        }
    }

    computerClick = async () => {
        await this.lightUpFor(500);
    };

    lightUpFor = (timing) => {
        this.setState({ isLitUp: true });
        setTimeout(() => {
            this.setState({ isLitUp: false });
        }, timing);
    };

    userHandleClick = async () => {
        this.xyloSound.play(`xylo${this.props.id + 1}`);
        await this.lightUpFor(200);
        await this.props.onCheckCorrectInput(this.props.id);
    };

    render() {
        let bgColor, borderStyle;
        if (!this.props.isGameOver) {
            if (this.state.isLitUp) {
                bgColor = "#EAF6E7";
                borderStyle = "0";
            } else {
                bgColor = "#0A71E1";
                borderStyle = "0";
            }
        } else {
            if (this.props.lastLight === this.props.id) {
                bgColor = "#EAF6E7";
                borderStyle = "0";
            } else {
                bgColor = "rgb(11, 125, 175, 0.6)";
                borderStyle = "4px solid white";
            }
        }
        return (
            <button
                style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: bgColor,
                    border: borderStyle,
                    borderRadius: "7px",
                }}
                onClick={this.userHandleClick}
                disabled={this.props.isDisabled ? true : false}
            >
                {this.props.isGameOver &&
                    this.props.lastLight === this.props.id && (
                        <>
                            <p>it was me</p>
                            <p>i was next</p>
                        </>
                    )}
            </button>
        );
    }
}

export default SSButton;
