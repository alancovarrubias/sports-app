import React from "react";

/**Import core component (variable)*/
import Chips from "../../core/Chips";

import Ava1 from "../assets/userpic1.svg";
import Ava2 from "../assets/userpic7.svg";

export const DEMO = props => {
  const {
    type,
    view,
    color,
    remove,
    isAva,
    dis,
    isSelect,
    isIcon,
    isRIcon,
    isRemovable,
    setRemove,
    isNumber,
    isRound
  } = props;
  return (
    <>
      <Chips
        style={
          remove.a === "Locate"
            ? {
                margin: "4px",
                verticalAlign: "bottom",
                visibility: "hidden",
                opacity: 0,
                transition: "all 0.2s ease-in"
              }
            : { margin: "4px", verticalAlign: "bottom" }
        }
        type={type}
        view={view}
        color={color}
        tag={isAva ? "Mike Milner" : "Locate"}
        withTick={isSelect}
        icon={isIcon ? "locate" : null}
        rightIcon={isRIcon ? "import" : null}
        removable={isRemovable}
        onRemove={
          isRemovable ? () => setRemove({ ...remove, a: "Locate" }) : () => ({})
        }
        disabled={dis} //true/false
        round={isRound} //true/false
        withNumber={isNumber ? "123" : null} // number
        withAvatar={isAva ? Ava1 : null} //avatar
      />

      <Chips
        style={
          remove.b === "Nearby"
            ? {
                margin: "4px",
                verticalAlign: "bottom",
                visibility: "hidden",
                opacity: 0,
                transition: "all 0.2s ease-in"
              }
            : { margin: "4px", verticalAlign: "bottom" }
        }
        type={type}
        view={view}
        color={color}
        tag={isAva ? "Pretty Girl" : "Nearby"}
        withTick={isSelect}
        icon={isIcon ? "map-marker" : null}
        rightIcon={isRIcon ? "export" : null}
        removable={isRemovable}
        onRemove={
          isRemovable ? () => setRemove({ ...remove, b: "Nearby" }) : null
        }
        disabled={dis}
        round={isRound} //true/false
        withNumber={isNumber ? "69" : null} // number
        withAvatar={isAva ? Ava2 : null} //avatar
      />
    </>
  );
};
