import { animate, useMotionValue } from "framer-motion";
import { interpolate } from "flubber";
import React from "react";

export const useSVGMorph = (d, config) => {
  const value = useMotionValue(d);

  React.useEffect(() => {
    const interpolator = interpolate(value.get(), d);

    animate(0, 1, {
      ...config,
      onUpdate: (progress) => {
        value.set(interpolator(progress));
      }
    });
  }, [config, d, value]);

  return value;
};
