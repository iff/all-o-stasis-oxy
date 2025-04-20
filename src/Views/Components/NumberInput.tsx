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

export function NumberInput({ object, field }: NumberInputProps) {
    const ref = React.useRef<HTMLInputElement>(null)
    const [rawValue, setRawValue] = React.useState(() => {
        const initialValue = object[field];
        return asString(initialValue);
    });

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setRawValue(value);
        if (isValidNumber(value)) {
            object[field] = parseFloat(value);
        }
    };

    let className = 'number-input';
    if (!isValidNumber(rawValue)) {
        className = 'number-input invalid';
    }

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    React.useEffect(() => {
        if (document.activeElement !== ref.current) {
            const newValue = object[field];
            setRawValue(asString(newValue));
        }
    }, [object, field]);

  return <Input ref={ref} type="text" className={className} value={rawValue}
                  onChange={onChange} onClick={onClick} />;
}
