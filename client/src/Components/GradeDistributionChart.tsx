import * as React from "react";
import styled from "styled-components";
import Measure, { BoundingRect } from "react-measure";

import { useTypeface, copy14 } from "../Materials/Typefaces";
import { gradeBackgroundColor, gradeBorderColor } from "../Materials/Colors";
import { scaleBand, scaleLinear } from "d3-scale";
import { grades } from "../storage";
import { GridLines, GridLabels } from "../Views/Components/Stats/Visualization";

export interface GradeDistributionChartProps {
  data: Array<{ grade: string; count: number }>;
  target?: Array<{ grade: string; count: number }>;
  planned?: Array<{ grade: string; count: number }>;
}

export class GradeDistributionChart extends React.Component<GradeDistributionChartProps> {
  render() {
    const { data, target, planned } = this.props;

    return (
      <Measure bounds>
        {({ measureRef, contentRect }) => (
          <div ref={measureRef} style={{ position: "relative", flex: 1 }}>
            {contentRect.bounds && contentRect.bounds.width > 0 && (
              <Chart bounds={contentRect.bounds} data={data} target={target} planned={planned} />
            )}
          </div>
        )}
      </Measure>
    );
  }
}

interface ChartProps {
  bounds: BoundingRect;
  data: Array<{ grade: string; count: number }>;
  target?: Array<{ grade: string; count: number }>;
  planned?: Array<{ grade: string; count: number }>;
}

const Chart = ({ bounds, data, target, planned }: ChartProps) => {
  const padding = {
    top: 24,
    left: 24,
    right: 24,
    bottom: 48,
  };

  if (data.length === 0) {
    return null;
  }

  const maybe_target = target || [];
  const maybe_planned = planned || [];
  const max = Math.max(Math.max(3, ...data.map((x) => x.count)), Math.max(3, ...maybe_target.map((x) => x.count)));

  let boulders = {}
  data.map(({ grade, count }) => (
    boulders[grade] = count
  ));

  const xScale = scaleBand()
    .domain(grades)
    .range([0, bounds.width - padding.left - padding.right - 24])
    .paddingOuter(0.2)
    .paddingInner(0.2);

  const yScale = scaleLinear()
    .domain([0, Math.round(max * 1.2)])
    .range([bounds.height - padding.bottom - padding.top, 0]);

  return (
    <svg width={bounds.width} height={bounds.height} style={{ position: "absolute", display: "block" }}>
      <g transform={`translate(${padding.left},${padding.top})`}>
        {maybe_target.map(({ grade, count }) => (
          <Waterline
            key={grade}
            x={xScale(grade)}
            y={yScale(count)}
            width={xScale.bandwidth()}
            height={yScale(0) - yScale(count)}
            fill="white"
            stroke="black"
          />
        ))}

        {data.map(({ grade, count }) => (
          <Rect
            key={grade}
            x={xScale(grade)}
            y={yScale(count)}
            width={xScale.bandwidth()}
            height={yScale(0) - yScale(count)}
            fill={gradeBackgroundColor(grade.toLowerCase())}
            stroke={gradeBorderColor(grade.toLowerCase())}
          />
        ))}

        {maybe_planned.map(({ grade, count }, i) => (
          <Planned
            key={grade}
            x={xScale(grade)}
            y={yScale(count + boulders[grade])}
            width={xScale.bandwidth()}
            height={yScale(0) - yScale(count)}
            fill={gradeBackgroundColor(grade.toLowerCase())}
            stroke={gradeBorderColor(grade.toLowerCase())}
          />
        ))}

        <GridLines width={bounds.width - padding.left - padding.right} yScale={yScale} />
        <GridLabels width={bounds.width - padding.left - padding.right} yScale={yScale} />
      </g>
      <g transform={`translate(${padding.left},${bounds.height - padding.bottom})`}>
        {data.map(
          ({ grade, count }) =>
            count && (
              <Text key={grade} x={(xScale(grade) || 0) + xScale.bandwidth() / 2} y={20}>
                {count}
              </Text>
            )
        )}
      </g>
    </svg>
  );
};

const Rect = styled.rect`
  stroke-width: 2;
  fill-opacity: 0.4;
  transition: fill-opacity 0.36s;

  &:hover {
    fill-opacity: 1;
  }
`;

const Planned = styled.rect`
  stroke-width: 2;
  fill-opacity: 0.4;
  fill: gray;
  transition: fill-opacity 0.36s;

  &:hover {
    fill-opacity: 1.0;
  }
`;

const Waterline = styled.rect`
  stroke-width: 1.5;
  stroke-dasharray: 10, 10;
  fill-opacity: 0.4;
  transition: fill-opacity 0.36s;
`;

const Text = styled.text`
  ${useTypeface(copy14)};
  fill: #222222bb;
  text-anchor: middle;
`;
