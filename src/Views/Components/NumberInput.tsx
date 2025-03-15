import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Input } from '../../Components/Input';

export interface NumberInputProps {
    object : any;
    field  : string;
}

interface NumberInputState {
    rawValue : string;
}

// The value is only valid if it can be fully parsed into a number.
function
isValidNumber(value: string): boolean {
    const num = parseFloat(value);
    return !isNaN(num) && ('' + value) === ('' + num);
}

function
asString(value) {
    if (value === null || value === undefined) {
        return '';
    } else {
        return value;
    }
}

class NumberInputSpec extends React.Component<NumberInputProps, NumberInputState> {

    constructor(props) {
        super(props);
        this.state = this.initialState(props);
    }

    initialState(props) {
        const rawValue = props.object[props.field];
        return { rawValue : asString(rawValue) };
    }

    onChange = (e: React.FormEvent<any>) => {
        const value = (e.target as HTMLInputElement).value;

        this.setState({ rawValue: value });
        if (isValidNumber(value)) {
            this.props.object[this.props.field] = parseFloat(value);
        }
    };

    render() {
        let className = 'number-input';
        if (!isValidNumber(this.state.rawValue)) {
            className = 'number-input invalid';
        }

        function onClick(e) {
            e.stopPropagation();
        }

        return <Input type="text" className={className} value={this.state.rawValue}
                      onChange={this.onChange} onClick={onClick} />;
    }

    componentWillReceiveProps(props) {
        if (ReactDOM.findDOMNode(this) !== document.activeElement) {
            this.setState(this.initialState(props));
        }
    }
}

export const NumberInput = React.createFactory(NumberInputSpec);
