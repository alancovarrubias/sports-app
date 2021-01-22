import { createContext } from "react";

export const SidebarStateContext = createContext(
  { left: false, right: false } // default state
);
