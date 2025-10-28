import * as React from "react";
import styled from "styled-components";
import { useEnv } from "../../../src/env";

export interface SectorPickerProps {
  sectors: string[];
  onChange(sector: string): void;
}

export function SectorPicker({ sectors, onChange }: SectorPickerProps) {
  const { config } = useEnv();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      Array.from(ref.current.querySelectorAll("#sectors > path")).forEach((el) => {
        el.addEventListener("click", () => {
          onChange(el.id);
        });
      });
    }
  }, [onChange]);

  return (
    <div ref={ref}>
      <Root $sectors={sectors}>
        <config.SectorPickerSVG />
      </Root>
    </div>
  );
}

const Root: any = styled.div<{ $sectors: string[] }>`
  & svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  ${({ $sectors }) =>
    $sectors.length === 0 ? "& .ignore" : $sectors.map((s) => `& svg #sectors path[id="${s}"]`).join(", ")} {
    fill: red;
  }

  & svg #sectors > path {
    cursor: pointer;
    fill: #1e2a4c;
    transition: fill 0.12s;
  }
  & svg #sectors > path:hover {
    fill: red;
  }
`;
