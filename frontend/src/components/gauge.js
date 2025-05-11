import React, { useEffect, useState } from "react";
import { GaugeComponent } from "react-gauge-component";

const GaugeWrapper = ({ risk_score, width = 260, height = 210 }) => {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setColors([
      root.getPropertyValue("--green").trim(),
      root.getPropertyValue("--light-green").trim(),
      root.getPropertyValue("--yellow").trim(),
      root.getPropertyValue("--orange").trim(),
      root.getPropertyValue("--red").trim()
    ]);
  }, []);

  if (!colors) return null;

  return (
    <GaugeComponent
      value={risk_score}
      style={{ width: `${width}px`, height: `${height}px` }}
      type="radial"
      arc={{
        colorArray: colors,
        subArcs: [
          { limit: 20 },
          { limit: 40 },
          { limit: 60 },
          { limit: 80 },
          { limit: 100 }
        ],
        padding: 0.02,
        width: 0.3
      }}
      pointer={{
        elastic: true,
        animationDelay: 0.5
      }}
    />
  );
};

export default GaugeWrapper;
