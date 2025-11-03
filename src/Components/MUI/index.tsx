import styled from "styled-components";

export const Button = styled.button<{ textColor?: string }>`
  color: ${({ textColor }) => textColor || "inherit"};
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;
  position: relative;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  -moz-appearance: none;
  justify-content: center;
  text-decoration: none;
  -moz-user-select: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;

  color: ${({ textColor }) => textColor || "rgba(0, 0, 0, 0.87)"};
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;

  padding: 6px 8px;

  box-shadow: none;

  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Paper = styled.div`
  background: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 4px 0px;
  transition: box-shadow 0.16s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px 0px;
  }
`;

export const TextField = styled.input`
  display: block;
  width: 100%;
  padding: 10.5px 14px;
  font: inherit;
`;

export const Avatar = styled.img`
  display: flex;
  font-size: 1.25rem;
  object-fit: cover;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;
