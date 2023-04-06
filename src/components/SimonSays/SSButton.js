import React, { Component } from "react";

class SSButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLitUp: false,
        };
    }

    // componentDidMount(prevProps, prevState) {
    //     // if (prevProps.toLightUp !== this.props.toLightUp) {
    //     if (this.props.id === +this.props.toLightUp) {
    //         this.computerClick();
    //         console.log("Being called in children");
    //     }
    //     // }
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.toLightUp !== this.props.toLightUp) {
            if (this.props.id === this.props.toLightUp) {
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
        await this.lightUpFor(200);
        await this.props.onCheckCorrectInput(this.props.id);
    };

    render() {
        return (
            <button
                style={{
                    width: "200px",
                    height: "200px",
                    border: "0",
                    backgroundColor: this.state.isLitUp ? "#EAF6E7" : "#72A368",
                    borderRadius: "7px",
                }}
                onClick={this.userHandleClick}
                disabled={this.props.isDisabled ? true : false}
            ></button>
        );
    }
}

export default SSButton;
