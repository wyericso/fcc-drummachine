'use strict';

function keyKeeper(state = { key: "" }, action) {
    switch (action.type) {
    case "KEYPRESSED":
        return { key: action.key};
    default:
        return state;
    }
}

let store = window.Redux.createStore(keyKeeper);

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.state = {
            key: ""
        };
    }

    handleKeyChange(key) {
        this.setState({ key }, () => {
            console.log(this.state.key);
        });
    }

    render() {
        return (
            <div id="drum-machine">
                <Display keyPressed={this.state.key} />
                <Drumpads onKeyChange={this.handleKeyChange} />
            </div>
        );
    }
}

class Drumpads extends React.Component {
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
        this.props.onKeyChange(event.key.toUpperCase());
        store.dispatch({
            type: "KEYPRESSED",
            key: event.key.toUpperCase()
        });
        console.log(store.getState());
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

class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="display">{this.props.keyPressed}</div>
        );
    }
}

ReactDOM.render(<DrumMachine />, document.getElementById("drum-machine-container"));
