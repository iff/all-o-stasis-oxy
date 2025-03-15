import * as Avers from "avers";
import * as React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Account, roles } from "../../src/storage";
import { App } from "../../src/app";

import { Site } from "../../src/Views/Components/Site";
import { DropDownInput } from "../../src/Views/Components/DropdownInput";

export default ({ app }: { app: App }) => (
  <Site>
    <Root>
      <table>
        <thead>
          <tr>
            <th style={{ width: 100, marginRight: 30 }}>ID</th>
            <th style={{ width: 100, marginRight: 30 }}>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {app.data.accountsCollection.ids.get([] as string[]).map(accountId => {
            return Avers.lookupEditable<Account>(app.data.aversH, accountId)
              .fmap(accountE => (
                <tr key={accountId}>
                  <td>
                    <Link href={{ pathname: "/account", query: { id: accountId } }}>
                      <a>{accountId.slice(0, 5)}</a>
                    </Link>
                  </td>
                  <td>{accountE.content.email}</td>
                  <td>
                    <DropDownInput object={accountE.content} field="role" options={roles} />
                  </td>
                </tr>
              ))
              .get(null);
          })}
        </tbody>
      </table>
    </Root>
  </Site>
);

const Root = styled.div`
  margin: 16px 24px;

  table {
    width: 100%;

    th {
      text-align: left;
    }
  }
`;
