/*
module DropDownInput
( DropDownInput
) where
*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface DropdownInputProps {
    object  : any;
    field   : string;
    options : string[];
}

function asString(value) {
    if (value === null || value === undefined) {
        return '';
    } else {
        return value;
    }
}

export function DropDownInput({ object, field, options }: DropdownInputProps) {
    const [selectedValue, setSelectedValue] = React.useState(asString(object[field]));

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        object[field] = value;
    };

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const optionElements = options.map((entry, index) => (
        <option value={entry} key={index}>
            {entry}
        </option>
    ));

    React.useEffect(() => {
        if (document.activeElement !== document.getElementById(field)) {
            setSelectedValue(asString(object[field]));
        }
    }, [object, field]);

    return (
        <select
            id={field}
            name={field}
            onClick={onClick}
            onChange={onChange}
            value={selectedValue}
        >
            {optionElements}
        </select>
    );
}
