import * as React from "react";
import {
    BorderPath,
    SyringeColor,
    SyringeTop,
    BlueFillPath,
    MovingPath,
    LoadingMovingPath,
    TSpan,
    FlagContainer
} from "./syringe.style";
import { CONTINENT_COLOR_MAP } from "@projects/colorMappers";
import { SVGText } from "../styled";

const colors = Object.values(CONTINENT_COLOR_MAP);
export const LoadingSyringe = () => {
    const [percentage, setPercentage] = React.useState(1)
    const [colorIndex, setColorIndex] = React.useState(() => Math.floor(Math.random() * colors.length));
    React.useEffect(() => {
        const interval = setInterval(() => {
            setPercentage(percentage => {
                if (percentage > 0) {
                    return percentage - 0.1;
                } else {
                    setColorIndex(colorIndex => colorIndex + 1 >= colors.length ? 0 : colorIndex + 1);
                    return 1;
                }
            })
        }, 200)
        return () => clearInterval(interval)
    }, [])
    const getPath = React.useCallback((value) => {
        let calculatedLength = value * 1000;
        if (calculatedLength < 0) calculatedLength = 0;
        return `M1035.7 20.24h-${calculatedLength}v60h${calculatedLength}v-60z`;
    });
    const index = 0
    return (
        <g
            style={{
                transform: `translateY(${index * 90}px)`,
                backfaceVisibility: "hidden",
                transition: "all 0.2s linear"
            }}>
            <clipPath id={`clipBar${index}`}>
                <MovingPath d={getPath(percentage)} />
            </clipPath>
            <SyringeColor transform="rotate(90 536 50)" color="#dce4fc" d="M506.2-449.91h60v999h-60z" />
            <BorderPath d="M1235.7 50.24H35.7" />
            <BlueFillPath d="M4.25 46.24h1050v8h-1050z"/>
            <LoadingMovingPath d={getPath(percentage)} color={colors[colorIndex]}/>
            <BorderPath d="M37 10.24h4v80h-4zM1 25.24h4v50H1z" />
            <SyringeTop d="M1036.04 32.98h10V67.5h-10zM1046.54 45.94h7v12.55h-7z" />
            <BlueFillPath
                clipPath={`url(#clipBar0)`}
                color="#4f3a5c"
                d="M1025.5 19.59h2v17.42h-2zM1015.5 19.59h2V30.5h-2zM1005.5 19.59h2v17.42h-2zM995.5 19.59h2V30.5h-2zM985.5 19.59h2v17.42h-2zM975.5 19.59h2V30.5h-2zM965.5 19.59h2v17.42h-2zM955.5 19.59h2V30.5h-2zM945.5 19.59h2v17.42h-2zM935.5 19.59h2V30.5h-2zM925.5 19.59h2v17.42h-2zM915.5 19.59h2V30.5h-2zM905.5 19.59h2v17.42h-2zM895.5 19.59h2V30.5h-2zM885.5 19.59h2v17.42h-2zM875.5 19.59h2V30.5h-2zM865.5 19.59h2v17.42h-2zM855.5 19.59h2V30.5h-2zM845.5 19.59h2v17.42h-2zM835.5 19.59h2V30.5h-2zM825.5 19.59h2v17.42h-2zM815.5 19.59h2V30.5h-2zM805.5 19.59h2v17.42h-2zM795.5 19.59h2V30.5h-2zM785.5 19.59h2v17.42h-2zM775.5 19.59h2V30.5h-2zM765.5 19.59h2v17.42h-2zM755.5 19.59h2V30.5h-2zM745.5 19.59h2v17.42h-2zM735.5 19.59h2V30.5h-2zM725.5 19.59h2v17.42h-2zM715.5 19.59h2V30.5h-2zM705.5 19.59h2v17.42h-2zM695.5 19.59h2V30.5h-2zM685.5 19.59h2v17.42h-2zM675.5 19.59h2V30.5h-2zM665.5 19.59h2v17.42h-2zM655.5 19.59h2V30.5h-2zM645.5 19.59h2v17.42h-2zM635.5 19.59h2V30.5h-2zM625.5 19.59h2v17.42h-2zM615.5 19.59h2V30.5h-2zM605.5 19.59h2v17.42h-2zM595.5 19.59h2V30.5h-2zM585.5 19.59h2v17.42h-2zM575.5 19.59h2V30.5h-2zM565.5 19.59h2v17.42h-2zM555.5 19.59h2V30.5h-2zM545.5 19.59h2v17.42h-2zM535.5 19.59h2V30.5h-2zM525.5 19.59h2v17.42h-2zM515.5 19.59h2V30.5h-2zM505.5 19.59h2v17.42h-2zM495.5 19.59h2V30.5h-2zM485.5 19.59h2v17.42h-2zM475.5 19.59h2V30.5h-2zM465.5 19.59h2v17.42h-2zM455.5 19.59h2V30.5h-2zM445.5 19.59h2v17.42h-2zM435.5 19.59h2V30.5h-2zM425.5 19.59h2v17.42h-2zM415.5 19.59h2V30.5h-2zM405.5 19.59h2v17.42h-2zM395.5 19.59h2V30.5h-2zM385.5 19.59h2v17.42h-2zM375.5 19.59h2V30.5h-2zM365.5 19.59h2v17.42h-2zM355.5 19.59h2V30.5h-2zM345.5 19.59h2v17.42h-2zM335.5 19.59h2V30.5h-2zM325.5 19.59h2v17.42h-2zM315.5 19.59h2V30.5h-2zM305.5 19.59h2v17.42h-2zM295.5 19.59h2V30.5h-2zM285.5 19.59h2v17.42h-2zM275.5 19.59h2V30.5h-2zM265.5 19.59h2v17.42h-2zM255.5 19.59h2V30.5h-2zM245.5 19.59h2v17.42h-2zM235.5 19.59h2V30.5h-2zM225.5 19.59h2v17.42h-2zM215.5 19.59h2V30.5h-2zM205.5 19.59h2v17.42h-2zM195.5 19.59h2V30.5h-2zM185.5 19.59h2v17.42h-2zM175.5 19.59h2V30.5h-2zM165.5 19.59h2v17.42h-2zM155.5 19.59h2V30.5h-2zM145.5 19.59h2v17.42h-2zM135.5 19.59h2V30.5h-2zM125.5 19.59h2v17.42h-2zM115.5 19.59h2V30.5h-2zM105.5 19.59h2v17.42h-2zM95.5 19.59h2V30.5h-2zM85.5 19.59h2v17.42h-2zM75.5 19.59h2V30.5h-2zM65.5 19.59h2v17.42h-2z"
            />
            <SVGText className="cls-7" transform="translate(1096 37.22)">
                Loading <TSpan>...</TSpan>
            </SVGText>
            <g transform="translate(1076 30)">
                <FlagContainer cx="0" cy="0" r="13" />
                <image
                    href={`https://hatscripts.github.io/circle-flags/flags/xx.svg`}
                    preserveAspectRatio="none"
                    width="24"
                    height="24"
                    x="-12"
                    y="-12"
                />
            </g>
        </g>
    )
}
