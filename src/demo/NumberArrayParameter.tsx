import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { StatefulParameterNumberArray } from "./Example";
import { getKeyForValue } from "./demoUtil";

interface NumberArrayParameterProps {
  parameter: StatefulParameterNumberArray;
}

const SelectorItem = ({ label }: { label: string }) => (
  <FormControlLabel value={label} label={label} control={<Radio />} />
);

const NumberArrayParameter: React.FC<NumberArrayParameterProps> = ({
  parameter: { label = "Function", value, setter, options },
}) => {
  return (
    <div className="NumberArrayParameter">
      <label>{label}</label>
      <RadioGroup
        value={getKeyForValue(options)(value ?? options[0])}
        onChange={(_, val: string) => setter(() => options[val])}
      >
        {Object.entries(options).map(([label, _]) => (
          <SelectorItem label={`${label}`} key={label} />
        ))}
      </RadioGroup>
    </div>
  );
};

export default NumberArrayParameter;
