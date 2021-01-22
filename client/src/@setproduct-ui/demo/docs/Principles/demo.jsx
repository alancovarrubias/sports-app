import React from "react";
//import cx from "classnames";
import Typo from "../../../core/Typography";
import styles from "./style.module.css";

import Img01 from "./Flat.png";
import Img02 from "./Outlined.png";
import Img03 from "./Filled.png";
import Img04 from "./Raised.png";
import Img05 from "./Mix-it.svg";

const DemoStart = props => {
  React.useEffect(() => {
    document.title = `React Design System 2.0 | React UI kit`;
    document.getElementsByTagName("META")[
      "description"
    ].content = `Ready to use React JS components for save your time.`;
  });

  return (
    <div className={styles.container}>
      <Typo type="h4" className={styles.h4_title}>
        Design principles
      </Typo>
      <Typo large className={styles.text}>
        Setproduct Design System is based on smart layout building principles.
        Providing a variety of predefined styles for each component both in
        React & Figma — It’s fast & easy to manage{" "}
        <span className={styles.text_warning}>
          Flat, Filled, Smooth, Outlined
        </span>{" "}
        or <span className={styles.text_warning}>Raised</span> props for
        building consistent dashboard aimed for a smooth user experience.
      </Typo>
      <div className={styles.promo_group}>
        <div className={styles.promo_item}>
          <Typo type="h6" className={styles.h6_title}>
            Flat style
          </Typo>
          <Typo large className={styles.sub_title__item}>
            Minimal theme which aimed for data-fist interfaces. Flat style has
            no borders or surface until the interaction.
          </Typo>
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--grey30)" }}
          >
            <img className={styles.item_img} src={Img01} alt="Flat" />
          </div>
        </div>
        <div className={styles.promo_item}>
          <Typo type="h6" className={styles.h6_title}>
            Outlined style
          </Typo>
          <Typo large className={styles.sub_title__item}>
            Border-styled theme is an alternate way to separate the layout.
            Sometimes it grows from 1px to 2px during the action.
          </Typo>
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--blue30)" }}
          >
            <img className={styles.item_img} src={Img02} alt="Outlined" />
          </div>
        </div>
      </div>

      <div className={styles.promo_group}>
        <div className={styles.promo_item}>
          <Typo type="h6" className={styles.h6_title}>
            Filled style
          </Typo>
          <Typo large className={styles.sub_title__item}>
            Contrast theme is the best fit to attract. Use filled style for
            Buttons, Errors, Success states and for urgent feedback.
          </Typo>
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--indigo30)" }}
          >
            <img className={styles.item_img} src={Img03} alt="Flat" />
          </div>
        </div>
        <div className={styles.promo_item}>
          <Typo type="h6" className={styles.h6_title}>
            Raised style
          </Typo>
          <Typo large className={styles.sub_title__item}>
            Shadows are recommended to show the depth in your UI. The elevation
            is under your control for toggle hovering effect.
          </Typo>
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--green30)" }}
          >
            <img className={styles.item_img} src={Img04} alt="Outlined" />
          </div>
        </div>
      </div>

      <Typo type="h4" className={styles.h6_title}>
        Let’s mix it!
      </Typo>
      <Typo large className={styles.text}>
        Wide range of themification opportunities — combine themes to build
        effective interfaces
      </Typo>

      <div className={styles.promo_group} style={{ marginTop: "1.5rem" }}>
        <img className={styles.item_img} src={Img05} alt="Mix pattern" />
      </div>
    </div>
  );
};

export default DemoStart;
