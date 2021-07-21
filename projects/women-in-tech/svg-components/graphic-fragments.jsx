import PropTypes from "prop-types";
import { svgStyles } from "../women-in-tech.style";

export const DistributionContainer = ({ children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    x={0}
    y={0}
    viewBox="0 0 994.6 1078.8"
    xmlSpace="preserve"
    css={svgStyles}
    {...props}>
    <path fill="#fffefa" d="M0 0H994.6V1078.8H0z" />
    {children}
  </svg>
);
DistributionContainer.propTypes = {
  children: PropTypes.any
};

export const DistributionTitle = () => (
  <text transform="translate(230.2 58.6)" className="st7" fontSize={30}>
    Distribution of Women Bachelors by field
  </text>
);

export const DistributionMeasures = () => (
  <>
    {/* y axis marks */}
    <text transform="translate(72.8 85.3)">
      <tspan x={0} y={0} className="st7 st11">
        {"100"}
      </tspan>
      <tspan x={6.3} y={172} className="st7 st11">
        {"80"}
      </tspan>
      <tspan x={6.3} y={344} className="st7 st11">
        {"60"}
      </tspan>
      <tspan x={6.3} y={516} className="st7 st11">
        {"40"}
      </tspan>
      <tspan x={6.3} y={688} className="st7 st11">
        {"20"}
      </tspan>
    </text>

    <path className="st6" d="M99.9 425.5L110.1 425.5" />
    <path className="st6" d="M99.9 253.5L110.1 253.5" />
    <path className="st6" d="M99.9 83.5L110.1 83.5" />
    <path className="st6" d="M99.9 598.5L110.1 598.5" />
    <path className="st6" d="M99.9 772.5L110.1 772.5" />
    <path className="st6" d="M136 938.9L136 949.1" />
    <path className="st6" d="M200.7 938.9L200.7 949.1" />
    <path className="st6" d="M265.4 938.9L265.4 949.1" />
    <path className="st6" d="M330.1 938.9L330.1 949.1" />
    <path className="st6" d="M394.8 938.9L394.8 949.1" />
    <path className="st6" d="M459.5 938.9L459.5 949.1" />
    <path className="st6" d="M524.2 938.9L524.2 949.1" />
    <path className="st6" d="M588.9 938.9L588.9 949.1" />
    <path className="st6" d="M653.6 938.9L653.6 949.1" />
    <path className="st6" d="M718.3 938.9L718.3 949.1" />
    <path className="st6" d="M781.9 938.9L781.9 949.1" />
    <path className="st2" d="M99.9 253.5L101.4 253.5" />
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeDasharray="3 4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M105.4 253.5L760.6 253.5"
    />
    <path className="st2" d="M762.6 253.5L764.1 253.5" />
    <path className="st2" d="M103.9 772.5L105.4 772.5" />
    <path className="st4" d="M109.4 772.5L760.5 772.5" />
    <path className="st2" d="M762.6 772.5L764.1 772.5" />
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.5}
      d="M103.9 83.3L943.7 83.3"
    />

    {/* x axis marks */}
    <text className="st7 st14" transform="translate(125.3 963)">
      {"1970"}
    </text>
    <text className="st7 st14" transform="translate(190 963)">
      {"1975"}
    </text>
    <text className="st7 st14" transform="translate(254.6 963)">
      {"1980"}
    </text>
    <text className="st7 st14" transform="translate(319.2 963)">
      {"1985"}
    </text>
    <text className="st7 st14" transform="translate(383.8 963)">
      {"1990"}
    </text>
    <text className="st7 st14" transform="translate(448.4 963)">
      {"1995"}
    </text>
    <text className="st7 st14" transform="translate(513 963)">
      {"2000"}
    </text>
    <text className="st7 st14" transform="translate(577.7 963)">
      {"2005"}
    </text>
    <text className="st7 st14" transform="translate(642.3 963)">
      {"2010"}
    </text>
    <text className="st7 st14" transform="translate(707 963)">
      {"2015"}
    </text>
    <text className="st7 st14" transform="translate(768 963)">
      {"2020"}
    </text>

    {/* Bars */}
    <path className="st2" d="M103.9 598.5L105.4 598.5" />
    <path className="st4" d="M109.4 598.5L760.5 598.5" />
    <path className="st2" d="M762.6 598.5L764.1 598.5" />
    <path className="st2" d="M103.9 425.5L105.4 425.5" />
    <path className="st4" d="M109.4 425.5L760.5 425.5" />
    <path className="st2" d="M762.6 425.5L764.1 425.5" />
    <path className="st6" d="M105.2 84.4L105.2 954.4" />
    <path className="st6" d="M943.7 944.1L95.7 944.1" />
    <text transform="rotate(-90 313.1 266.9)" className="st7" fontSize={16}>
      {"% of women getting degrees"}
    </text>
  </>
);

export const DistributionFooter = () => (
  <>
    <path
      d="M161.4 1050.7h-55.1v-55.1h55.1v13.7h-2.8v-10.9h-49.5v49.5h49.5v-11.4h2.8v14.2z"
      className="st15"
    />
    <path
      d="M130.1 1028.4h6.9v2.3h-9.7V1016h2.8v12.4zm18.6 4.5h-9.2v-2.2h9.2v2.2z"
      className="st15"
    />
    <circle cx={116.4} cy={1006.1} r={3.2} fill="#32aab3" />

    <text transform="translate(175.8 1017.8)">
      <tspan x={0} y={0} className="st7 st19">
        {"Data Research "}
      </tspan>
      <tspan x={0} y={22} className="st7 st19">
        {"by Leniolabs_"}
      </tspan>
    </text>

    <path fill="none" d="M644.1 1004.9H964.3V1041.8H644.1z" />
    <text transform="translate(644.1 1013.4)">
      <tspan x={0} y={0} className="st7 st14">
        {"Sources:"}
      </tspan>
      <tspan x={45.7} y={0} className="st7 st14">
        {" National Center for Education Statistics, tables 325 - "}
      </tspan>
      <tspan x={0} y={15} className="st7 st14">
        {"trends in degrees by field and sex"}
      </tspan>
    </text>
  </>
);
