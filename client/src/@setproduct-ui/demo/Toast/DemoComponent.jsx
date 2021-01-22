import React from "react";

/**Import core component (variable)*/
import Toaster from "../../core/Toast/Toaster.jsx";
import Button from "../../core/Button";

export const DEMO = props => {
  const { view, color, isClose, DemoToast } = props;

  /** Store ref*/
  // const [toastRef, setRef] = React.useState(null);
  const toastRef = React.useRef(DemoToast);

  return (
    <div>
      <Button
        view="filled"
        color="primary"
        text="Toast me"
        onClick={() => toastRef.current.show(DemoToast)}
      />
      <Toaster
        view={view}
        color={color}
        usePortal={false}
        position="top" //bottom, bottom-left, bottom-right
        ref={toastRef}
        maxToasts={2}
        withoutClose={!isClose}
      />
    </div>
  );
};
