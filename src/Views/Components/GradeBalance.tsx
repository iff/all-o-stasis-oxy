import * as Avers from "avers";
import * as React from "react";
import dynamic from "next/dynamic";

import { Boulder, grades } from "../../storage";

import { yellow100, green100, orange100, blue100, red100 } from "../../Materials/Colors";

export interface GradeBalanceProps {
  boulders: Array<Avers.Editable<Boulder>>;
  height: number;
  width: number;
}

const AsyncVegaLite: React.ComponentType<any> = dynamic(() => import("react-vega-lite").then((m) => m.default));

export function GradeBalance({ boulders, height, width }: GradeBalanceProps) {
  const spec = {
    description: "Boulder grade distribution for a sector.",
    width: width,
    height: height,
    mark: { type: "bar", style: "bar" },
    encoding: {
      x: { field: "grade", type: "nominal", sort: null },
      y: { field: "count", type: "quantitative" },
      color: {
        field: "grade",
        type: "nominal",
        scale: { range: ["#000000", blue100, green100, orange100, red100, "#FFFFFF", yellow100] },
      },
    },
    config: {
      style: {
        bar: {
          stroke: "#000000",
          strokeWidth: 0.5,
        },
      },
    },
  };

  const prepareData = () => {
    const data: { values: Array<{ grade: string; count: number }> } = { values: [] };
    grades.forEach((gradeName) => {
      data.values.push({ grade: gradeName, count: 0 });
    });
    boulders.forEach((boulder) => {
      data.values[grades.indexOf(boulder.content.grade)].count++;
    });
    return data;
  };

  return <AsyncVegaLite spec={spec} data={prepareData()} />;
}
