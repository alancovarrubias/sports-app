import React from "react";
import FooterLink from "./components/FooterLink";
import DemoAppStyle from "./styles/style.module.css";
import * as LINKS from "./constants/Constants";

export default function Footer() {
  return (
    <>
      <div className={DemoAppStyle.footer_text}>
        <a
          href={LINKS.SETPRODUCT_LINK}
          style={{
            color: "var(--blue50)"
          }}
        >
          Setproduct Design System
        </a>
        &nbsp;
        <div className={DemoAppStyle.footer_break}> for Figma & React</div>
      </div>
      <div className={DemoAppStyle.footer_links}>
        <FooterLink
          href={LINKS.FIGMA_DEMO_LINK}
          value="Preview"
          icon="search-text"
        />
        <FooterLink
          href={LINKS.LICENSE_LINK}
          value="License"
          icon="manually-entered-data"
        />
        <FooterLink
          href={LINKS.BUY_LINK}
          value="Buy UI kit"
          icon="shopping-cart"
        />
      </div>
    </>
  );
}
