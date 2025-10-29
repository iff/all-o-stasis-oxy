import * as React from "react";
import styled from "styled-components";

import { boulderCompare } from "../../src/storage";
import { App } from "../../src/app";
import { useEnv } from "../../src/env";
import { removeBoulders, activeBoulders, sectorBoulders } from "../../src/actions";

import { Site } from "../../src/Views/Components/Site";
import { BoulderId24 } from "../../src/Views/Components/BoulderId";
import * as MUI from "../../src/Components/MUI";

interface Props {
  app: App;
}

export default function BoulderRemoval({ app }: Props) {
  const { config } = useEnv();
  const [sectorName, setSectorName] = React.useState(config.sectors[0]);

  const removeAllBoulders = (): void => {
    removeBoulders(app, activeBoulders(app));
  };

  const removeAllSectorBoulders = (): void => {
    const boulders = sectorBoulders(app, sectorName);
    removeBoulders(app, boulders);
  };

  return (
    <Site>
      <Root>
        <table>
          <thead>
            <tr>
              <th style={{ width: 100 }}>Selection</th>
              <th style={{ width: 200 }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>all</td>
              <td>
                <MUI.Button onClick={removeAllBoulders}>Remove all Boulders</MUI.Button>
              </td>
            </tr>
            <tr>
              <td colSpan={2}></td>
            </tr>
            <tr>
              <td>
                <select
                  id="sector_selection"
                  defaultValue={sectorName}
                  onChange={(e) => setSectorName(e.currentTarget.value)}
                >
                  {config.sectors.map((entry, index) => (
                    <option value={entry} key={index}>
                      {config.prettyPrintSector(entry)}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <MUI.Button onClick={removeAllSectorBoulders}>Remove Sector</MUI.Button>
              </td>
            </tr>
            {sectorBoulders(app, sectorName)
              .sort((a, b) => boulderCompare(config.grades, a.content, b.content))
              .map((boulderE) => {
                const grade = boulderE.content.grade;
                const gNr = config.databaseUrl.includes("quadrel") ? config.grades.indexOf(grade) + 1 : boulderE.content.gradeNr;
                const gradeColor = config.gradeColor(boulderE.content.grade);
                return (
                  <tr key={boulderE.objectId}>
                    <td>
                      <BoulderId24 $grade={gradeColor}>{gNr}</BoulderId24>
                    </td>
                    <td>
                      <MUI.Button
                        onClick={() => {
                          const now = Date.now();
                          boulderE.content.removed = now.valueOf();
                        }}
                      >
                        Remove Boulder
                      </MUI.Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Root>
    </Site>
  );
}

const Root = styled.div`
  margin: 16px 24px;

  table {
    width: 100%;

    th {
      text-align: left;
    }
  }
`;
