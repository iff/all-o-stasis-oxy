import * as Avers from "avers";
import * as React from "react";
import styled from "styled-components";
import * as MUI from "../src/Components/MUI";

import { App, config } from "../src/app";
import { Account } from "../src/storage";

import * as C from "../src/Materials/Colors";
import { useTypeface, heading18 } from "../src/Materials/Typefaces";

import { Site } from "../src/Views/Components/Site";
import { accountAvatar } from "./account/[id]";

export default ({ app }: { app: App }) => (
  <Site>
    <Settings app={app} accountId={app.data.session.objId} />
  </Site>
);

export interface SettingsProps {
  app: App;
  accountId: undefined | string;
}

export const Settings = ({ app, accountId }: SettingsProps) => {
  const accountE = Avers.lookupEditable<Account>(app.data.aversH, accountId || "").get(undefined);

  if (accountE) {
    return (
      <Root>
        <Header app={app} accountE={accountE} />
        <Editor accountE={accountE} />
      </Root>
    );
  } else {
    return null;
  }
}

const Header = ({ app, accountE }: { app: App; accountE: Avers.Editable<Account> }) => {
  return (
    <Avatar>
      <img src={accountAvatar(app.data.aversH, accountE.objectId)} />
      <Name>{accountE.content.name}</Name>
    </Avatar>
  );
};

const Editor = ({ accountE }: { accountE: Avers.Editable<Account> }) => {
  const changeAccountName = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    accountE.content.name = e.currentTarget.value;
  };

  const account = accountE.content;

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Form>
        <MUI.Paper style={{ maxWidth: 600, padding: 20, marginBottom: 20 }}>
          <FieldLabel>Your Email</FieldLabel>
          <FieldDescription>
            The email address can not be changed at this time. If you'd like to change it please contact the admins.
          </FieldDescription>
          <FieldContent>
            <span style={{ color: C.primary }}>{account.email}</span>
          </FieldContent>
        </MUI.Paper>

        <MUI.Paper style={{ maxWidth: 600, padding: 20, marginBottom: 20 }}>
          <FieldLabel>Your Name</FieldLabel>
          <FieldDescription>
            Please enter your full name, or a display name you are comfortable with.
          </FieldDescription>
          <FieldContent>
            <MUI.TextField
              type="text"
              value={account.name}
              onChange={changeAccountName}
              onClick={onClick}
            />
          </FieldContent>
        </MUI.Paper>

        <MUI.Paper style={{ maxWidth: 600, padding: 20, marginBottom: 20 }}>
          <FieldLabel>Permissions</FieldLabel>
          <FieldDescription>
            Your role is: <span style={{ color: C.primary }}>{account.role}</span>.
            {account.role !== "setter" && (
              <p>
                If you are setter and would like to get permissions to manage your own boulders please send{" "}
                <a href={requestPermissionsHref(account)}>this email</a> to the admins.
              </p>
            )}
          </FieldDescription>
        </MUI.Paper>
      </Form>
    </div>
  );
};

const requestPermissionsHref = (account: Account) => {
  const subject = `Please make me a setter`;
  const body = `Hi admin,\n\nI'm ${account.email} and am requesting permissions to manage my own boulders.\nPlease head over to ${window.location.origin}/admin/accounts and give me the 'setter' role.\n\nThank you.`;

  return `mailto:${config.adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// ----------------------------------------------------------------------------

const Root = styled.div``;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 20px 20px;

  img {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin-right: 4px;
  }
`;

const Name = styled.div`
  ${useTypeface(heading18)};
`;

const Form = styled.div`
  padding: 0 20px;
`;

const FieldLabel = styled.div`
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  margin: 0px 0px 14px;
`;

const FieldDescription = styled.div`
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;

  a {
    color: ${C.primary};
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

const FieldContent = styled.div`
  margin: 14px 0px 0px;
`;
