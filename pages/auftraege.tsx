import * as Avers from "avers";
import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

import { useEnv } from "../src/env";
import * as Storage from "../src/storage";
import { boulderCompare, prettyPrintSector, prettySetDate, publicProfile } from "../src/storage";
import { draftBoulders, resetBoulderCollections } from "../src/actions";

import { Site } from "../src/Views/Components/Site";
import { BoulderId24 } from "../src/Views/Components/BoulderId";
import * as MUI from "../src/Components/MUI";

export default () => {
  const { app, config } = useEnv();

  const setterName = (accountId: Array<string>): string => {
    // handle case were no setter is selected
    if (accountId.length == 0) {
      return "";
    }

    let profile = Avers.staticValue(app.data.aversH, publicProfile(app.data.aversH, accountId[0])).get(undefined);
    if (profile && profile.name !== "") {
      return profile.name;
    } else {
      return accountId[0].slice(0, 5);
    }
  };

  const fulfill = (boulderE: Avers.Editable<Storage.Boulder>) => {
    // first set the setter to "own" the object
    if (app.data.session.objId) {
      boulderE.content.setter = [app.data.session.objId];
      boulderE = Avers.lookupEditable<Storage.Boulder>(app.data.aversH, boulderE.objectId).get(undefined)!;
    }

    const now = Date.now();
    boulderE.content.setDate = now.valueOf();

    // XXX: workaround (change listener removed after first change)
    boulderE = Avers.lookupEditable<Storage.Boulder>(app.data.aversH, boulderE.objectId).get(undefined)!;
    boulderE.content.isDraft = 0;

    resetBoulderCollections(app);
  };

  return (
    <Site>
      <Root>
        <table>
          <thead>
            <tr>
              <th style={{ width: 100 }}>Boulder</th>
              <th style={{ width: 100 }}>Sektor</th>
              <th style={{ width: 100 }}>Setter</th>
              <th style={{ width: 100 }}>Due date</th>
              <th style={{ width: 100 }}>Done</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "20px" }}>
              <td colSpan={5}></td>
            </tr>
            {draftBoulders(app)
              .sort((a, b) => boulderCompare(config.grades, a.content, b.content)) // FIXME sort with setter first, then by due date
              .map((boulderE) => {
                if (
                  (app.data.session.objId && boulderE.content.setter.includes(app.data.session.objId)) ||
                  boulderE.content.setter.length == 0
                ) {
                  return (
                    <tr key={boulderE.objectId}>
                      <td>
                        <Link href={{ pathname: "/boulder", query: { id: boulderE.objectId } }}>
                          <BoulderId24 $grade={boulderE.content.grade}></BoulderId24>
                        </Link>
                      </td>
                      <td>{prettyPrintSector(boulderE.content.sector)}</td>
                      <td>{setterName(boulderE.content.setter)}</td>
                      <td>{prettySetDate(boulderE.content.setDate)}</td>
                      <td>
                        <MUI.Button onClick={() => fulfill(boulderE)}>
                          Erledigt
                        </MUI.Button>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </Root>
    </Site>
  );
};

const Root = styled.div`
  margin: 30px 24px;

  table {
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    th {
      text-align: left;
    }

    td {
      border-bottom: 1px solid #ddd;
    }
  }
`;
