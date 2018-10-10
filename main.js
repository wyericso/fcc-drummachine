'use strict';

const CHANGEKEY = "CHANGEKEY";

const changeKey = (keyPressed) => ({
    type: CHANGEKEY,
    keyPressed
});

function keyKeeper(state = { keyPressed: "" }, action) {
    switch (action.type) {
    case CHANGEKEY:
        return { keyPressed: action.keyPressed };
    default:
        return state;
    }
}

let store = window.Redux.createStore(keyKeeper);

const { connect, Provider } = ReactRedux;

const DrumMachine = () => (
    <div id="drum-machine">
        <Display />
        <Drumpads />
    </div>
);

const mapStateToProps = state => {
    return {
        keyPressed: state.keyPressed
    };
};

const keyToDisplay = {
    Q: "Crash",
    W: "Hi Tom",
    E: "Mid Tom",
    A: "Open HH",
    S: "Snare",
    D: "Lo Tom",
    Z: "Closed HH",
    X: "Kick",
    C: "Ride"
};

const ConnectedDisplay = ({ keyPressed }) => (
    <div id="display">{ keyToDisplay[keyPressed] }</div>
);

const Display = connect(mapStateToProps)(ConnectedDisplay);

const mapDispatchToProps = dispatch => {
    return {
        changeKey: keyPressed => dispatch(changeKey(keyPressed))
    }
};

class ConnectedDrumpads extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        event.persist();
        document.getElementById(event.key.toUpperCase()).style.backgroundColor = 'blue';
        window.setTimeout(() => {
            document.getElementById(event.key.toUpperCase()).style.backgroundColor = 'white';
        }, 100);
        const sound = document.getElementById("audio-" + event.key.toUpperCase());
        sound.currentTime = 0;
        sound.play();
        this.props.changeKey(event.key.toUpperCase());
    }

    render() {
        return (
            <div id="drumpads-container" onKeyDown={this.handleKeyDown} tabIndex="0">
                <div className="drumpad" id="Q">
                    Q
                    <audio id="audio-Q">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137499/fcc/drum-machine/209871__veiler__right-crash.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="W">
                    W
                    <audio id="audio-W">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137490/fcc/drum-machine/261407__veiler__tom-1.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="E">
                    E
                    <audio id="audio-E">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137490/fcc/drum-machine/261412__veiler__tom-2.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="A">
                    A
                    <audio id="audio-A">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137614/fcc/drum-machine/Dry_Ohh.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="S">
                    S
                    <audio id="audio-S">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137731/fcc/drum-machine/Brk_Snr.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="D">
                    D
                    <audio id="audio-D">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137490/fcc/drum-machine/261411__veiler__tom-3.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="Z">
                    Z
                    <audio id="audio-Z">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137699/fcc/drum-machine/Bld_H1.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="X">
                    X
                    <audio id="audio-X">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137773/fcc/drum-machine/RP4_KICK_1.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="drumpad" id="C">
                    C
                    <audio id="audio-C">
                        <source src="https://res.cloudinary.com/woooanet/video/upload/v1539137498/fcc/drum-machine/84234__josomebody__ride.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        );
    }
}

const Drumpads = connect(null, mapDispatchToProps)(ConnectedDrumpads);

ReactDOM.render(
    <Provider store={store}>
        <DrumMachine />
    </Provider>, document.getElementById("drum-machine-container")
);
