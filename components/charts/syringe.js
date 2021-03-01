import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BorderPath = styled.path`
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
  transition: all linear 1s;
`;

const Text = styled.text`
  fill: #5a60ab;
  font-size: 1.8rem;
`;

const TSpan = styled.tspan`
  fill: #5a60ab;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const Syringe = ({ percentage, length = 1000, country, population, index = 0, color = "#dce4fc" }) => {
  const calculatedLength = percentage * length;
  const path = `M1035.7 20.24h-${calculatedLength}v60h${calculatedLength}v-60z`;

  return (
    <>
      <g transform={`translate(0, ${200 + index * -100})`}>
        <clipPath id="clipBar">
          <MovingPath d={path} />          
        </clipPath>
        <SyringeColor
          transform="rotate(90 536.2 49.59)"
          color={color}
          d="M506.2-449.91h60v999h-60z"
        />
        <BorderPath d="M1235.7 50.24H35.7" />
        <BlueFillPath d="M4.25 46.24h1050v8h-1050z" />
        <MovingPath d={path} />
        <BorderPath d="M37 10.24h4v80h-4zM1 25.24h4v50H1z" />
        <SyringeTop d="M1036.04 32.98h10V67.5h-10zM1046.54 45.94h7v12.55h-7z" />
        <BlueFillPath clipPath="url(#clipBar)" d="M1025.5 19.59h2v17.42h-2zM1015.5 19.59h2V30.5h-2zM1005.5 19.59h2v17.42h-2zM995.5 19.59h2V30.5h-2zM985.5 19.59h2v17.42h-2zM975.5 19.59h2V30.5h-2zM965.5 19.59h2v17.42h-2zM955.5 19.59h2V30.5h-2zM945.5 19.59h2v17.42h-2zM935.5 19.59h2V30.5h-2zM925.5 19.59h2v17.42h-2zM915.5 19.59h2V30.5h-2zM905.5 19.59h2v17.42h-2zM895.5 19.59h2V30.5h-2zM885.5 19.59h2v17.42h-2zM875.5 19.59h2V30.5h-2zM865.5 19.59h2v17.42h-2zM855.5 19.59h2V30.5h-2zM845.5 19.59h2v17.42h-2zM835.5 19.59h2V30.5h-2zM825.5 19.59h2v17.42h-2zM815.5 19.59h2V30.5h-2zM805.5 19.59h2v17.42h-2zM795.5 19.59h2V30.5h-2zM785.5 19.59h2v17.42h-2zM775.5 19.59h2V30.5h-2zM765.5 19.59h2v17.42h-2zM755.5 19.59h2V30.5h-2zM745.5 19.59h2v17.42h-2zM735.5 19.59h2V30.5h-2zM725.5 19.59h2v17.42h-2zM715.5 19.59h2V30.5h-2zM705.5 19.59h2v17.42h-2zM695.5 19.59h2V30.5h-2zM685.5 19.59h2v17.42h-2zM675.5 19.59h2V30.5h-2zM665.5 19.59h2v17.42h-2zM655.5 19.59h2V30.5h-2zM645.5 19.59h2v17.42h-2zM635.5 19.59h2V30.5h-2zM625.5 19.59h2v17.42h-2zM615.5 19.59h2V30.5h-2zM605.5 19.59h2v17.42h-2zM595.5 19.59h2V30.5h-2zM585.5 19.59h2v17.42h-2zM575.5 19.59h2V30.5h-2zM565.5 19.59h2v17.42h-2zM555.5 19.59h2V30.5h-2zM545.5 19.59h2v17.42h-2zM535.5 19.59h2V30.5h-2zM525.5 19.59h2v17.42h-2zM515.5 19.59h2V30.5h-2zM505.5 19.59h2v17.42h-2zM495.5 19.59h2V30.5h-2zM485.5 19.59h2v17.42h-2zM475.5 19.59h2V30.5h-2zM465.5 19.59h2v17.42h-2zM455.5 19.59h2V30.5h-2zM445.5 19.59h2v17.42h-2zM435.5 19.59h2V30.5h-2zM425.5 19.59h2v17.42h-2zM415.5 19.59h2V30.5h-2zM405.5 19.59h2v17.42h-2zM395.5 19.59h2V30.5h-2zM385.5 19.59h2v17.42h-2zM375.5 19.59h2V30.5h-2zM365.5 19.59h2v17.42h-2zM355.5 19.59h2V30.5h-2zM345.5 19.59h2v17.42h-2zM335.5 19.59h2V30.5h-2zM325.5 19.59h2v17.42h-2zM315.5 19.59h2V30.5h-2zM305.5 19.59h2v17.42h-2zM295.5 19.59h2V30.5h-2zM285.5 19.59h2v17.42h-2zM275.5 19.59h2V30.5h-2zM265.5 19.59h2v17.42h-2zM255.5 19.59h2V30.5h-2zM245.5 19.59h2v17.42h-2zM235.5 19.59h2V30.5h-2zM225.5 19.59h2v17.42h-2zM215.5 19.59h2V30.5h-2zM205.5 19.59h2v17.42h-2zM195.5 19.59h2V30.5h-2zM185.5 19.59h2v17.42h-2zM175.5 19.59h2V30.5h-2zM165.5 19.59h2v17.42h-2zM155.5 19.59h2V30.5h-2zM145.5 19.59h2v17.42h-2zM135.5 19.59h2V30.5h-2zM125.5 19.59h2v17.42h-2zM115.5 19.59h2V30.5h-2zM105.5 19.59h2v17.42h-2zM95.5 19.59h2V30.5h-2zM85.5 19.59h2v17.42h-2zM75.5 19.59h2V30.5h-2zM65.5 19.59h2v17.42h-2z" />
        <Text className="cls-7" transform="translate(1084.62 37.22)">
          {country} <TSpan> [{population}]</TSpan>
        </Text>
      </g>
    </>
  );
};

Syringe.propTypes = {
  percentage: PropTypes.number,
  length: PropTypes.number,
  country: PropTypes.string,
  population: PropTypes.string,
  index: PropTypes.number,
  color: PropTypes.string
};
