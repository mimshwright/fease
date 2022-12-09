import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { linear } from "../preset";
import { StatefulParameterFunction } from "./Example";
import { exampleFunctions, getFunctionName } from "./exampleFunctions";
import { map } from "ramda";

interface FunctionSelectorProps {
  parameter: StatefulParameterFunction;
}

const SelectorItem = ({ label }: { label: string }) => (
  <FormControlLabel value={label} label={label} control={<Radio />} />
);

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
        {map((label: string) => <SelectorItem label={label} key={label} />)(
          Object.keys(exampleFunctions)
        )}
      </RadioGroup>
    </div>
  );
};

export default FunctionSelector;
