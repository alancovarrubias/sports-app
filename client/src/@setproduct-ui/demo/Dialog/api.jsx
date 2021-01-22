import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, type, view, color, isOpen, opacity } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "type",
      type: (
        <>
          string = <i>default</i>
        </>
      ),
      desc: (
        <>
          This prop set the shape of the component. Possible states:
          <b> default | dense</b>. The default state is <b>default</b>.
        </>
      )
    },
    {
      prop: "view",
      type: (
        <>
          tring = <i>filled</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:
          <b> filled | smooth | raised </b>. The default state is
          <b>filled</b>.
        </>
      )
    },
    {
      prop: "color",
      type: (
        <>
          string = <i>default</i>
        </>
      ),
      desc: (
        <>
          This prop set the color of the component. Possible states:
          <b>
            default | primary | warning | danger | success | primary_alt |
            warning_alt | danger_alt | success_alt
          </b>
          . The default state is <b>default</b>.
        </>
      )
    },
    {
      prop: "className",
      type: "string",
      desc:
        "A space-delimited list of class names to pass along to a child element."
    },
    {
      prop: "icon",
      type: "string ",
      desc: (
        <>
          Name of a icon to render in the dialog's header. Note that the header
          will only be rendered if title is provided. For example,
          <b>"tick"</b>
        </>
      )
    },
    {
      prop: "title",
      type: "string",
      desc: <>A title of the dialog.</>
    },
    {
      prop: "text",
      type: "string",
      desc: <>Action text. Haven't default state.</>
    },
    {
      prop: "backdropOpacity",
      type: "number = 20",
      desc: (
        <>
          Opacity of backdrop. From 0 to 100 with step 10. The default state is{" "}
          <b>20</b>.
        </>
      )
    },
    {
      prop: "leftButton",
      type: "element",
      desc: <>A Left button of a dialog.</>
    },
    {
      prop: "rightButton",
      type: "element",
      desc: <>A Right button of a dialog.</>
    },
    {
      prop: "isOpen",
      type: <>boolean</>,
      desc: (
        <>
          Toggles the visibility of the overlay and its children. This prop is
          required because the component is controlled.
        </>
      )
    },
    {
      prop: "onClose",
      type: "func",
      desc: (
        <>
          A callback that is invoked when user interaction causes the overlay to
          close, such as clicking on the overlay or pressing the esc key.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Button
      view="filled"
      color="primary"
      text="Open Dialog"
      onClick={ () => setOpen(true) }
  / >
    < Dialog
      type={ ${type} }
      view={ ${view} }
      color={ ${color} }
      icon="info-sign"
      title="This is dialog"
      text={ text }
      backdropOpacity={ ${opacity} }
      leftButton={
        < Button
          type="default"
          view="${
            view === "filled"
              ? "filled"
              : view === "raised"
              ? "flat"
              : "outlined"
          }"
          color="${color}"
          dense={ ${type === "dense" ? true : false} }
          onClick={ () => setOpen(false) }
          text="Maybe next time"
        / >
      }
      rightButton={
        < Button
          type="default"
          view="${
            view === "filled"
              ? "raised"
              : view === "raised"
              ? "smooth"
              : "filled"
          }"
          color="${color}"
          dense={ ${type === "dense" ? true : false} }
          onClick={ () => setOpen(false) }
          text="Sure, continue!"
        / >
      }
      isOpen={ ${isOpen} }
      onClose={ () => setOpen(false) }
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
