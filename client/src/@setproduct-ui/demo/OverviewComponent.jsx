import React from "react";
import { Icon, Tab } from "@blueprintjs/core";
import Tabs from "../core/Tabs/Segmented";
import Button from "../core/Button";
import Toaster from "../core/Toast/Toaster.jsx";
import OverviewAPI from "./OverviewAPI.jsx";

export const Overview = props => {
  const { overview, apidata, code } = props;

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
    document.execCommand("copy") && toastRef.show(SuccessToast);
    textField.remove();
  };

  /**Tabs data */
  const data = [
    {
      id: 1,
      // icon: "info-sign",
      title: (
        <>
          <Icon icon="info-sign" style={{ marginRight: "0.25rem" }} />
          Overview
        </>
      ),
      panel: overview,
      visible: true
    },
    {
      id: 2,
      //  icon: "cog",
      title: (
        <>
          <Icon icon="cog" style={{ marginRight: "0.25rem" }} />
          API
        </>
      ),
      panel: <OverviewAPI data={apidata} />,
      visible: true
    },
    {
      id: 3,
      // icon: "code",
      title: (
        <>
          <Icon icon="code" style={{ marginRight: "0.25rem" }} />
          Code
        </>
      ),
      panel: (
        <div className="source-code-block">
          <Button
            dense={true}
            view="filled"
            color="primary"
            icon="duplicate"
            style={{
              position: "relative",
              left: "calc( 100% - 50px)",
              top: "10px"
            }}
            onClick={() => copyToClipboard(code)}
          />
          <Toaster
            view="outlined"
            color="success"
            usePortal={false}
            position="bottom" //bottom, bottom-left, bottom-right
            setRef={setRef}
            withoutClose={true}
          />
          <pre
            dangerouslySetInnerHTML={{
              __html: code
            }}
          />
        </div>
      ),
      visible: true
    }
  ];

  return (
    <div style={{ paddingLeft: "0.25rem" }}>
      <Tabs type="dense" view="outlined" id="Button" fill={true}>
        {data.map(
          (i, count) =>
            i.visible && (
              <Tab
                key={count}
                id={i.id}
                title={
                  <>
                    {<Icon icon={i.icon} />}
                    {i.title}
                  </>
                }
                panel={i.panel}
              />
            )
        )}
      </Tabs>
    </div>
  );
};
