import * as React from "react";
import styled from "styled-components";

import { text } from "../../Materials/Colors";
import { useTypeface, copy16 } from "../../Materials/Typefaces";
import { accountPublicProfile } from "../../../pages/account";
import { useEnv } from "../../env";

interface BoulderSetterCardProps {
  setterId: string;
  onClick: (setterId: string) => void;
}

export const BoulderSetterCard = (props: BoulderSetterCardProps) => {
  const { app } = useEnv();
  const { setterId } = props;

  const onClick = () => {
    props.onClick(setterId);
  };

  const { name, avatar } = accountPublicProfile(app.data.aversH, setterId);

  return (
    <SetterContainer onClick={onClick}>
      <SetterImage src={avatar} />
      <SetterName>{name}</SetterName>
    </SetterContainer>
  );
};

const SetterContainer = styled.div`
  pointer: cursor;
  background: white;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.16s;
  display: flex;
  margin-bottom: 8px;

  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

const SetterImage = styled.img`
  display: block;
  width: 80px;
  min-height: 80px;
  flex: 0 0 80px;
  align-self: stretch;
  object-fit: cover;
`;

const SetterName = styled.div`
  ${useTypeface(copy16)};
  color: ${text};
  text-align: center;
  margin: 10px 24px 24px 10px;
`;
