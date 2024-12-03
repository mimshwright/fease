import { Checkbox } from "@mui/material";
import React from "react";
import { StatefulParameterBoolean } from "./Example";
import "./BooleanParameter.css";

type BooleanParameterProps = { parameter: StatefulParameterBoolean };

const BooleanParameter: React.FC<BooleanParameterProps> = ({
  parameter: { label, value, setter },
}) => {
  return (
    <div className="BooleanParameter">
      <label>
        <code>
          {label}: {value}
        </code>
      </label>
      <Checkbox checked={value} onChange={(_e, checked) => setter(checked)} />
    </div>
  );
};

export default BooleanParameter;
