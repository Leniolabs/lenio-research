import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SVGText } from "./styled";

const BorderPath = styled.path`
  fill: #5a60ab;
  stroke: #5a60ab;
  stroke-width: 2;
`;

const SyringeColor = styled(BorderPath)`
  fill: ${(props) => props.color};
`;

const SyringeTop = styled(BorderPath)`
  fill: #fff;
`;

const BlueFillPath = styled.path`
  fill: #5a60ab;
`;

const MovingPath = styled.path`
  fill: #dce4fc;
  stroke: #5a60ab;
  stroke-width: 2;
  transition: all linear 0.4s;
`;

const TSpan = styled.tspan`
  fill: #5a60ab;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ImagePattern = styled.pattern``;
const PatternRect = styled.rect`
  fill: #dce4fc;
`;

const FlagContainer = styled.path`
  stroke: #5a60ab;
  stroke-width: 10;
`;

export const Syringe = ({
  percentage,
  length = 1000,
  country,
  countryCode,
  population,
  index = 0,
  color = "#dce4fc"
}) => {
  const getPath = React.useCallback((value) => {
    let calculatedLength = value * length;
    if (calculatedLength < 0) calculatedLength = 0;
    return `M1035.7 20.24h-${calculatedLength}v60h${calculatedLength}v-60z`;
  });

  return (
    <>
      <g transform={`translate(0, ${index * 90})`}>
        <defs>
          <ImagePattern
            id={`flag${countryCode}`}
            preserveAspectRatio="none"
            patternUnits="userSpaceOnUse"
            width="500"
            height="500">
            <PatternRect x="0" y="0" width="500" height="500" />
            <image
              href={`https://www.countryflags.io/${countryCode}/flat/64.png`}
              x="0"
              y="100"
              preserveAspectRatio="none"
              width="500"
              height="500"
            />
          </ImagePattern>
        </defs>
        <clipPath id={`clipBar${index}`}>
          <MovingPath d={getPath(percentage)} />
        </clipPath>
        <SyringeColor transform="rotate(90 536 50)" color={color} d="M506.2-449.91h60v999h-60z" />
        <BorderPath d="M1235.7 50.24H35.7" />
        <BlueFillPath d="M4.25 46.24h1050v8h-1050z" />
        <MovingPath d={getPath(percentage)} />
        <BorderPath d="M37 10.24h4v80h-4zM1 25.24h4v50H1z" />
        <SyringeTop d="M1036.04 32.98h10V67.5h-10zM1046.54 45.94h7v12.55h-7z" />
        <BlueFillPath
          clipPath={`url(#clipBar${index})`}
          d="M1025.5 19.59h2v17.42h-2zM1015.5 19.59h2V30.5h-2zM1005.5 19.59h2v17.42h-2zM995.5 19.59h2V30.5h-2zM985.5 19.59h2v17.42h-2zM975.5 19.59h2V30.5h-2zM965.5 19.59h2v17.42h-2zM955.5 19.59h2V30.5h-2zM945.5 19.59h2v17.42h-2zM935.5 19.59h2V30.5h-2zM925.5 19.59h2v17.42h-2zM915.5 19.59h2V30.5h-2zM905.5 19.59h2v17.42h-2zM895.5 19.59h2V30.5h-2zM885.5 19.59h2v17.42h-2zM875.5 19.59h2V30.5h-2zM865.5 19.59h2v17.42h-2zM855.5 19.59h2V30.5h-2zM845.5 19.59h2v17.42h-2zM835.5 19.59h2V30.5h-2zM825.5 19.59h2v17.42h-2zM815.5 19.59h2V30.5h-2zM805.5 19.59h2v17.42h-2zM795.5 19.59h2V30.5h-2zM785.5 19.59h2v17.42h-2zM775.5 19.59h2V30.5h-2zM765.5 19.59h2v17.42h-2zM755.5 19.59h2V30.5h-2zM745.5 19.59h2v17.42h-2zM735.5 19.59h2V30.5h-2zM725.5 19.59h2v17.42h-2zM715.5 19.59h2V30.5h-2zM705.5 19.59h2v17.42h-2zM695.5 19.59h2V30.5h-2zM685.5 19.59h2v17.42h-2zM675.5 19.59h2V30.5h-2zM665.5 19.59h2v17.42h-2zM655.5 19.59h2V30.5h-2zM645.5 19.59h2v17.42h-2zM635.5 19.59h2V30.5h-2zM625.5 19.59h2v17.42h-2zM615.5 19.59h2V30.5h-2zM605.5 19.59h2v17.42h-2zM595.5 19.59h2V30.5h-2zM585.5 19.59h2v17.42h-2zM575.5 19.59h2V30.5h-2zM565.5 19.59h2v17.42h-2zM555.5 19.59h2V30.5h-2zM545.5 19.59h2v17.42h-2zM535.5 19.59h2V30.5h-2zM525.5 19.59h2v17.42h-2zM515.5 19.59h2V30.5h-2zM505.5 19.59h2v17.42h-2zM495.5 19.59h2V30.5h-2zM485.5 19.59h2v17.42h-2zM475.5 19.59h2V30.5h-2zM465.5 19.59h2v17.42h-2zM455.5 19.59h2V30.5h-2zM445.5 19.59h2v17.42h-2zM435.5 19.59h2V30.5h-2zM425.5 19.59h2v17.42h-2zM415.5 19.59h2V30.5h-2zM405.5 19.59h2v17.42h-2zM395.5 19.59h2V30.5h-2zM385.5 19.59h2v17.42h-2zM375.5 19.59h2V30.5h-2zM365.5 19.59h2v17.42h-2zM355.5 19.59h2V30.5h-2zM345.5 19.59h2v17.42h-2zM335.5 19.59h2V30.5h-2zM325.5 19.59h2v17.42h-2zM315.5 19.59h2V30.5h-2zM305.5 19.59h2v17.42h-2zM295.5 19.59h2V30.5h-2zM285.5 19.59h2v17.42h-2zM275.5 19.59h2V30.5h-2zM265.5 19.59h2v17.42h-2zM255.5 19.59h2V30.5h-2zM245.5 19.59h2v17.42h-2zM235.5 19.59h2V30.5h-2zM225.5 19.59h2v17.42h-2zM215.5 19.59h2V30.5h-2zM205.5 19.59h2v17.42h-2zM195.5 19.59h2V30.5h-2zM185.5 19.59h2v17.42h-2zM175.5 19.59h2V30.5h-2zM165.5 19.59h2v17.42h-2zM155.5 19.59h2V30.5h-2zM145.5 19.59h2v17.42h-2zM135.5 19.59h2V30.5h-2zM125.5 19.59h2v17.42h-2zM115.5 19.59h2V30.5h-2zM105.5 19.59h2v17.42h-2zM95.5 19.59h2V30.5h-2zM85.5 19.59h2v17.42h-2zM75.5 19.59h2V30.5h-2zM65.5 19.59h2v17.42h-2z"
        />
        <SVGText className="cls-7" transform="translate(1084.62 37.22)">
          {country} <TSpan> [{population}M]</TSpan>
        </SVGText>
        <SVGText transform="translate(940 60)" className="cls-7">
          {((1 - percentage) * 100).toFixed(2)}%
        </SVGText>

        <FlagContainer
          transform={`translate(1222, 50) scale(.05)`}
          fill={`url(#flag${countryCode})`}
          d="M316.099,85.846c-24.586-35.32-45.821-65.827-50.974-80.433c-1.139-3.215-4.145-5.372-7.554-5.414
			c-3.15,0.096-6.476,2.044-7.68,5.227c-5.244,13.812-25.405,42.765-48.752,76.314C147.671,158.326,74.447,263.494,74.447,331.917
			c0,100.926,82.103,183.034,183.029,183.034s183.029-82.108,183.029-183.034C440.505,264.6,368.599,161.285,316.099,85.846z"
        />
      </g>
    </>
  );
};

Syringe.propTypes = {
  percentage: PropTypes.number,
  length: PropTypes.number,
  country: PropTypes.string,
  countryCode: PropTypes.string,
  population: PropTypes.string,
  index: PropTypes.number,
  color: PropTypes.string
};
