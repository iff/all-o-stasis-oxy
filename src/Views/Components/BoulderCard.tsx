import * as Avers from "avers";
import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

import { accountAvatar } from "../../../pages/account";
import { Boulder, prettyPrintSector } from "../../storage";

import { useTypeface, copy16 } from "../../Materials/Typefaces";

import { BoulderId } from "./BoulderId";
import { useEnv } from "../../env";

export interface BoulderCardProps {
  boulderE: Avers.Editable<Boulder>;
}

export const BoulderCard = ({ boulderE }: BoulderCardProps) => {
  const { content } = boulderE;
  const { grade, gradeNr, sector, setter } = content;

  return (
    <Link href={{ pathname: "/boulder", query: { id: boulderE.objectId } }}>
      <Card grade={grade}>
        <BoulderId grade={grade}>{gradeNr}</BoulderId>
        <Meta>
          <Sector>{prettyPrintSector(sector)}</Sector>
          <Setters>
            {setter.map((setterId, index) => (
              <BoulderCardSetter key={index} setterId={setterId} />
            ))}
          </Setters>
        </Meta>
      </Card>
    </Link>
  );
};

const BoulderCardSetter = ({ setterId }: { setterId: string }) => (
  <Setter src={accountAvatar(useEnv().app.data.aversH, setterId)} />
);

// ----------------------------------------------------------------------------

const Card: any = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  overflow: hidden;

  & ${BoulderId} {
    transition: transform 0.2s;
  }

  &:hover ${BoulderId} {
    box-shadow: 0 0 8px rgba(99, 85, 25, 0.5);
    transform: scale(1.08);
  }

  @media (min-width: 480px) {
    padding: 16px 24px;
    width: calc(100% / 2);
  }

  @media (min-width: 560px) {
    padding: 16px 24px;
    width: calc(100% / 3);
  }

  @media (min-width: 720px) {
    padding: 16px 24px;
    width: calc(100% / 4);
  }

  @media (min-width: 960px) {
    padding: 24px;
    width: calc(100% / 5);
  }

  @media (min-width: 1080px) {
    width: calc(100% / 6);
  }

  @media (min-width: 1200px) {
    width: calc(100% / 7);
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 12px;

  @media (min-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Sector = styled.div`
  ${useTypeface(copy16)}
  white-space: nowrap;
  line-height: 1;
  text-transform: uppercase;
`;

const Setters = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 480px) {
    margin-top: 8px;
  }
`;

const Setter = styled.img`
  width: 32px;
  height: 32px;
  margin: 0 0 0 4px;
  display: block;
  border-radius: 2px;

  @media (min-width: 480px) {
    width: 24px;
    height: 24px;
    margin: 0 4px 0 0;
  }
`;
