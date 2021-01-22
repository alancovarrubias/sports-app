import React from "react";
//import cx from "classnames";
import Typo from "../../../core/Typography";
import styles from "./style.module.css";

const DemoStart = props => {
  React.useEffect(() => {
    document.title = `React Design System 2.0 | Getting Started`;
    document.getElementsByTagName("META")[
      "description"
    ].content = `Ready to use React JS components for save your time. Installation guide.`;
  });

  return (
    <div className={styles.container}>
      <Typo type="h4" className={styles.h4_title}>
        Getting Started
      </Typo>
      <Typo type="h6" className={styles.h6_title}>
        Installation for React
      </Typo>
      <Typo large className={styles.text}>
        Setproduct Design System is available as the zip archive. To install
        unzip archive, copy all files from folder{" "}
        <span className={styles.text_warning}>
          <i>"SetProductKit"</i>
        </span>{" "}
        to your project folder and install{" "}
        <span className={styles.text_warning}>package.json</span> dependencies:
      </Typo>
      <div className={styles.text_command__warning}>npm install</div>
      <Typo large className={styles.text}>
        To run an app:
      </Typo>
      <div className={styles.text_command__success}>npm start</div>

      <Typo type="h6" className={styles.h6_title}>
        Installation for Figma
      </Typo>
      <Typo large className={styles.text}>
        You can drag an extracted{" "}
        <span className={styles.text_warning}>.fig</span> file from a folder on
        your computer, or from your Desktop, right into Figma. This is available
        on both the Figma Desktop app and the Figma web app (browser-based). You
        can drag and drop Files into the File Browser or the Editor.{" "}
        <a
          href="https://www.youtube.com/watch?v=cpG3foCWX-E"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          See how it works
        </a>
      </Typo>
      <Typo type="h6" className={styles.h6_title}>
        Might be helpful
      </Typo>
      <Typo large className={styles.text}>
        All components are based on{" "}
        <a
          href="https://blueprintjs.com/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          BlueprintJS components v.3
        </a>
        All UI kit components are located in the folder{" "}
        <span className={styles.text_warning}>/src/@setproduct-ui/core</span>.
        Copy of DemoApp components is located in the folder
        <span className={styles.text_warning}>
          /src/@setproduct-ui/demo
        </span>{" "}
        and you can run it locally.
      </Typo>
    </div>
  );
};

export default DemoStart;
