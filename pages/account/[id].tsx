import { TextField } from "../../src/Components/MUI";
import * as Avers from "avers";
import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import { role } from "../../src/actions";
import { heading18, applyTypeface } from "../../src/Materials/Typefaces";
import { Account, publicProfile, PublicProfile, roles } from "../../src/storage";
import { DropDownInput } from "../../src/Views/Components/DropdownInput";
import { Site } from "../../src/Views/Components/Site";
import { useEnv } from "../../src/env";

export const accountPublicProfile = (aversH: Avers.Handle, accountId: string): PublicProfile => {
  const placeholderImageSrc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=";

  return Avers.staticValue(aversH, publicProfile(aversH, accountId)).get({
    name: accountId.slice(0, 3),
    avatar: placeholderImageSrc,
  });
};

export const accountAvatar = (aversH: Avers.Handle, accountId: string): string => {
  const placeholderImageSrc =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=";

  return Avers.staticValue(aversH, publicProfile(aversH, accountId))
    .fmap(({ avatar }) => avatar)
    .get(placeholderImageSrc);
};

// only admins can edit all accounts with the exception of users
// changing their own accounts
export default function Page() {
  const router = useRouter();
  const { app } = useEnv();

  const accountId = router.query.id as string;
  return Avers.lookupEditable<Account>(app.data.aversH, accountId)
    .fmap((accountE) => {
      const canEdit = role(app) === "admin" || accountId === app.data.session.objId;
      return (
        <Site>{canEdit ? <AccountView accountE={accountE} /> : accountRep(app.data.aversH, accountE)}</Site>
      );
    })
    .get(<Site />);
}

// ----------------------------------------------------------------------------

// A simple account representation for non-owned and non-admin views.
function accountRep(aversH: Avers.Handle, account: Avers.Editable<Account>) {
  return (
    <Avatar>
      <img src={accountAvatar(aversH, account.objectId)} />
      <Name>{account.content.name}</Name>
      <p className="about">{account.content.role}</p>
    </Avatar>
  );
}

// Render all fields as editables.
export interface AccountViewProps {
  accountE: Avers.Editable<Account>;
}

export const AccountView = ({ accountE }: AccountViewProps) => {
  return (
    <Root>
      <Header accountE={accountE} />
      <Editor accountE={accountE} />
    </Root>
  );
};

const Header = ({ accountE }: { accountE: Avers.Editable<Account> }) => {
  const { app } = useEnv();
  return (
    <Avatar>
      <img src={accountAvatar(app.data.aversH, accountE.objectId)} />
      <Name>{accountE.content.name}</Name>
    </Avatar>
  );
};

const Editor = ({ accountE }: { accountE: Avers.Editable<Account> }) => {
  const { app } = useEnv();
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
        <Field>
          <FieldLabel>Your Name</FieldLabel>
          <FieldDescription>Please enter your full name, or a display name you are comfortable with.</FieldDescription>
          <div className="content">
            <TextField type="text" value={account.name} onChange={changeAccountName} onClick={onClick} />
          </div>
        </Field>
        {role(app) === "admin" && (
          <Field>
            <FieldLabel>Role</FieldLabel>
            <FieldDescription>…</FieldDescription>
            <div className="content">
              <DropDownInput object={account} field="role" options={roles} />
            </div>
          </Field>
        )}
      </Form>
    </div>
  );
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
  ${applyTypeface(heading18)};
`;

const Form = styled.div`
  padding: 0 20px;
`;

const Field = styled.div`
    position: relative;
    border-radius: 5px;
    border 1px solid rgb(234, 234, 234);
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;

    max-width: 600px;
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
  margin: 0px 0px 14px;
`;
