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

document.addEventListener('keydown', (event) => {
    console.log(event.key.toUpperCase());
    document.getElementById(event.key.toUpperCase()).style.backgroundColor = 'blue';
    window.setTimeout(() => {
        document.getElementById(event.key.toUpperCase()).style.backgroundColor = 'white';
    }, 100);
});
