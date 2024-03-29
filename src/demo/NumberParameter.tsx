import { Slider } from "@mui/material";
import React from "react";
import { StatefulParameterNumber } from "./Example";
import "./NumberParameter.css";

type NumberParameterProps = { parameter: StatefulParameterNumber };

const NumberParameter: React.FC<NumberParameterProps> = ({
  parameter: { label, value, setter, min, max, step = 0.01 },
}) => {
  return (
    <div className="NumberParameter">
      <label>
        <code>
          {label}: {value}
        </code>
      </label>
      <Slider
        value={value}
        onChange={(_e: Readonly<Event>, val) => setter(val as number)}
        max={max}
        min={min}
        step={step}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default NumberParameter;
