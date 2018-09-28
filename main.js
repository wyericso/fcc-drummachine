'use strict';

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<span>#display</span>);
    }
}

ReactDOM.render(<DrumMachine />, document.getElementById('display'));
