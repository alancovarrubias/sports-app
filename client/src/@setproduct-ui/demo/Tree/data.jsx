import React from "react";
//import Tooltip from "../../core/Tooltip";
import { Icon } from "@blueprintjs/core";

const Data = [
  {
    id: 0,
    hasCaret: true,
    isExpanded: false,
    label: "Folder 0",
    
    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item 0"
      },
      {
        id: 3,
        icon: "tag",
        label: "Item 1"
      }
    ]
  },
  {
    id: 1,
    hasCaret: true,
    isExpanded: true,
    label:
      /*  <Tooltip
        content="I'm a folder <3"
        mdc_style={["def", "smooth", "danger"]}
      >*/
      "Folder (Level 1)",
    /* </Tooltip>*/

    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item with second icon",
        secondaryLabel: (
          /*   <Tooltip
            content="An eye!"
            position="right"
            mdc_style={["def", "smooth", "danger"]}
          >*/
          <Icon icon="eye-open" />
          /* </Tooltip>*/
        )
      },
      {
        id: 3,
        icon: "tag",
        isSelected: true,
        label: "Just an item"
      },
      {
        id: 4,
        hasCaret: true,
        isExpanded: true,
        label: "Folder (Level 2)",
        childNodes: [
          { id: 5, label: "No-Icon Item" },

          {
            id: 6,
            hasCaret: true,
            label: "Folder Disabled",
            disabled: true,
            isExpanded: true,
            childNodes: [
              {
                id: 7,
                icon: "disable",
                disabled: true,
                label: "Item Disabled"
              }
            ]
          },
          {
            id: 8,
            hasCaret: true,
            isExpanded: true,
            label: (
              <div with-secondary-label="true">
                Folder With Label<div>secondary label</div>
              </div>
            ),
            childNodes: [
              { id: 9, icon: "document", label: "Item 0" },
              { id: 10, icon: "tag", label: "Item 1" },
              {
                id: 11,
                icon: "disable",
                disabled: true,
                label: (
                  <div with-secondary-label="true">
                    Item Disabled
                    <div>
                      Items out of stock <Icon icon="thumbs-down" />
                    </div>
                  </div>
                )
              }
            ]
          }
        ]
      }
    ]
  }
];

export default Data;
