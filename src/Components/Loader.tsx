import * as React from "react";
import styled from "styled-components";

import { useTypeface, heading24 } from "../Materials/Typefaces";

import gym from "../../static/index";
const LogoSVG = gym.LogoSVG;

export const Loader = () => (
  <Root>
    <LogoSVG />
    <Text>Loading…</Text>
  </Root>
);

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  display: block;
  max-width: 50vw;
`;

const Text = styled.div`
  ${useTypeface(heading24)};
  margin-top: 24px;
`;
