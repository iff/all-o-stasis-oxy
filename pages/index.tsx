import * as Avers from "avers";
import * as React from "react";
import styled from "styled-components";

import { App } from "../src/app";
import { Boulder, boulderCompare } from "../src/storage";

import { text } from "../src/Materials/Colors";
import { useTypeface, copy16Bold } from "../src/Materials/Typefaces";

import { BoulderCard } from "../src/Views/Components/BoulderCard";
import { Site } from "../src/Views/Components/Site";
import { SetterBar } from "../src/Components/SetterBar";
import { role } from "../src/actions";
import { useEnv } from "../src/env";

export default function ({ app }: { app: App }) {
  const { config } = useEnv();
  const [search, _setSearch] = React.useState("");
  const [grades, _setGrades] = React.useState<string[]>([]);

  const editableBoulders = app.data.activeBouldersCollection.ids
    .get<string[]>([])
    .map((boulderId) => Avers.lookupEditable<Boulder>(app.data.aversH, boulderId).get(null))
    .filter((x) => {
      if (x === null) {
        return false;
      } else if (search === "" && grades.length === 0) {
        return true;
      } else {
        return grades.indexOf(x.content.grade) !== -1 && (search === "" || +search === x.content.gradeNr);
      }
    });

  const groups = [] as Array<{ date: Date; boulders: Array<Avers.Editable<Boulder>> }>;

  editableBoulders.forEach((boulder) => {
    if (!boulder) {
      return;
    }

    const createdAt = new Date(boulder.content.setDate);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup === undefined) {
      groups.push({ date: createdAt, boulders: [boulder] });
    } else if (lastGroup.date.getMonth() === createdAt.getMonth() && lastGroup.date.getDate() === createdAt.getDate()) {
      lastGroup.boulders.push(boulder);
    } else {
      lastGroup.boulders.sort((a, b) => boulderCompare(config.grades, a.content, b.content));
      groups.push({ date: createdAt, boulders: [boulder] });
    }
  });

  return (
    <Site>
      {(role(app) === "admin" || role(app) === "setter") && <SetterBar />}
      <Boulders>
        {groups.map(({ date, boulders }) => (
          <React.Fragment key={date.toISOString()}>
            <BoulderSeparator>
              {new Intl.DateTimeFormat("en", { day: "2-digit", month: "long" }).format(date)}
            </BoulderSeparator>
            {boulders.map((boulder) => (
              <BoulderCard key={boulder.objectId} boulderE={boulder} />
            ))}
          </React.Fragment>
        ))}
      </Boulders>
    </Site>
  );
}

// ----------------------------------------------------------------------------

const Boulders = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const BoulderSeparator = styled.div`
  flex: 0 0 100%;
  width: 100%;
  padding: 20px 16px 12px;

  ${useTypeface(copy16Bold)};
  color: ${text};

  &:first-of-type {
    padding-top: 10px;
  }

  @media (min-width: 600px) {
    padding: 80px 24px 12px;
    &:first-of-type {
      padding: 20px 24px 12px;
    }
  }
`;
