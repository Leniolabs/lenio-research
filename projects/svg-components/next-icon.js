import PropTypes from "prop-types";
const NextIcon = ({
  fill = "#FFFFFF",
  width = "36px",
  height = "36px",
  disabled = false,
  opacity = disabled ? "0.253224927" : "0.598360283"
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <title>3FA36AEA-B3A6-49D3-B25F-CF0192BC658B</title>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="00-Landing-Research---V2" transform="translate(-1309.000000, -917.000000)">
          <g id="Group-5" transform="translate(255.000000, 917.000000)">
            <g id="play_circle_outline-24px-(1)" transform="translate(1054.000000, 0.000000)">
              <polygon id="Path" points="0 0 36 0 36 36 0 36"></polygon>
              <path
                d="M15,24.75 L24,18 L15,11.25 L15,24.75 Z M18,3 C9.72,3 3,9.72 3,18 C3,26.28 9.72,33 18,33 C26.28,33 33,26.28 33,18 C33,9.72 26.28,3 18,3 Z M18,30 C11.385,30 6,24.615 6,18 C6,11.385 11.385,6 18,6 C24.615,6 30,11.385 30,18 C30,24.615 24.615,30 18,30 Z"
                id="Shape"
                fill={fill}
                fillRule="nonzero"
                opacity={opacity}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
NextIcon.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  opacity: PropTypes.string,
  disabled: PropTypes.bool
};
export default NextIcon;
