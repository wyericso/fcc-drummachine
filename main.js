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

const keyMapping = {
    Q: {
        display: "Crash",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137499/fcc/drum-machine/209871__veiler__right-crash.mp3"
    },
    W: {
        display: "Hi Tom",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137490/fcc/drum-machine/261407__veiler__tom-1.mp3"
    },
    E: {
        display: "Mid Tom",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137490/fcc/drum-machine/261412__veiler__tom-2.mp3"
    },
    A: {
        display: "Open HH",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137614/fcc/drum-machine/Dry_Ohh.mp3"
    },
    S: {
        display: "Snare",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137731/fcc/drum-machine/Brk_Snr.mp3"
    },
    D: {
        display: "Lo Tom",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137490/fcc/drum-machine/261411__veiler__tom-3.mp3"
    },
    Z: {
        display: "Closed HH",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137699/fcc/drum-machine/Bld_H1.mp3"
    },
    X: {
        display: "Kick",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137773/fcc/drum-machine/RP4_KICK_1.mp3"
    },
    C: {
        display: "Ride",
        audioUrl: "https://res.cloudinary.com/woooanet/video/upload/v1539137498/fcc/drum-machine/84234__josomebody__ride.mp3"
    }
};

const ConnectedDisplay = ({ keyPressed }) => (
    <div id="display">{ keyMapping[keyPressed] && keyMapping[keyPressed].display }</div>
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
        this.hitPad = this.hitPad.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    hitPad(keyPressed) {
        document.getElementById(keyPressed).style.backgroundColor = 'blue';
        window.setTimeout(() => {
            document.getElementById(keyPressed).style.backgroundColor = 'white';
        }, 100);
        const sound = document.getElementById("audio-" + keyPressed);
        sound.currentTime = 0;
        sound.play();
        this.props.changeKey(keyPressed);
    }

    handleKeyDown(event) {
        event.persist();
        this.hitPad(event.key.toUpperCase());
    }

    handleClick(keyPressed) {
        this.hitPad(keyPressed);
    }

    render() {
        return (
            <div id="drumpads-container" onKeyDown={this.handleKeyDown} tabIndex="0">
                {Object.keys(keyMapping).map((key) => 
                    <div className="drumpad" id={key} key={key} onClick={() => this.handleClick(key)}>
                        {key}
                        <audio id={"audio-" + key}>
                            <source src={keyMapping[key].audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
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
