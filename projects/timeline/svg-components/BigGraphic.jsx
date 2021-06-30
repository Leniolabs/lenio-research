import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { mapDatesToGraphic } from "../components/utils";
const black = "#2a3f55";
const colors = {
  office: "#2aa881",
  hybrid: "#ffbf55",
  home: "#ff3f55"
};
const WIDTH = 40;
const INITIAL_X = 80;
const INITIAL_Y = 10;
const HEIGHT = 20;
const LINE_OFFSET = 5;
export const BigGraphic = ({ companies, selectedDate }) => {
  const formatedDate = dayjs(selectedDate, "MMMYYYY").format();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 200">
      {Object.keys(companies).map((companyId, heightIndex) => {
        const graph = mapDatesToGraphic(companies[companyId]);
        const yPosition = heightIndex > 0 ? HEIGHT * heightIndex + INITIAL_Y : INITIAL_Y;
        const textPositionY = yPosition + 14;
        return (
          <Fragment key={`${companyId}-${heightIndex}-container`}>
            <text fill="#2a3f55" fontSize="11.2" fontWeight="600" x={20} y={textPositionY}>
              {companyId
                .split("")
                .map((letter, index) => (index ? letter.toLowerCase() : letter.toUpperCase()))
                .join("")}
            </text>
            {graph.map(({ date, status }, index) => {
              const position = index > 0 ? WIDTH * index + INITIAL_X : INITIAL_X;
              const linePosition = position + 20;
              return (
                <Fragment key={`${companyId}-${heightIndex}-${index}`}>
                  <rect
                    key={index}
                    width={WIDTH}
                    height={HEIGHT}
                    x={position}
                    y={yPosition}
                    fill={colors[status]}
                    stroke={black}
                    strokeWidth=".3"
                  />
                  {dayjs(formatedDate).isSame(date, "month") && (
                    <motion.line
                      initial={{ x: -40 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      x1={linePosition}
                      x2={linePosition}
                      y1={INITIAL_Y - LINE_OFFSET}
                      y2={yPosition + HEIGHT + LINE_OFFSET}
                      fill="none"
                      stroke={black}
                      strokeWidth="2"
                    />
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </svg>
  );
};
