import { TextField, Button } from "../src/Components/MUI";
import * as Avers from "avers";
import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import { useEnv } from "../src/env";
import { secondary, secondaryText, text } from "../src/Materials/Colors";
import { copy14, copy16, copy16Bold, h1, applyTypeface } from "../src/Materials/Typefaces";
import { Site } from "../src/Views/Components/Site";

interface LoginState {
  email: string;

  createPassportPromise: void | Promise<void>;
  createPassportResponse: void | Error | { passportId: string; securityCode: string };

  awaitPassportConfirmationPromise: void | Promise<void>;
}

export default withRouter(({ router }: { router: any }) => {
  const { app } = useEnv();
  const [state, setState] = React.useState<LoginState>({
    email: "",
    createPassportPromise: undefined,
    createPassportResponse: undefined,
    awaitPassportConfirmationPromise: undefined,
  });

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      email: e.target.value,
      createPassportPromise: undefined,
      createPassportResponse: undefined,
      awaitPassportConfirmationPromise: undefined,
    });
  };

  const onReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setState({
      email: "",
      createPassportPromise: undefined,
      createPassportResponse: undefined,
      awaitPassportConfirmationPromise: undefined,
    });
  };

  const doLogin = (e: React.FormEvent<HTMLFormElement>) => {
    const {
      data: {
        aversH: {
          config: { fetch, apiHost },
        },
        session,
      },
    } = app;
    const { email } = state;

    e.stopPropagation();
    e.preventDefault();

    const createPassportPromise = (async (): Promise<void> => {
      try {
        const res = await fetch(`${apiHost}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase() }),
        });

        const json = await res.json();

        const awaitPassportConfirmationPromise = (async () => {
          const go = async () => {
            try {
              await fetch(`${apiHost}/login/verify?passportId=${json.passportId}`, { credentials: "include" });
              Avers.restoreSession(session);
              router.push("/");
            } catch (e) {
              await go();
            }
          };

          await go();
        })();

        setState({
          ...state,
          createPassportPromise: undefined,
          createPassportResponse: json,
          awaitPassportConfirmationPromise,
        });
      } catch (e: unknown) {
        setState({
          ...state,
          createPassportPromise: undefined,
          createPassportResponse: e as Error,
          awaitPassportConfirmationPromise: undefined,
        });
      }
    })();

    setState({ ...state, createPassportPromise });
  };

  const { email, createPassportPromise, createPassportResponse, awaitPassportConfirmationPromise } = state;

  if (!awaitPassportConfirmationPromise || createPassportResponse instanceof Error) {
    return (
      <Site>
        <Container>
          <Form
            email={email}
            onChangeEmail={onChangeEmail}
            doLogin={doLogin}
            isSubmitting={createPassportPromise !== undefined}
            error={createPassportResponse instanceof Error ? createPassportResponse.message : undefined}
          />
        </Container>
      </Site>
    );
  } else if (createPassportResponse) {
    return (
      <Site>
        <Container>
          <AwaitingConfirmation email={email} onReset={onReset} securityCode={createPassportResponse.securityCode} />
        </Container>
      </Site>
    );
  } else {
    return <div>IMPOSSIBLE</div>;
  }
});

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px 20vh;
  text-align: center;

  > * {
    max-width: 528px;
  }

  input {
    text-align: center;
  }
`;

export const Form = ({ email, onChangeEmail, doLogin, isSubmitting, error }) => (
  <form onSubmit={doLogin}>
    <H1>Authenticate (Setters and Admins)</H1>
    <P>To sign up or log in, fill in your email address below:</P>
    <TextField
      type="email"
      placeholder="you@domain.com"
      value={email}
      onChange={onChangeEmail}
      disabled={isSubmitting}
    />
    <div style={{ marginTop: 12 }}>
      <Button onClick={doLogin} disabled={isSubmitting || email.length === 0}>
        LOGIN
      </Button>
    </div>
    <FormErrorContainer>
      {error && (
        <FormError>
          Uh oh, the server didn't respond. Try again later.
          <br />
          (Error: {error})
        </FormError>
      )}
    </FormErrorContainer>
  </form>
);

export const AwaitingConfirmation = ({ email, onReset, securityCode }) => (
  <div>
    <H1>Authenticating</H1>

    <P>
      We sent an email to <strong>{email}</strong> (
      <a href="#" onClick={onReset}>
        undo
      </a>
      ).
    </P>

    <P>Please verify that the provided security code in the email matches the following text:</P>

    <SecurityCode>{securityCode}</SecurityCode>

    <P>Waiting for your confirmation…</P>
  </div>
);

const H1 = styled.h1`
  ${applyTypeface(h1)};
  color: ${text};
  margin: 0;
`;

const P = styled.p`
  ${applyTypeface(copy16)};
  color: ${text};
`;

const SecurityCode = styled.div`
  ${applyTypeface(copy16Bold)};
  background-color: ${secondary};
  color: ${secondaryText};
  padding: 16px 0;
  font-weight: bold;
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormErrorContainer = styled.div`
  position: relative;
  height: 100px;
`;

const FormError = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  ${applyTypeface(copy14)};
  color: #ff0000;
  margin-top: 16px;
`;
