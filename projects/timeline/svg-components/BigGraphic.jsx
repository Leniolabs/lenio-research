import dayjs from "dayjs";
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
const INITIAL_POSITON = 40.1;
const HEIGHT = 20;
export const BigGraphic = ({ companies, selectedDate }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080.1 263.1">
      {Object.keys(companies).map((companyId, heightIndex) => {
        const graph = mapDatesToGraphic(companies[companyId]);
        const yPosition = heightIndex > 0 ? HEIGHT * heightIndex : 0.6;
        return graph.map(({ date, status }, index) => {
          const position = index > 0 ? WIDTH * index : INITIAL_POSITON;
          const linePosition = position + 20;
          return (
            <Fragment key={`${companyId}-${index}`}>
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
              {dayjs(selectedDate).isSame(date, "month") && (
                <motion.line
                  animate={{ x: [-40, 0] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  x1={linePosition}
                  x2={linePosition}
                  y2={yPosition + HEIGHT}
                  fill="none"
                  stroke={black}
                  strokeWidth="2"
                />
              )}
            </Fragment>
          );
        });
      })}
    </svg>
  );
};
