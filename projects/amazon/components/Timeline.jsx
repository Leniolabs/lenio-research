import * as React from "react";

export const Timeline = ({ currentYear, onPlay, onPause, playing }) => {
  const handlePlay = React.useCallback(() => {
    if (!playing) onPlay?.();
    else onPause?.();
  }, [playing, onPlay, onPause]);

  return (
    <div className="counter">
      <p className="year">{currentYear}</p>
      <p className="km">123,40km</p>
      <div className="player">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 732 90">
          <rect
            x="20"
            y="1.5"
            width="710"
            height="88"
            rx="2"
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            stroke-width="1"
          />
          <path fill="#2152bf" d="M93.6 32.8h600v5h-600z" />
          <text transform="translate(73.7 68.8)" font-size="20" fill="#fff">
            2001
          </text>
          <text transform="translate(367.1 68.8)" font-size="20" fill="#fff">
            2020
          </text>
          <text transform="translate(673.7 68.8)" font-size="20" fill="#fff">
            2040
          </text>
          <path
            fill="none"
            stroke="#120d2d"
            stroke-miterlimit="10"
            stroke-width=".8"
            d="M93.6 32.8v18M109 32.8v11.5M124.4 32.8v11.5M139.8 32.8v11.5M201.3 32.8v11.5M216.7 32.8v11.5M232.1 32.8v18M247.4 32.8v11.5M155.1 32.8v11.5M170.5 32.8v11.5M185.9 32.8v11.5M262.8 32.8v11.5M293.6 32.8v11.5M324.4 32.8v11.5M355.1 32.8v11.5M370.5 32.8v11.5M339.8 32.8v11.5M309 32.8v11.5M278.2 32.8v11.5M385.9 32.8v18M401.3 32.8v11.5M416.7 32.8v11.5M432.1 32.8v11.5M493.6 32.8v11.5M509 32.8v11.5M524.4 32.8v11.5M539.8 32.8v18M447.4 32.8v11.5M462.8 32.8v11.5M478.2 32.8v11.5M555.1 32.8v11.5M585.9 32.8v11.5M616.7 32.8v11.5M647.4 32.8v11.5M662.8 32.8v11.5M632.1 32.8v11.5M601.3 32.8v11.5M570.5 32.8v11.5M678.2 32.8v11.5M693.6 32.8v18"
          />

          <g onClick={handlePlay} style={{ cursor: "pointer" }}>
            <circle cx="35" cy="45" r="34.5" fill="#0a051b" stroke="#fff" stroke-miterlimit="10" />
            <path
              d="M26.6 33.5v23a2 2 0 0 0 3 1.8l18.8-11.1a2 2 0 0 0 0-3.5L29.7 32a2 2 0 0 0-3 1.6Z"
              fill="#fff"
            />
          </g>

          <text transform="translate(143.2 66.7)" font-size="12" fill="#fff">
            2005
          </text>
          <text transform="translate(220.1 66.7)" font-size="12" fill="#fff">
            2010
          </text>
          <text transform="translate(297 66.7)" font-size="12" fill="#fff">
            2015
          </text>
          <text transform="translate(450.9 66.7)" font-size="12" fill="#fff">
            2025
          </text>
          <text transform="translate(527.8 66.7)" font-size="12" fill="#fff">
            2030
          </text>
          <text transform="translate(604.7 66.7)" font-size="12" fill="#fff">
            2035
          </text>

          <rect
            transform={`translate(${(currentYear - 2001) * 15.4}, 0)`}
            x="92.1"
            y="22.5"
            width="3"
            height="25.6"
            rx="1.5"
            fill="#fff"
          />
        </svg>
      </div>
    </div>
  );
};
