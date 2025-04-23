import "./styles.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { CSSProperties, JSX, useState } from "react";
import { take, range, round, slice } from "lodash";
import { scaleLinear } from "d3";

const RAIL_HEIGHT = 14;
const HANDLER_DIAMETER = 20;
const RANGE = [0, 100];
const INTIAL_VALUES = [25, 50, 75];

const COUNT = 2;

const singleHandleStyle = () => {
  const marginTop = ((HANDLER_DIAMETER - RAIL_HEIGHT) / 2) * -1;
  return {
    opacity: 1,
    height: HANDLER_DIAMETER,
    width: HANDLER_DIAMETER,
    marginTop,
    borderColor: "#3EF08F",
  } as CSSProperties;
};
const handleStyle = range(COUNT + 1).map(() => singleHandleStyle());

function map2<T, U>(
  array: T[],
  mapper: (current: T, next: T, index: number, array: T[]) => U,
): U[] {
  return array.slice(1).map((next, i) => mapper(array[i], next, i, array));
}

function scaledRange(n: number, domain: [number, number]) {
  const scale = scaleLinear(domain, [0, 100]);
  const scaledRange = scale(n);
  const roundedScaledRange = round(scaledRange, 2);
  return roundedScaledRange;
}

function rangesAddPushble(newRanges: number[], pushable: number = 0) {
  const delta = 1.4;

  const firstRange = scaledRange(newRanges[0], [0, 100 - 2 * pushable]);
  const lastRange = scaledRange(newRanges[newRanges.length - 1], [
    0,
    100 - 2 * pushable,
  ]);
  const middleRanges = slice(newRanges, 1, newRanges.length - 1).map((r) =>
    scaledRange(r, [pushable, 100 - pushable]),
  );

  return [firstRange, ...middleRanges, lastRange];
}

interface SliderRangeProps {
  ranges: number[];
  colors: string[];
  onRangesChange: (ranges: number[]) => void;
  label: (range: number, index: number) => JSX.Element | string;
  width: number;
}

const rangesToPositions = (ranges: number[]) =>
  take<number>(
    ranges.reduce((acc: number[], curr, i) => {
      return i === 0 ? [curr] : [...acc, curr + acc[i - 1]];
    }, []),
    3,
  );

const positionsToRanges = (positions: number[]) => {
  return [
    positions[0] - RANGE[0],
    positions[1] - positions[0],
    positions[2] - positions[1],
    RANGE[1] - positions[2],
  ];
};

export default function SliderRange({
  ranges,
  label,
  colors,
  width,
  onRangesChange,
}: SliderRangeProps) {
  const trackStyle = colors.slice(1).map((c) => ({
    backgroundColor: c,
    height: RAIL_HEIGHT,
  }));

  const pushable = round((HANDLER_DIAMETER / width) * (RANGE[1] - RANGE[0]), 2);
  const [value, setValue] = useState([pushable * 2, 50, 75]);
  console.log(value);

  const HTML_RANGES = ranges;
  const HTML_POSITIONS = rangesToPositions(ranges);
  const HTML_NEW_RANGES = positionsToRanges(rangesToPositions(ranges));
  const HTML_SCALED_RANGES = rangesAddPushble(ranges, pushable);

  return (
    <div>
      <div style={{ display: "flex" }}>RANGES: </div>
      <div style={{ display: "flex" }}>
        {HTML_RANGES.map((d, i) => (
          <div key={i} style={{ margin: "0 10px" }}>
            {ranges[i]}
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>POSITIONS: </div>
      <div style={{ display: "flex" }}>
        {HTML_POSITIONS.map((d, i) => (
          <div key={i} style={{ margin: "0 10px" }}>
            {rangesToPositions(ranges)[i]}
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>NEW RANGES: </div>
      <div style={{ display: "flex" }}>
        {HTML_NEW_RANGES.map((d, i) => (
          <div key={i} style={{ margin: "0 10px" }}>
            {positionsToRanges(rangesToPositions(ranges))[i]}
          </div>
        ))}
      </div>

      <Slider
        range
        style={{ width, margin: 20 }}
        count={ranges.length - 2}
        min={RANGE[0]}
        max={RANGE[1]}
        value={rangesToPositions(ranges)}
        // value={value}
        pushable={pushable}
        step={0.01}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        railStyle={{
          background: `linear-gradient(to right, ${colors[0]} ${ranges[0]}%, ${
            colors[colors.length - 1]
          } ${ranges[0]}%)`,
          height: RAIL_HEIGHT,
        }}
        onChange={
          ((d: number[]) => {
            setValue(d);

            const newRanges = positionsToRanges(d);

            onRangesChange(newRanges);

            rangesAddPushble(newRanges, pushable);
          }) as any
        }
        dotStyle={{ display: "none" }}
      />

      <div style={{ display: "flex", fontWeight: 500 }}>SCALED RANGES: </div>
      <div style={{ display: "flex", fontWeight: 800 }}>
        {HTML_SCALED_RANGES.map((d, i) => (
          <div key={i} style={{ margin: "0 10px" }}>
            {rangesAddPushble(ranges, pushable)[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
