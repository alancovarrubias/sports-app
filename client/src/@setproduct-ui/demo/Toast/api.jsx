import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";
import OverviewAPI from "../OverviewAPI.jsx";

export const API = props => {
  const { name, isClose, view, color } = props;

  const ToastNodeApi = [
    {
      prop: "message",
      type: <>string</>,
      desc: <>Message to display in the body of the toast. Required.</>
    },
    {
      prop: "icon",
      type: <>string | element</>,
      desc: (
        <>
          Name of a Blueprint UI icon (or an icon element) to render before the
          message.
        </>
      )
    },
    {
      prop: "action",
      type: <>element</>,
      desc: (
        <>
          Action rendered as a Button. The toast is dismissed automatically when
          the user clicks the action button. Omit this prop to omit the action
          button. Options: <b> href target text </b>. For example,{" "}
          {
            " { href: 'https://gum.co/figma2react', target: '_blank', text: <strong>Yum.</strong> }"
          }
          .
        </>
      )
    },
    {
      prop: "timeout",
      type: (
        <>
          number = <i>5000</i>
        </>
      ),
      desc: (
        <>
          Milliseconds to wait before automatically dismissing toast. Providing
          a value less than or equal to 0 will disable the timeout (this is
          discouraged).
        </>
      )
    },
    {
      prop: "onDismiss",
      type: <>func</>,
      desc: (
        <>
          Callback invoked when the toast is dismissed, either by the user or by
          the timeout. The value of the argument indicates whether the toast was
          closed because the timeout expired.
        </>
      )
    }
  ];

  const optionalText = (
    <>
      Way to use the <b>Toaster</b> component is{" "}
      <b>{"<Toaster ref={ref => ref.show({ ...toast })}/> "}</b>
      <br />
      Render a <b>Toaster</b> element and use the ref prop to access its
      instance methods.Working with multiple toasters.
      <br />
      <b>Toast</b> is an array and has his own API.
      <br />
      <b>Toast API description:</b>
      <OverviewAPI data={ToastNodeApi} />
    </>
  );

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} text={optionalText} />;

  /**API */
  const APIData = [
    {
      prop: "type",
      type: (
        <>
          string = <i>def</i>
        </>
      ),
      desc: (
        <>
          This prop set the shape of the component. Possible states:{" "}
          <b> def </b>. The default state is <b>def</b>.
        </>
      )
    },
    {
      prop: "view",
      type: (
        <>
          string = <i>filled</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Possible states:{" "}
          <b> filled | smooth | outlined | raised </b>. The default state is{" "}
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
          {" "}
          This prop set the color of the component. Possible states:{" "}
          <b>
            {" "}
            default | primary | warning | danger | success | primary_alt |
            warning_alt | danger_alt | success_alt{" "}
          </b>
          . The default state is <b>default</b>.
        </>
      )
    },
    {
      prop: "className",
      type: <>string</>,
      desc:
        "A space-delimited list of class names to pass along to a child element."
    },
    {
      prop: "withoutClose",
      type: <>boolean </>,
      desc: <>To show or not Close button.</>
    },
    {
      prop: "position",
      type: (
        <>
          string = <i>top</i>{" "}
        </>
      ),
      desc: (
        <>
          Position of Toaster within its container. Possible states:
          <b> top top-left top-right bottom bottom-left bottom-right </b>
        </>
      )
    },
    {
      prop: "usePortal",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: (
        <>
          Whether the toaster should be rendered into a new element attached to
          document.body. If false, then positioning will be relative to the
          parent element.
        </>
      )
    },
    {
      prop: "maxToasts",
      type: <>undefined | number = undefined</>,
      desc: (
        <>
          The maximum number of active toasts that can be displayed at once.
          When the limit is about to be exceeded, the oldest active toast is
          removed.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Button
      <i>view</i> = "filled"
      <i>color</i> = "primary"
      <i>text</i> = "Toast me"
      <i>onClick</i> = {() => myRef.show(DemoToast)}
  / >
  < Toaster
      <i>type</i> = 'def'
      <i>view</i> = '${view}'
      <i>color</i> = '${color}'
      <i>usePortal</i> = {false}
      <i>position</i> = 'top' 
      <i>ref</i> = {toastRef}
      <i>maxToasts</i> = {2}
      <i>withoutClose</i> = '${!isClose}'
  / >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
