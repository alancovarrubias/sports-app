import React from "react";

import { Label } from "@blueprintjs/core";
import Checkbox from "../../core/CheckBox";
import Slider from "../../core/Slider";
import { RadioGroup } from "@blueprintjs/core";
import Radio from "../../core/Radio";

import StyleGrid from "../styles/style.module.css";

const PropsGroup = props => {
  const {
    rounded,
    setRounded,
    burgerSize,
    setBurgerSize,
    variants,
    variant,
    setVariant,
    margin
  } = props;

  const handleClick = React.useCallback(e => setVariant(e.target.value), [
    setVariant
  ]);

  return (
    <div className={StyleGrid["demo-props"]}>
      <Label>Props:</Label>
      <div className="demo-props">
        <Checkbox
          type="dense"
          color={rounded ? "primary" : "default"}
          checked={rounded}
          label="Rounded"
          onChange={() => setRounded(!rounded)}
          fill
          margin={margin}
        />
        <RadioGroup
          inline={false}
          label="Animations:"
          name="Variant group"
          onChange={() => null}
          selectedValue={variant}
          style={{ float: "left" }}
          className="demo-color-group"
        >
          {variants.map(([label, value], i) => (
            <Radio
              type="dense"
              color={value === variant ? "primary" : "default"}
              label={label}
              value={value}
              onClick={handleClick}
              alignIndicator="left"
              //large
              key={i}
              checked={value === variant && true} //important
              style={{ margin: "2px" }}
              onChange={() => null}
              fill
            />
          ))}
        </RadioGroup>
        <Label>
          Hamburger size
          <Slider
            view="filled"
            color="default"
            labelStepSize={32}
            min={12}
            max={48}
            onChange={value => setBurgerSize(value)}
            stepSize={4}
            showTrackFill={true}
            value={burgerSize}
            className="demo-slider"
          />
        </Label>
      </div>
    </div>
  );
};

export default PropsGroup;
