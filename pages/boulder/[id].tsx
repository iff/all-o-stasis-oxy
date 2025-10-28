import * as Avers from "avers";
import { DayPicker } from "react-day-picker";
import * as React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { role, resetBoulderCollections, cloneBoulder } from "../../src/actions";
import { App } from "../../src/app";
import { Boulder } from "../../src/storage";

import { text, darkGrey, primary, secondary } from "../../src/Materials/Colors";
import { useTypeface, copy16Bold, copy14 } from "../../src/Materials/Typefaces";

import { NumberInput } from "../../src/Views/Components/NumberInput";
import { Site } from "../../src/Views/Components/Site";
import { BoulderDetails } from "../../src/Views/Components/BoulderDetails";
import { BoulderId } from "../../src/Views/Components/BoulderId";
import { SectorPicker } from "../../src/Views/Components/SectorPicker";
import { Button } from "../../src/Components/Button";
import { BoulderSetterCard } from "../../src/Views/Components/BoulderSetterCard";
import { SetterPicker } from "../../src/Components/SetterPicker";
import { Loader } from "../../src/Components/Loader";
import { useEnv } from "../../src/env";

function BoulderDetailsEditor({ app, boulderE }: { app: App; boulderE: Avers.Editable<Boulder> }) {
  const { config } = useEnv();
  const boulder = boulderE.content;

  function changeSetDate(date) {
    boulder.setDate = date.valueOf();
    resetBoulderCollections(app);
  }

  function getSetDate(): Date {
    const initialDate = new Date(boulder.setDate);
    return initialDate;
  }

  function changeRemovedDate(date) {
    boulder.removed = date.valueOf();
    resetBoulderCollections(app);
  }

  function setRemoved() {
    changeRemovedDate(Date.now());
  }

  function toggleDraft() {
    if (boulder.isDraft == 1) {
      // const now = Date.now();
      // boulder.setDate = now.valueOf();
      boulder.isDraft = 0;
    } else {
      boulder.isDraft = 1;
    }
    resetBoulderCollections(app);
  }

  function clone() {
    cloneBoulder(app, boulderE);
  }

  function clearRemoved() {
    changeRemovedDate(0);
  }

  function addSetter(accountId) {
    boulder.setter = [...boulder.setter, accountId];
  }

  function removeSetter(accountId) {
    if (confirm(`Are you sure you want to remove the setter?`)) {
      boulder.setter = boulder.setter.filter(x => x !== accountId);
    }
  }

  return (
    <div>
      <Section>Sector</Section>
      <div>
        <div style={{ maxWidth: 400 }}>
          <SectorPicker
            sectors={[boulder.sector]}
            onChange={sector => {
              boulder.sector = sector || config.sectors[0];
            }}
          />
        </div>
      </div>

      <Section>Setters</Section>
      <div>
        {boulder.setter.map((setterId, index) => (
          <BoulderSetterCard key={index} setterId={setterId} onClick={removeSetter} />
        ))}
        <AddSetter app={app} addSetter={addSetter} />
      </div>

      <Section>Grade</Section>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <GradeSelect boulder={boulder} grade="yellow" />
          <GradeSelect boulder={boulder} grade="green" />
          <GradeSelect boulder={boulder} grade="orange" />
          <GradeSelect boulder={boulder} grade="blue" />
          <GradeSelect boulder={boulder} grade="red" />
          <GradeSelect boulder={boulder} grade="white" />
          <GradeSelect boulder={boulder} grade="black" />
        </div>
        <div style={{ marginTop: 12 }}>
          <NumberInput object={boulder} field="gradeNr" />
        </div>
      </div>

      <Section>Set Date</Section>
      <DayPickerWrapper>
        <DayPicker mode="single" fixedWeeks selected={getSetDate()} onSelect={changeSetDate} />
      </DayPickerWrapper>

      <Section>Utilities</Section>
        <DangerButton onClick={clone}>Add another boulder like this</DangerButton>

      <Section>Planing</Section>
      {(() => {
        if (boulder.isDraft > 0) {
          return (
            <div>
              <DangerButton onClick={toggleDraft}>Marked as Draft {'->'} Done</DangerButton>
            </div>
          );
        } else {
          return (
            <div>
              <DangerButton onClick={toggleDraft}>Set as draft Boulder</DangerButton>
            </div>
          );
        }
      })()}

      <Section>Danger Zone</Section>
      {(() => {
        if (boulder.removed > 0) {
          return (
            <div>
              <SectionLabel>The boulder was removed on</SectionLabel>
              <div>
                <DayPickerWrapper>
                  <DayPicker
                    mode="single"
                    fixedWeeks
                    selected={new Date(boulder.removed)}
                    onSelect={changeRemovedDate}
                  />
                </DayPickerWrapper>
                <DangerButton onClick={clearRemoved}>Put back on wall</DangerButton>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <DangerButton onClick={setRemoved}>Remove</DangerButton>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default function Page() {
  const router = useRouter()
  const { app } = useEnv();

  const boulderId = router.query.id as string
  if (boulderId === undefined) {
    return <div>No id query param</div>;
  }

  return Avers.lookupEditable<Boulder>(app.data.aversH, boulderId)
    .fmap(boulderE => {
      const boulderRep =
        role(app) === "user" ? (
          <BoulderDetails boulder={boulderE.content} />
        ) : (
          <BoulderDetailsEditor app={app} boulderE={boulderE} />
        );

      return (
        <Site>
          <Header boulder={boulderE.content} />
          <div style={{ margin: 24, display: "flex" }}>
            <div style={{ width: "400px", flex: "0 1 400px" }}>{boulderRep}</div>
          </div>
        </Site>
      );
    })
    .get(
      <Site>
        <Loader />
      </Site>
    );
}

function Header({ boulder }: { boulder: Boulder }) {
  return (
    <div style={{ margin: 24, display: "flex" }}>
      <BoulderId $grade={boulder.grade}>{boulder.gradeNr}</BoulderId>
    </div>
  );
}

// ----------------------------------------------------------------------------

const GradeSelect = ({ boulder, grade }: any) => {
  const { config } = useEnv();
  return (
      <GradeSelectButton
    onClick={() => {
      boulder.grade = grade || config.grades[0];
    }}
  >
    <BoulderId $grade={grade}>{boulder.grade === grade ? <Cross /> : ""}</BoulderId>
  </GradeSelectButton>
  )
};

const GradeSelectButton = styled.div`
  cursor: pointer;

  & ${BoulderId} {
    transition: transform 0.2s;
  }

  &:hover ${BoulderId} {
    transform: scale(1.08);
  }
`;

const Cross = () => (
  <svg width="24" height="24">
    <path stroke="currentColor" strokeWidth="2" d="M 2 2 L 22 22" />
    <path stroke="currentColor" strokeWidth="2" d="M 22 2 L 2 22" />
  </svg>
);

// ----------------------------------------------------------------------------

function AddSetter({ app, addSetter }: { app: App; addSetter: (accountId: string) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleAddSetter = (accountId: string) => {
    addSetter(accountId);
    close();
  };

  return (
    <AddSetterContainer>
      <a href="#" onClick={open}>
        Add setter
      </a>
      {isOpen && <SetterPicker app={app} dismiss={close} addSetter={handleAddSetter} />}
    </AddSetterContainer>
  );
}

const AddSetterContainer = styled.div`
  ${useTypeface(copy14)};
  cursor: pointer;

  & a {
    color: ${secondary};
    text-decoration: none;
    transition: all 0.16s;
  }

  & a:hover {
    color: ${secondary};
    text-decoration: underline;
  }
`;

// ----------------------------------------------------------------------------

const Section = styled.div`
${useTypeface(copy16Bold)}
color: ${text};

padding: 40px 0 12px;
&:first-of-type {
    padding: 0 0 12px;
}
`;

const SectionLabel = styled.div`
${useTypeface(copy14)}
color: ${darkGrey};

padding: 0 0 4px;
`;

const DangerButton = styled(Button)``;

// ----------------------------------------------------------------------------

const DayPickerWrapper = styled.div`
  & .rdp-root {
    display: inline-block;
    background: white;
    border: 1px solid ${primary};
    padding: 1em;
  }
`;
