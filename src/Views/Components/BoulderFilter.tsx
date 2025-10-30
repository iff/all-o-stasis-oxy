import * as React from "react";
import styled from "styled-components";

import { BoulderId24 } from "./BoulderId";
import { useEnv } from "../../env";
import { applyTypeface, copy16Bold } from "../../Materials/Typefaces";
import { text } from "../../Materials/Colors";

const BoulderGradeToggleButton = ({ grade, grades, onToggle }) => {
  const { config } = useEnv();
  const gradeColor = config.gradeColor(grade);
  return (
    <BoulderGradeToggle
      onClick={() => {
        onToggle(grade);
      }}
    >
      <BoulderId24 $grade={gradeColor}>{grades.indexOf(grade) === -1 ? "" : <Cross />}</BoulderId24>
    </BoulderGradeToggle>
  );
};

const Cross = () => (
  <svg width="18" height="18">
    <path stroke="currentColor" strokeWidth="2" d="M 2 2 L 16 16" />
    <path stroke="currentColor" strokeWidth="2" d="M 16 2 L 2 16" />
  </svg>
);

interface BoulderFilterProps {
  selectedGrades: string[];
  setSelectedGrades: (grades: string[]) => void;
}

export const BoulderFilterR = ({ selectedGrades, setSelectedGrades }: BoulderFilterProps) => {
  const { config } = useEnv();

  const toggleGrade = (grade: string): void => {
    if (selectedGrades.indexOf(grade) === -1) {
      setSelectedGrades([grade].concat(selectedGrades));
    } else {
      setSelectedGrades(selectedGrades.filter((x) => x !== grade));
    }
  };

  return (
    <BoulderFilter>
      <div style={{ marginRight: 32 }}>
        <BoulderFilterHeader>Filter</BoulderFilterHeader>
        <div style={{ display: "flex" }}>
          {config.grades.map((grade) => (
            <BoulderGradeToggleButton key={grade} grade={grade} grades={selectedGrades} onToggle={toggleGrade} />
          ))}
        </div>
      </div>
    </BoulderFilter>
  );
};

// ----------------------------------------------------------------------------

const BoulderFilter = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px 16px 12px;
  @media (min-width: 600px) {
    display: flex;
    padding: 20px 24px 20px;
  }
`;
const BoulderFilterHeader = styled.div`
  ${applyTypeface(copy16Bold)};
  color: ${text};
  padding-right: 20px;
`;

const BoulderGradeToggle = styled.div`
  cursor: pointer;
  margin: 8px 4px 8px 0;
`;
