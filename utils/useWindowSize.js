import React from "react";

export const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
