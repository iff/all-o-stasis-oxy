import styled from "styled-components";

import { applyTypeface, heading24 } from "../Materials/Typefaces";

import { useEnv } from "../../src/env";

export const Loader = () => {
  const { config } = useEnv();
  return (
    <Root>
      <config.LogoSVG />
      <Text>Loading…</Text>
    </Root>
  );
};

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  ${applyTypeface(heading24)};
  margin-top: 24px;
`;
