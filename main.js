'use strict';

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.state = {
            key: ""
        };
    }

    handleKeyChange(key) {
        console.log(key.toUpperCase());
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="display"></div>
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
        this.props.onKeyChange(event.key);
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

ReactDOM.render(<DrumMachine />, document.getElementById("drum-machine-container"));
