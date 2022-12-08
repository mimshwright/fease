import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { linear, cubic, sinWave } from "../preset";
import { EasingFunction } from "../types";
import { StatefulParameterFunction } from "./Example";
import { equals, filter, pipe, keys, head } from "ramda";

interface FunctionSelectorProps {
  parameter: StatefulParameterFunction;
}

// examples
const exampleFunctions: Record<string, EasingFunction> = {
  linear,
  cubic,
  sinWave,
};

const getFunctionName = (func: EasingFunction): string =>
  pipe(filter(equals(func)), keys, head)(exampleFunctions) as string;

const FunctionSelector: React.FC<FunctionSelectorProps> = ({
  parameter: { label = "Function", value = linear, setter },
}) => {
  return (
    <div className="FunctionSelector">
      <label>{label}</label>
      <RadioGroup
        value={getFunctionName(value)}
        onChange={(_, val: string) => setter(() => exampleFunctions[val])}
      >
        <FormControlLabel value="linear" control={<Radio />} label="Linear" />
        <FormControlLabel value="cubic" control={<Radio />} label="Cubic" />
        <FormControlLabel
          value="sinWave"
          control={<Radio />}
          label="Sine Wave"
        />
      </RadioGroup>
    </div>
  );
};

export default FunctionSelector;
