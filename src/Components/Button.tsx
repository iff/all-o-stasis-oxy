import styled from "styled-components";

import { applyTypeface, copy16Bold } from "../Materials/Typefaces";

import { primary, secondary, primaryText } from "../Materials/Colors";

export const Button = styled.button`
  ${applyTypeface(copy16Bold)};
  width: 100%;
  border: none;
  border-radius: 0;
  background: ${primary}88;
  color: ${primaryText}44;
  outline: none;

  white-space: nowrap;

  height: 40px;
  padding: 0 12px;

  transition: all 0.16s;

  &:not(:disabled) {
    cursor: pointer;
    background: ${primary};
    color: ${primaryText}DD;
  }
  &:not(:disabled):hover {
    background: ${primary};
    color: ${primaryText};
  }
  &:focus {
    outline: ${secondary} auto 5px;
  }
`;
