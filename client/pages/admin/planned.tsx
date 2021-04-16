import * as Avers from "avers";
import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

import { useEnv } from "../../src/env";
import * as Storage from "../../src/storage";
import { boulderCompare, prettyPrintSector, publicProfile, prettySetDate } from "../../src/storage";
import { draftBoulders, resetBoulderCollections } from "../../src/actions";

import { Site } from "../../src/Views/Components/Site";
import { BoulderId24 } from "../../src/Views/Components/BoulderId";
import * as MUI from "@material-ui/core";

export default () => {
  const { app } = useEnv();

  const setterName = (accountId): string => {
    let profile = Avers.staticValue(app.data.aversH, publicProfile(app.data.aversH, accountId)).get(undefined);
    if (profile && profile.name !== "") {
      return profile.name;
    } else {
      return accountId[0].slice(0, 5);
    }
  };

  const fulfill = (boulderE: Avers.Editable<Storage.Boulder>) => {
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
              <td colSpan="5"></td>
            </tr>
            {draftBoulders(app)
              .sort((a, b) => boulderCompare(a.content, b.content))
              .map((boulderE) => {
                return (
                  <tr key={boulderE.objectId}>
                    <td>
                      <Link href={{ pathname: "/boulder", query: { id: boulderE.objectId } }}>
                        <BoulderId24 grade={boulderE.content.grade}></BoulderId24>
                      </Link>
                    </td>
                    <td>{prettyPrintSector(boulderE.content.sector)}</td>
                    <td>{setterName(boulderE.content.setter)}</td>
                    <td>{prettySetDate(boulderE.content.setDate)}</td>
                    <td>
                      <MUI.Button variant="contained" color="primary" onClick={() => fulfill(boulderE)}>
                        Erledigt
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
