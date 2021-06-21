import dayjs from "dayjs";

const black = "#2a3f55";
const colors = {
  office: "#2aa881",
  hybrid: "#ffbf55",
  home: "#ff3f55"
};
const WIDTH = 37.2;
const INITIAL_POSITON = 0.1;
export const LineGraphic = ({ data, selectedDate }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 928.3 29.8">
      {data.length > 0 &&
        data.map(({ date, status }, index) => {
          const position = index > 0 ? WIDTH * index : INITIAL_POSITON;
          const linePosition = position + 18.6;
          return (
            <>
              <rect
                key={index}
                width={WIDTH}
                height="18.6"
                x={position}
                y="5.6"
                fill={colors[status]}
                stroke={black}
                strokeWidth=".3"
              />
              {dayjs(selectedDate).isSame(date, "month") && (
                <line
                  x1={linePosition}
                  x2={linePosition}
                  y2="29.8"
                  fill="none"
                  stroke={black}
                  strokeWidth="2"
                />
              )}
            </>
          );
        })}
    </svg>
  );
};
