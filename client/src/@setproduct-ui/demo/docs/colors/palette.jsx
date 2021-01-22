import React from "react";
import cx from "classnames";
import { Icon } from "@blueprintjs/core";
import Typo from "../../../core/Typography";
import Toaster from "../../../core/Toast/Toaster.jsx";
import { useDevice } from "../../components/customHooks";

import styles from "./style.module.css";
import Color from "../../../styles/color.module.css";

export const Palette = ({ color = "grey", alias = "default", ...props }) => {
  const colors_array = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  let device = useDevice();

  const [toastRef, setRef] = React.useState(null);
  /**Success toast */
  const SuccessToast = {
    message: "Copied successful!",
    timeout: 1000,
    icon: <Icon icon="tick" iconSize={24} />
  };
  /**Copy function */
  const copyToClipboard = source => {
    const textField = document.createElement("textarea");
    textField.innerHTML = source;
    document.body.appendChild(textField);
    textField.select();
    device !== "mobile" &&
      (document.execCommand("copy") && toastRef.show(SuccessToast));
    textField.remove();
  };

  return (
    <>
      <section>
        {colors_array.map((color_step, i) => (
          <div
            className={cx(styles.color_item, Color[alias])}
            key={i}
            style={{
              background: `var(--${color + color_step})`
            }}
            onClick={() =>
              copyToClipboard(
                window
                  .getComputedStyle(document.getElementById("root"), null)
                  .getPropertyValue("--" + color + color_step),
                color + color_step
              )
            }
          >
            <Typo
              large
              colorStep={color_step < 30 ? 60 : 0}
              color={alias}
              className={styles.color_name}
              data-color={color + " " + color_step}
            />

            <Typo
              type="overline"
              colorStep={color_step < 30 ? 60 : 0}
              color={alias}
              className={styles.color_hex}
            >
              {window
                .getComputedStyle(document.getElementById("root"), null)
                .getPropertyValue("--" + color + color_step)}
            </Typo>
          </div>
        ))}
      </section>
      <Toaster
        view="outlined"
        color={alias}
        usePortal={false}
        position="bottom"
        setRef={setRef}
        withoutClose={true}
      />
    </>
  );
};
