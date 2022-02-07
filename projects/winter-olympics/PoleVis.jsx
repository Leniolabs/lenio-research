/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTracking } from "analytics/context";
import { PoleData } from "./poleData";

const TOOLTIP_WIDTH = 380;
const TOOLTIP_HEIGHT = 110;
const CIRCLE_SIZE = 24;
const GIF_DURATION_MS = 18600;

const PoleTooltip = ({ x, y, name, countryCode, record }) => {
  const actualX = x - TOOLTIP_WIDTH / 2;
  const actualY = y - TOOLTIP_HEIGHT - CIRCLE_SIZE;
  return (
    <g transform={`translate(${actualX} ${actualY})`}>
      <path
        fill="#F8F3E6"
        stroke="#2B4055"
        strokeMiterlimit="10"
        d={`M0,0h${TOOLTIP_WIDTH}v${TOOLTIP_HEIGHT}h-${TOOLTIP_WIDTH / 2 - 10}l-10 10l-10 -10h-${
          TOOLTIP_WIDTH / 2 - 10
        }z`}
      />
      <text
        transform="translate(15.32 46.385)"
        fill="#2B4055"
        fontFamily="'Source Sans Pro'"
        fontSize="48">
        {record.toFixed(2)}
      </text>
      <text
        transform="translate(15.32 88.802)"
        fill="#2B4055"
        fontFamily="'Source Sans Pro'"
        fontSize="36">
        {name}
      </text>
      <g stroke="#2B4055" strokeMiterlimit="10">
        <image
          href={`https://www.countryflags.io/${countryCode}/flat/64.png`}
          height="48"
          x="315"
          y="7"
        />
      </g>
    </g>
  );
};

