import React from "react";
import cx from "classnames";
import Typo from "../../../core/Typography";
import { Palette } from "./palette";
import styles from "./style.module.css";

const DemoColors = props => {
  return (
    <div className={styles.container}>
      <Typo type="h4">Colors</Typo>
      <Typo type="h6" colorStep={60} className={styles.sub_title}>
        Flexible palette based on 12 color tokens
      </Typo>
      <Typo large className={styles.text}>
        Black, white and everything in between. The gray scale should be used
        for the main UI frame: containers, headers, sections, boxes, etc. If you
        need to call attention to a particular element (buttons, icons,
        tooltips, etc.), use one of the core colors.
      </Typo>

      <div className={styles.main_colors}>
        <div className={styles.colors_array}>
          <Palette />
        </div>
        <div className={styles.space_between} />
        <div className={styles.colors_array}>
          <Palette alias="primary" color="blue" />
        </div>
      </div>
      <Typo type="h4">Action Colors</Typo>
      <Typo type="h6" colorStep={60} className={styles.sub_title}>
        Use green for successfull experience, yellow for attention and red for
        the warning / danger statements
      </Typo>
      <div className={styles.action_colors}>
        <div className={styles.colors_array}>
          <Palette alias="success" color="green" />
        </div>
        <div className={styles.space_between} />
        <div className={styles.colors_array}>
          <Palette alias="warning" color="yellow" />
        </div>
        <div className={styles.space_between} />
        <div className={cx(styles.colors_array, styles.full_space)}>
          <Palette alias="danger" color="red" />
        </div>
      </div>
      <Typo type="h4">Alternative Colors</Typo>
      <Typo type="h6" colorStep={60} className={styles.sub_title}>
        You can replace or mix any of Action Colors with alternative
      </Typo>
      <div className={styles.alt_colors}>
        <div className={styles.colors_array}>
          <Palette alias="primary_alt" color="indigo" />
        </div>
        <div className={styles.space_between} />
        <div className={styles.colors_array}>
          <Palette alias="success_alt" color="teal" />
        </div>
        <div className={styles.space_between} />
        <div className={styles.colors_array}>
          <Palette alias="warning_alt" color="orange" />
        </div>
        <div className={styles.space_between} />
        <div className={styles.colors_array}>
          <Palette alias="danger_alt" color="pink" />
        </div>
      </div>
    </div>
  );
};

export default DemoColors;
