'use strict';

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<h1>Drum Machine, yoyo!</h1>);
    }
}

ReactDOM.render(<DrumMachine />, document.getElementById('drum-machine'));
