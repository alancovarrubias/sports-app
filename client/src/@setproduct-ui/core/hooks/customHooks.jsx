import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return width;
};

export const useDevice = () => {
  let width = useWindowWidth();
  let device = setDevice(width);

  function setDevice(width) {
    switch (true) {
      case width < 640:
        return "mobile";

      case width <= 1024:
        return "tablet";

      case width > 1024:
        return "desktop";

      case width > 1440:
        return "widescreen";

      default:
        return "desktop";
    }
  }
  return device;
};

export const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  });
};
