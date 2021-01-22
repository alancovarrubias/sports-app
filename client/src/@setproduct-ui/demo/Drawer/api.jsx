import React from "react";
import { Overview } from "../OverviewComponent";
import { OverviewTemplate } from "../OverviewText";

export const API = props => {
  const { name, position, isOpen } = props;

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
          This prop set the shape of the component. Only <b>default</b> state
          yet.
        </>
      )
    },
    {
      prop: "view",
      type: (
        <>
          tring = <i>smooth</i>
        </>
      ),
      desc: (
        <>
          This prop set the view of the component. Only default state yet:{" "}
          <b>smooth</b>.
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
          This prop set the color of the component. Only <b>default</b> state
          yet.
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
      prop: "position",
      type: (
        <>
          string = <i>right</i>
        </>
      ),
      desc: (
        <>
          Position of a drawer. All angled positions will be casted into pure
          positions. Possible states are <b>top | bottom | left | right</b>.
        </>
      )
    },
    {
      prop: "size",
      type: <>number | string = "50%"</>,
      desc: (
        <>
          CSS size of the drawer. This sets width. For example,{" "}
          <b>size = '360px'</b>
        </>
      )
    },
    {
      prop: "title",
      type: <>string</>,
      desc: (
        <>
          Title of the dialog. If provided, an element with DIALOG_HEADER will
          be rendered inside the dialog before any children elements.
        </>
      )
    },
    {
      prop: "icon",
      type: "string | element",
      desc: (
        <>
          Name of a Blueprint UI icon (or an icon element) to render in the
          drawer's header. Note that the header will only be rendered if title
          is provided.For example, <b>"tick"</b> or{" "}
          <b>{`<Icon icon="tick" iconSize={24} />`}</b>
        </>
      )
    },
    {
      prop: "onClose",
      type: <>event</>,
      desc: (
        <>
          A callback that is invoked when user interaction causes the overlay to
          close, such as clicking on the overlay or pressing the esc key (if
          enabled).
        </>
      )
    },
    {
      prop: "hasBackdrop",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: (
        <>
          Whether a container-spanning backdrop element should be rendered
          behind the contents. The default state is <b>true</b>
        </>
      )
    },
    {
      prop: "isCloseButtonShown",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: (
        <>
          Whether to show the close button in the dialog's header. Note that the
          header will only be rendered if title is provided. The default state
          is <b>true</b>
        </>
      )
    },
    {
      prop: "transitionDuration",
      type: <>number = 300</>,
      desc: (
        <>
          Indicates how long (in milliseconds) the overlay's enter/leave
          transition takes. This is used by React CSSTransition to know when a
          transition completes and must match the duration of the animation in
          CSS. Only set this prop if you override default transitions with new
          transitions of a different length.
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
          Whether the overlay should be wrapped in a Portal, which renders its
          contents in a new element attached to portalContainer prop. This prop
          essentially determines which element is covered by the backdrop: if
          false, then only its parent is covered; otherwise, the entire page is
          covered (because the parent of the Portal is the <b>body</b> itself).
          Set this prop to false on nested overlays (such as Dialog or Popover)
          to ensure that they are rendered above their parents.
        </>
      )
    }
  ];

  /** Code source */
  const Code = `  
  < Drawer
      <i>onClose</i> = { () => setOpen(!isOpen) }
      <i>isOpen</i> = { ${isOpen} }
      <i>size</i> = '50%'
      <i>position</i> = '${position}'
  >
      Children
  < / Drawer >
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
