'use strict';

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="display"></div>
                <Drumpads />
            </div>
        );
    }
}

class Drumpads extends React.Component {
    constructor(props) {
        super(props);
        this.getKey = this.getKey.bind(this);
    }

    getKey(event) {
        event.persist();
        console.log(event.key.toUpperCase());
        document.getElementById(event.key.toUpperCase()).style.backgroundColor = 'blue';
        window.setTimeout(() => {
            document.getElementById(event.key.toUpperCase()).style.backgroundColor = 'white';
        }, 100);
    }

    render() {
        return (
            <div id="drumpads-container" onKeyDown={this.getKey} tabIndex="0">
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

ReactDOM.render(<DrumMachine />, document.body);
