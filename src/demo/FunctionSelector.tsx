import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { linear } from "../preset";
import { StatefulParameterFunction } from "./Example";
import { defaultExampleFunctions, getFunctionName } from "./exampleFunctions";
import { map } from "ramda";

interface FunctionSelectorProps {
  parameter: StatefulParameterFunction;
}

const SelectorItem = ({ label }: Readonly<{ label: string }>) => (
  <FormControlLabel value={label} label={label} control={<Radio />} />
);

const FunctionSelector: React.FC<FunctionSelectorProps> = ({
  parameter: {
    label = "Function",
    value = linear,
    setter,
    options = defaultExampleFunctions,
  },
}) => {
  return (
    <div className="FunctionSelector">
      <label>{label}</label>
      <RadioGroup
        value={getFunctionName(options)(value)}
        onChange={(_, val: string) => setter(() => options[val])}
      >
        {map((label: string) => <SelectorItem label={label} key={label} />)(
          Object.keys(options),
        )}
      </RadioGroup>
    </div>
  );
};

export default FunctionSelector;
