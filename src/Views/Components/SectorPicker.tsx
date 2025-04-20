import * as React from 'react'
import styled from 'styled-components'

import { SectorPickerSVG } from './SectorPickerSVG'

export interface SectorPickerProps {
    sectors: string[]
    onChange(sector: string): void
}

export function SectorPicker({ sectors, onChange }: SectorPickerProps) {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            Array.from(ref.current.querySelectorAll('#sectors > path')).forEach(el => {
                el.addEventListener('click', () => {
                    onChange(el.id);
                });
            });
        }
    }, [onChange]);

    return (
        <div ref={ref}>
            <Root sectors={sectors}>
                <SectorPickerSVG />
            </Root>
        </div>
    );
}


const Root: any = styled.div`
& svg {
    display: block;
    width: 100%;
    height: 100%;
}

${({sectors}: {sectors: string[]}) => sectors.length === 0 ? '& .ignore' : sectors.map(s => `& svg #sectors path[id="${s}"]`).join(', ')} {
    fill: red;
}

& svg #sectors > path {
    cursor: pointer;
    fill: #1E2A4C;
    transition: fill .12s;
}
& svg #sectors > path:hover {
    fill: red;
}
`
