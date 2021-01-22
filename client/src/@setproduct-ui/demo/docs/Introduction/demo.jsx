import React from "react";
//import cx from "classnames";
import Typo from "../../../core/Typography";
import styles from "./style.module.css";
import * as LINKS from "../../constants/Constants";
import Img01 from "./01_action_green_800.gif";
import Img02 from "./02_red_segment_800.gif";
import Img03 from "./03_raised_btn_800.gif";
import Img04 from "./04_menu_800.gif";

const DemoStart = props => {
  React.useEffect(() => {
    document.title = `React Design System 2.0 | React UI kit`;
    document.getElementsByTagName("META")[
      "description"
    ].content = `Ready to use React JS components for save your time.`;
  });

  return (
    <div className={styles.container}>
      <Typo type="h2" color="primary" colorStep={80}>
        React UI kit
      </Typo>
      <Typo type="h4" className={styles.h4_title}>
        Introduction
      </Typo>
      <Typo large className={styles.text}>
        Setproduct Design System is the unlike React UI kit. Including
        <a
          href={LINKS.FIGMA_DEMO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Figma design sources
        </a>
        + React components based on enhanced and restyled BlueprintJS library
        this system saves «a penny», because you skipping a pixel routine and
        get ready to use components & templates (soon!) kit on hands to build
        apps faster.
      </Typo>
      <Typo type="h6" className={styles.h6_title}>
        What’s the purpose
      </Typo>
      <Typo large className={styles.text}>
        2-in-1 toolkit for teams, individual developers, or designers who code.
        Designed and well-organized in Figma and served as the components
        library powered by auto-layout. Styles and specs were translated
        manually and styled in ReactJS. This product guarantees you the speeding
        up your workflow, obtaining UI consistency and bringing more visual
        aesthetics to your apps.
      </Typo>
      <Typo type="h6" className={styles.h6_title}>
        What’s the difference
      </Typo>
      <Typo large className={styles.text}>
        Setproduct Design System provides <i>Flat, Filled, Smooth, Outlined</i>{" "}
        or <i>Raised</i> instances for every component, UI widget or template.
        Pick a Flat style for simple and data-fist UI or go with Raised if
        you’re a fan of Material Design. We tried to cover all the style
        variations ever possible in the user interface design and make it easy
        to swap both in React and Figma.
      </Typo>
      <div className={styles.promo_group}>
        <div className={styles.promo_item}>
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--green30)" }}
          >
            <img className={styles.item_img} src={Img01} alt="Action button" />
          </div>
          <Typo color="success" colorStep={80} className={styles.sub_title}>
            Set a UI theme by swapping props and Figma instances. For the rest
            of components there are 4+ styles available.
          </Typo>
        </div>
        <div className={styles.promo_item}>
          {" "}
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--red30)" }}
          >
            <img className={styles.item_img} src={Img02} alt="Segment" />
          </div>
          <Typo color="danger" colorStep={80} className={styles.sub_title}>
            Build UXeful interfaces with a toolkit where all the details
            considered. Hovers, clicks, timings & animation.
          </Typo>
        </div>
        <div className={styles.promo_item}>
          {" "}
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--blue30)" }}
          >
            <img className={styles.item_img} src={Img03} alt="Raised button" />
          </div>
          <Typo color="primary" colorStep={80} className={styles.sub_title}>
            States are neatly maintained for any component to interact with. We
            reimagined styles for the smooth and better user experience.
          </Typo>
        </div>
        <div className={styles.promo_item}>
          {" "}
          <div
            className={styles.item_img_container}
            style={{ borderColor: "var(--grey30)" }}
          >
            <img className={styles.item_img} src={Img04} alt="Menu" />
          </div>
          <Typo colorStep={80} className={styles.sub_title}>
            Get inspired by interacting with the polished components. We aimed
            to build huge patterns gallery and release it as templates.
          </Typo>
        </div>
      </div>
    </div>
  );
};

export default DemoStart;
