import React from "react";
import { Overview } from "../../OverviewComponent";
import { OverviewTemplate } from "../../OverviewText";

export const API = props => {
  const { name, view, color, shortcuts, single } = props;

  /**Overview */
  const OverviewText = <OverviewTemplate name={name} />;

  /**API */
  const APIData = [
    {
      prop: "view",
      type: (
        <>
          string = <i>flat</i>
        </>
      ),
      desc: (
        <>
          This prop set view of the component. Possible states:{" "}
          <b> flat | smooth | raised </b>.
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
          This prop set color of the component. Possible states:{" "}
          <b>
            default | primary | warning | danger | success | primary_alt |
            warning_alt | danger_alt | success_alt{" "}
          </b>
          . Default state is <b>default</b>.
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
      prop: "allowSingleDayRange",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: (
        <>
          Whether the start and end dates of the range can be the same day. If
          true, clicking a selected date will create a one-day range. If false,
          clicking a selected date will clear the selection.
        </>
      )
    },
    {
      prop: "shortcuts",
      type: (
        <>
          boolean = <i>true</i>
        </>
      ),
      desc: (
        <>
          Whether shortcuts to quickly select a range of dates are displayed or
          not. If true, preset shortcuts will be displayed. If false, no
          shortcuts will be displayed. If an array is provided, the custom
          shortcuts will be displayed.
        </>
      )
    },

    {
      prop: "singleMonthOnly",
      type: (
        <>
          boolean = <i>false</i>
        </>
      ),
      desc: <>Whether to show only a single month calendar.</>
    }
  ];

  /** Code source */
  const Code = `  
  < DateRangePicker
    <i>view</i> = '${view}' 
    <i>color</i> = '${color}' 
    <i>allowSingleDayRange</i> = { true }
    <i>shortcuts</i> = { ${shortcuts ? "true" : "false"} }
    <i>singleMonthOnly</i> = { ${single ? "true" : "false"} }
  />
 `;

  return <Overview overview={OverviewText} apidata={APIData} code={Code} />;
};
