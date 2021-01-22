import React from "react";
import cx from "classnames";

import Checkbox from "@material-ui/core/Checkbox";

import View from "./_view.module.css";
import Color from "../../../styles/color.module.css";

export default class SP_Checkbox extends React.Component {
  state = {
    checked: this.props.checked
  };

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { color = "default", children, active, ...props } = this.props;

    return (
      <Checkbox
        className={cx(
          active ? View["active"] : View["default"],
          this.state.checked && View["checked"],
          Color[color]
        )}
        //checked={checked ? true : false}
        onClick={this.handleChange}
        checked={this.state.checked}
        {...props}
      >
        {children}
      </Checkbox>
    );
  }
}

/*export default SP_Checkbox;*/
