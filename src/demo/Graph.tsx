import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Stage } from "@inlet/react-pixi";
import { EasingGraphComponent } from "pixi-easing-graph";
import { ThemeColors, GraphFunctions } from "./demoTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface Props {
  fs: GraphFunctions;
  themeColors: ThemeColors;
}

type Style = "line" | "fill" | "dot";

type Speed = "slow" | "medium" | "fast";
const durations: Record<Speed, number> = {
  slow: 3000,
  medium: 1500,
  fast: 500,
};

const Graph: React.FC<Props> = ({ fs, themeColors }) => {
  const [style, setStyle] = React.useState<Style>("line");
  const [showValues, setShowValues] = React.useState<boolean>(false);
  const [showTrail, setShowTrail] = React.useState<boolean>(false);
  const [speed, setSpeed] = React.useState<Speed>("medium");

  return (
    <div className="Graph">
      <ErrorBoundary
        FallbackComponent={() => (
          <div>
            An error occurred trying to render a graph of this function.
          </div>
        )}
      >
        <Stage
          width={400}
          height={450}
          options={{
            resolution: 2,
            backgroundAlpha: 0,
          }}
        >
          <EasingGraphComponent
            f={fs}
            width={300}
            height={300}
            x={50}
            y={100}
            duration={durations[speed]}
            markerTrail={showTrail}
            exampleTrail={showTrail}
            showValues={showValues}
            style={style}
            autoPlay={true}
            loop={true}
            showExample={true}
            exampleSize={15}
            gridSubdivisions={true}
            fillAlpha={0.5}
            background={themeColors.background}
            foreground={themeColors.foreground}
            gridColor={themeColors.gridColor}
            markerColor={themeColors.markerColor}
            exampleColor={themeColors.exampleColor}
          />
        </Stage>
      </ErrorBoundary>
      <Accordion className="controls">
        <AccordionSummary>Graph Options +</AccordionSummary>
        <AccordionDetails>
          <div>
            Trails:{" "}
            <ToggleButton
              value="checked"
              selected={showTrail}
              onChange={() => setShowTrail(!showTrail)}
            >
              {showTrail ? "on" : "off"}
            </ToggleButton>
          </div>
          <div>
            Speed:{" "}
            <ToggleButtonGroup
              exclusive
              value={speed}
              onChange={(_target, speed) => setSpeed(speed)}
            >
              <ToggleButton value="slow">slow</ToggleButton>
              <ToggleButton value="medium">medium</ToggleButton>
              <ToggleButton value="fast">fast</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            Style:{" "}
            <ToggleButtonGroup
              exclusive
              value={style}
              onChange={(_target, style) => setStyle(style)}
            >
              <ToggleButton value="line">line</ToggleButton>
              <ToggleButton value="fill">fill</ToggleButton>
              <ToggleButton value="dot">dot</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div>
            Show values:{" "}
            <ToggleButton
              value="checked"
              selected={showValues}
              onChange={() => setShowValues(!showValues)}
            >
              {showValues ? "yes" : "no"}
            </ToggleButton>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default Graph;
