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

const ConnectedDisplay = ({ keyPressed }) => (
    <div id="display">{ keyPressed }</div>
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
        this.props.changeKey(event.key.toUpperCase());
    }

    render() {
        return (
            <div id="drumpads-container" onKeyDown={this.handleKeyDown} tabIndex="0">
                <div className="drumpad" id="Q">Q</div>
                <div className="drumpad" id="W">W</div>
                <div className="drumpad" id="E">E</div>
                <div className="drumpad" id="A">A</div>
                <div className="drumpad" id="S">S</div>
                <div className="drumpad" id="D">D</div>
                <div className="drumpad" id="Z">Z</div>
                <div className="drumpad" id="X">X</div>
                <div className="drumpad" id="C">C</div>
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