PoleTooltip.propTypes = {
  name: PropTypes.string,
  countryCode: PropTypes.string,
  record: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

const getData = (x, y, idx) => {
  return {
    x,
    y,
    name: PoleData[idx].name,
    countryCode: PoleData[idx].country,
    record: PoleData[idx].record
  };
};

const timestamp = new Date().getTime();

const PoleVis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const { logEvent } = useTracking();

  return (
    <svg
    viewBox="0 130 1204 700"
  >
    <path fill="#fffbf0" d="M0 0H1203.16V975.56H0z" opacity="0.1"></path>
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
      d="M90.87 410.31L1073.03 410.31"
    ></path>
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
      d="M94.87 281.31L1073.03 281.31"
    ></path>
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
      d="M94.87 149.27L1073.03 149.27"
    ></path>
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
      d="M94.87 538.31L1073.03 538.31"
    ></path>
    <path
      fill="none"
      stroke="#d3d3d3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.5"
      d="M94.87 666.31L1073.03 666.31"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M96.13 149.17L96.13 811.14"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M1101.03 797.89L77.68 797.89"
    ></path>
    <text
      fontFamily="SourceSansPro-Regular, Source Sans Pro"
      fontSize="14"
      letterSpacing="-.01em"
      transform="rotate(-90 276.445 229.335)"
    >
      p
      <tspan x="7.57" y="0" letterSpacing="0em">
        artici
      </tspan>
      <tspan x="37.49" y="0">
        p
      </tspan>
      <tspan x="45.07" y="0" letterSpacing="0em">
        an
      </tspan>
      <tspan x="59.78" y="0">
        t
      </tspan>
      <tspan x="64.37" y="0" letterSpacing="0em">
        s
      </tspan>
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="11"
      transform="translate(59.76 152.58)"
    >
      100%
      <tspan x="6.29" y="130">
        80%
      </tspan>
      <tspan x="6.29" y="260">
        60%
      </tspan>
      <tspan x="6.29" y="390">
        40%
      </tspan>
      <tspan x="6.29" y="520">
        20%
      </tspan>
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(148.68 816.82)"
    >
      1924
    </text>
    <text
      fill="#bfbfbf"
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      textDecoration="line-through"
      transform="translate(298 816.82)"
    >
      1940
    </text>
    <text
      fill="#bfbfbf"
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      textDecoration="line-through"
      transform="translate(335.33 816.82)"
    >
      1944
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(372.66 816.82)"
    >
      1948
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(409.99 816.82)"
    >
      1952
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(447.32 816.82)"
    >
      1956
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(186.01 816.82)"
    >
      1928
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(223.34 816.82)"
    >
      1932
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(260.67 816.82)"
    >
      1936
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(484.65 816.82)"
    >
      1960
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(521.98 816.82)"
    >
      1964
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(559.31 816.82)"
    >
      1968
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(596.64 816.82)"
    >
      1972
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(633.97 816.82)"
    >
      1976
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(671.3 816.82)"
    >
      1980
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(708.86 816.82)"
    >
      1984
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(745.96 816.82)"
    >
      1988
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(779.14 816.82)"
    >
      1992
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(808.01 816.82)"
    >
      1994
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(839.69 816.82)"
    >
      1998
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(876.19 816.82)"
    >
      2002
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(913.01 816.82)"
    >
      2006
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(949.82 816.77)"
    >
      2010
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(986.64 816.77)"
    >
      2014
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(1023.45 816.77)"
    >
      2018
    </text>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="12"
      transform="translate(1060.27 816.77)"
    >
      2022
    </text>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M90.87 281.31L101.13 281.31"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M90.87 149.31L101.13 149.31"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M90.87 410.31L101.13 410.31"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M90.87 538.31L101.13 538.31"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M90.87 666.31L101.13 666.31"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M162.4 792.64L162.4 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M199.73 792.64L199.73 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M237.06 792.64L237.06 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M274.39 792.64L274.39 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M311.72 792.64L311.72 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M311.72 792.64L311.72 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M349.05 792.64L349.05 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M386.38 792.64L386.38 802.9"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M311.72 792.64L311.72 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M423.71 792.64L423.71 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M461.04 792.64L461.04 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M498.37 792.64L498.37 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M535.7 792.64L535.7 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M535.7 792.64L535.7 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M573.03 792.64L573.03 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M610.36 792.64L610.36 802.9"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M498.37 792.64L498.37 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M610.36 792.64L610.36 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M647.69 792.64L647.69 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M685.02 792.64L685.02 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M722.35 792.64L722.35 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M722.35 792.64L722.35 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M759.68 792.64L759.68 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M797.01 792.64L797.01 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M816.61 792.64L816.61 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M853.1 792.64L853.1 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M889.91 792.64L889.91 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M926.73 792.64L926.73 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M926.73 792.64L926.73 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M963.55 792.64L963.55 802.9"
    ></path>
    <path
      stroke="#000"
      strokeMiterlimit="10"
      d="M685.02 792.64L685.02 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M1000.36 792.64L1000.36 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M1037.18 792.64L1037.18 802.9"
    ></path>
    <path
      fill="none"
      stroke="#000"
      strokeMiterlimit="10"
      d="M1073.99 792.64L1073.99 802.9"
    ></path>
    <text
      fill="#595a5a"
      fontFamily="SourceSansPro-Regular, Source Sans Pro"
      fontSize="18"
      transform="translate(1092.09 446.36)"
    >
      Men
    </text>
    <text
      fill="#595a5a"
      fontFamily="SourceSansPro-Regular, Source Sans Pro"
      fontSize="18"
      transform="translate(1085.34 509.99)"
    >
      Women
    </text>
    <path
      fill="none"
      stroke="#fecd30"
      strokeMiterlimit="10"
      d="M90.61 474.31L1073.03 474.31"
    ></path>
    <text
      fontFamily="OpenSans-Regular, Open Sans"
      fontSize="11"
      transform="translate(65.8 477.34)"
    >
      50%
    </text>
    <path
      fill="#f9f3e5"
      d="M1072.83 504.54L1002.93 534.85 957.06 533.79 928.88 546.21 891.57 556.53 853.1 559.1 823 591.46 803.06 612.1 759.13 653.47 682.01 654.01 647.69 661.71 610.08 662.44 577.61 676.8 535.7 676.8 498.37 654.97 463.59 690.69 423.71 692.28 389.69 719.27 274.39 717.68 249.36 734.75 200.44 755.67 162.4 769.86 162.4 175.46 200.44 189.64 237.39 202.16 274.39 227.47 389.69 227.47 423.71 251.89 461.89 252.72 498.37 290.44 535.7 267.49 575.57 267.49 609.86 282.34 648.57 282.16 687.25 292.27 758.13 291.85 793.86 323.81 811.95 343.65 852.7 384.32 906.73 391.64 963.17 412.67 1001.54 408.9 1072.83 440.91 1072.83 504.54z"
      opacity="0.5"
    ></path>
    <path
      fill="none"
      stroke="#e8ac2a"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M162.4 174.88L200.44 189.06 237.39 201.58 274.39 226.88 389.69 226.88 423.71 251.31 461.89 252.14 498.37 289.86 535.7 266.91 575.57 266.91 609.86 281.75 648.57 281.58 687.25 291.69 758.13 291.26 793.86 323.22 811.95 343.07 852.7 383.73 906.73 391.05 963.17 412.09 1001.54 408.31 1072.83 440.33"
    ></path>
    <path
      fill="none"
      stroke="#71b6c6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M162.4 769.27L200.44 755.09 249.36 734.16 274.39 717.1 389.69 718.68 423.71 691.69 463.59 690.11 498.37 654.38 535.7 676.21 577.61 676.21 610.08 661.85 647.69 661.13 682.01 653.43 759.13 652.88 803.06 611.52 823 590.88 853.1 558.52 891.57 555.95 928.88 545.63 957.06 533.21 1002.93 534.26 1072.83 503.96"
    ></path>
    <circle cx="1072.78" cy="440.33" r="6.03" fill="#e8ac2a"></circle>
    <circle cx="1072.78" cy="503.96" r="6.03" fill="#71b6c6"></circle>
    <path
      fill="#f9f3e5"
      d="M1067.45 407.88H1078.18V418.61H1067.45z"
      transform="rotate(-45 1072.812 413.247)"
    ></path>
    <rect
      width="141.71"
      height="221.77"
      x="1001.96"
      y="191.89"
      fill="#f9f3e5"
      rx="3.76"
    ></rect>
    <text
      fontFamily="SourceSansPro-Bold, Source Sans Pro"
      fontSize="12"
      fontWeight="700"
      transform="translate(1009.61 207.27)"
    >
      <tspan letterSpacing="-.08em">T</tspan>
      <tspan x="5.76" y="0" letterSpacing="-.03em">
        o
      </tspan>
      <tspan x="12.11" y="0" letterSpacing="-.02em">
        t
      </tspan>
      <tspan x="16.46" y="0">
        al: 15
      </tspan>
      <tspan
        fill="#6d6d6d"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="11"
        fontWeight="400"
      >
        <tspan x="0" y="13.2">
          Alpine Skiing
        </tspan>
        <tspan x="0" y="26.4">
          Bi
        </tspan>
        <tspan x="9.17" y="26.4" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="14.56" y="26.4">
          thlon
        </tspan>
        <tspan x="0" y="39.6">
          Bobsleigh
        </tspan>
        <tspan x="0" y="52.8">
          C
        </tspan>
        <tspan x="6.28" y="52.8" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="9.99" y="52.8">
          oss Count
        </tspan>
        <tspan x="55.33" y="52.8" letterSpacing=".03em">
          r
        </tspan>
        <tspan x="59.42" y="52.8">
          y Skiing
        </tspan>
        <tspan x="0" y="66" letterSpacing="-.01em">
          C
        </tspan>
        <tspan x="6.17" y="66">
          urling
        </tspan>
        <tspan x="0" y="79.2">
          Figu
        </tspan>
        <tspan x="19.67" y="79.2" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="23.37" y="79.2">
          e S
        </tspan>
        <tspan x="36.9" y="79.2" letterSpacing="-.01em">
          k
        </tspan>
        <tspan x="42.24" y="79.2" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="47.63" y="79.2">
          ting
        </tspan>
        <tspan x="0" y="92.4" letterSpacing="-.02em">
          F
        </tspan>
        <tspan x="5.21" y="92.4" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="8.92" y="92.4">
          ee
        </tspan>
        <tspan x="19.83" y="92.4" letterSpacing="-.02em">
          s
        </tspan>
        <tspan x="24.22" y="92.4">
          tyle Skiing
        </tspan>
        <tspan x="0" y="105.6">
          I
        </tspan>
        <tspan x="2.89" y="105.6" letterSpacing="-.02em">
          c
        </tspan>
        <tspan x="7.68" y="105.6" letterSpacing="0em">
          e Hoc
        </tspan>
        <tspan x="33.48" y="105.6" letterSpacing="-.02em">
          k
        </tspan>
        <tspan x="38.73" y="105.6" letterSpacing="0em">
          e
        </tspan>
        <tspan x="44.24" y="105.6">
          y
        </tspan>
        <tspan x="0" y="118.8" letterSpacing="-.01em">
          L
        </tspan>
        <tspan x="5.24" y="118.8">
          u
        </tspan>
        <tspan x="11.22" y="118.8" letterSpacing="-.01em">
          g
        </tspan>
        <tspan x="16.61" y="118.8">
          e
        </tspan>
      </tspan>
      <tspan
        fontFamily="SourceSansPro-SemiBold, Source Sans Pro"
        fontSize="11"
        fontWeight="600"
      >
        <tspan x="0" y="132">
          No
        </tspan>
        <tspan x="13.25" y="132" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="17.25" y="132">
          dic Combined
        </tspan>
      </tspan>
      <tspan
        fill="#6d6d6d"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="11"
        fontWeight="400"
      >
        <tspan x="0" y="145.2">
          Short{" "}
        </tspan>
        <tspan x="27.55" y="145.2" letterSpacing="-.05em">
          T
        </tspan>
        <tspan x="32.94" y="145.2" letterSpacing="-.02em">
          r
        </tspan>
        <tspan x="36.5" y="145.2">
          ack Speed S
        </tspan>
        <tspan x="91.77" y="145.2" letterSpacing="-.01em">
          k
        </tspan>
        <tspan x="97.11" y="145.2" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="102.5" y="145.2">
          ting
        </tspan>
        <tspan x="0" y="158.4">
          S
        </tspan>
        <tspan x="5.87" y="158.4" letterSpacing="-.02em">
          k
        </tspan>
        <tspan x="11.12" y="158.4">
          el
        </tspan>
        <tspan x="19.38" y="158.4" letterSpacing="-.01em">
          e
        </tspan>
        <tspan x="24.73" y="158.4" letterSpacing="-.01em">
          t
        </tspan>
        <tspan x="28.29" y="158.4">
          on
        </tspan>
        <tspan x="0" y="171.6">
          Ski Jumping
        </tspan>
        <tspan x="0" y="184.8">
          Sn
        </tspan>
        <tspan x="11.89" y="184.8" letterSpacing="0em">
          o
        </tspan>
        <tspan x="17.81" y="184.8">
          wb
        </tspan>
        <tspan x="31.79" y="184.8" letterSpacing="-.01em">
          o
        </tspan>
        <tspan x="37.6" y="184.8">
          a
        </tspan>
        <tspan x="43.14" y="184.8" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="46.85" y="184.8">
          ding
        </tspan>
        <tspan x="0" y="198">
          Speed S
        </tspan>
        <tspan x="37.07" y="198" letterSpacing="-.01em">
          k
        </tspan>
        <tspan x="42.4" y="198" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="47.79" y="198">
          ting
        </tspan>
      </tspan>
    </text>
    <path
      fill="#f9f3e5"
      d="M1067.14 521.43H1077.8700000000001V532.16H1067.14z"
      transform="rotate(-45 1072.505 526.794)"
    ></path>
    <rect
      width="142.97"
      height="212.41"
      x="1001.02"
      y="526.33"
      fill="#f9f3e5"
      rx="3.7"
    ></rect>
    <text
      fontFamily="SourceSansPro-Bold, Source Sans Pro"
      fontSize="12"
      fontWeight="700"
      transform="translate(1009.61 542.29)"
    >
      <tspan letterSpacing="-.08em">T</tspan>
      <tspan x="5.76" y="0" letterSpacing="-.03em">
        o
      </tspan>
      <tspan x="12.11" y="0" letterSpacing="-.02em">
        t
      </tspan>
      <tspan x="16.46" y="0">
        al: 14
      </tspan>
      <tspan
        fill="#6d6d6d"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="11"
        fontWeight="400"
      >
        <tspan x="0" y="13.2">
          Alpine Skiing
        </tspan>
        <tspan x="0" y="26.4">
          Bi
        </tspan>
        <tspan x="9.17" y="26.4" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="14.56" y="26.4" letterSpacing="0em">
          thlon
        </tspan>
        <tspan x="0" y="39.6">
          Bobsleigh
        </tspan>
        <tspan x="0" y="52.8">
          C
        </tspan>
        <tspan x="6.28" y="52.8" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="9.99" y="52.8">
          oss Count
        </tspan>
        <tspan x="55.33" y="52.8" letterSpacing=".03em">
          r
        </tspan>
        <tspan x="59.42" y="52.8">
          y Skiing
        </tspan>
        <tspan x="0" y="66" letterSpacing="-.01em">
          C
        </tspan>
        <tspan x="6.17" y="66">
          urling
        </tspan>
        <tspan x="0" y="79.2">
          Figu
        </tspan>
        <tspan x="19.67" y="79.2" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="23.37" y="79.2">
          e S
        </tspan>
        <tspan x="36.9" y="79.2" letterSpacing="-.01em">
          k
        </tspan>
        <tspan x="42.24" y="79.2" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="47.63" y="79.2" letterSpacing="0em">
          ting
        </tspan>
        <tspan x="0" y="92.4" letterSpacing="-.02em">
          F
        </tspan>
        <tspan x="5.21" y="92.4" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="8.92" y="92.4">
          ee
        </tspan>
        <tspan x="19.83" y="92.4" letterSpacing="-.02em">
          s
        </tspan>
        <tspan x="24.22" y="92.4">
          tyle Skiing
        </tspan>
        <tspan x="0" y="105.6">
          I
        </tspan>
        <tspan x="2.89" y="105.6" letterSpacing="-.02em">
          c
        </tspan>
        <tspan x="7.68" y="105.6">
          e Hoc
        </tspan>
        <tspan x="33.48" y="105.6" letterSpacing="-.02em">
          k
        </tspan>
        <tspan x="38.73" y="105.6" letterSpacing="0em">
          e
        </tspan>
        <tspan x="44.24" y="105.6">
          y
        </tspan>
      </tspan>
      <tspan
        fill="#6d6d6d"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="11"
        fontWeight="400"
        letterSpacing="-.01em"
      >
        <tspan x="0" y="118.8">
          L
        </tspan>
        <tspan x="5.24" y="118.8" letterSpacing="0em">
          u
        </tspan>
        <tspan x="11.22" y="118.8">
          g
        </tspan>
        <tspan x="16.61" y="118.8" letterSpacing="0em">
          e
        </tspan>
      </tspan>
      <tspan
        fill="#6d6d6d"
        fontFamily="SourceSansPro-Regular, Source Sans Pro"
        fontSize="11"
        fontWeight="400"
      >
        <tspan x="0" y="132">
          Short{" "}
        </tspan>
        <tspan x="27.55" y="132" letterSpacing="-.05em">
          T
        </tspan>
        <tspan x="32.94" y="132" letterSpacing="-.02em">
          r
        </tspan>
        <tspan x="36.5" y="132">
          ack Speed S
        </tspan>
        <tspan x="91.77" y="132" letterSpacing="-.01em">
          k
        </tspan>
        <tspan x="97.11" y="132" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="102.5" y="132">
          ting
        </tspan>
        <tspan x="0" y="145.2">
          S
        </tspan>
        <tspan x="5.87" y="145.2" letterSpacing="-.02em">
          k
        </tspan>
        <tspan x="11.12" y="145.2">
          el
        </tspan>
        <tspan x="19.38" y="145.2" letterSpacing="-.01em">
          e
        </tspan>
        <tspan x="24.73" y="145.2" letterSpacing="-.01em">
          t
        </tspan>
        <tspan x="28.29" y="145.2">
          on
        </tspan>
        <tspan x="0" y="158.4">
          Ski Jumping
        </tspan>
        <tspan x="0" y="171.6">
          Sn
        </tspan>
        <tspan x="11.89" y="171.6" letterSpacing="0em">
          o
        </tspan>
        <tspan x="17.81" y="171.6" letterSpacing="0em">
          wb
        </tspan>
        <tspan x="31.79" y="171.6" letterSpacing="-.01em">
          o
        </tspan>
        <tspan x="37.6" y="171.6">
          a
        </tspan>
        <tspan x="43.14" y="171.6" letterSpacing="-.01em">
          r
        </tspan>
        <tspan x="46.85" y="171.6">
          ding
        </tspan>
        <tspan x="0" y="184.8">
          Speed S
        </tspan>
        <tspan x="37.07" y="184.8" letterSpacing="-.01em">
          k
        </tspan>
        <tspan x="42.4" y="184.8" letterSpacing="-.01em">
          a
        </tspan>
        <tspan x="47.79" y="184.8">
          ting
        </tspan>
      </tspan>
    </text>
      {tooltipData && <PoleTooltip {...tooltipData}></PoleTooltip>}
    </svg>
  );
};

export default PoleVis;
