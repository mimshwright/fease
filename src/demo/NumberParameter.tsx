import { Slider } from "@mui/material";
import React from "react";
import { StatefulParameterNumber } from "./Example";

type NumberParameterProps = { parameter: StatefulParameterNumber };

const NumberParameter: React.FC<NumberParameterProps> = ({
  parameter: { label, value, setter, min, max },
}) => {
  return (
    <>
      <label>{label}</label>
      <Slider
        value={value}
        onChange={(_e: Event, val) => setter(val as number)}
        max={max}
        min={min}
        step={0.01}
        valueLabelDisplay="on"
      />
    </>
  );
};

export default NumberParameter;
