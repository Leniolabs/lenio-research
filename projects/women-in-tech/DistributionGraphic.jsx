import * as React from "react";
import PropTypes from "prop-types";
import Graphic from "./Graphic";
import { buildPath, GraphicConstants, getLastItem, getVerticalPointFromDomain } from "./utils";
import { generateSlots, getFilledSlots } from "./slotUtils";

const { BOTTOM_LIMIT, TOP_LIMIT } = GraphicConstants;

// Number of slots. The less resolution you set, the possibilities of text clashing grow
const SLOT_RESOLUTION = 80;

const DistributionGraphic = ({ data, ...extraProps }) => {
  const [graphicData, setGraphicData] = React.useState(data);

  const {
    measures,
    measures: { xPoints },
    entries,
    config: { yDomain, title, legend, sources }
  } = graphicData;

  const onCareerClickHandler = React.useCallback((careerName) => {
    setGraphicData((prev) => ({
      ...prev,
      entries: prev.entries.map((career) =>
        career.text.value === careerName
          ? { ...career, highlight: true, path: { ...career.path, className: "" } }
          : { ...career, highlight: false, path: { ...career.path, className: "st1" } }
      )
    }));
  }, []);

  const filledSlots = React.useMemo(() => {
    const slots = generateSlots({
      bottomLimit: BOTTOM_LIMIT,
      topLimit: TOP_LIMIT,
      numOfSlots: SLOT_RESOLUTION
    });

    const points = entries.map(({ path: { yPoints }, text }) => {
      const textY = getVerticalPointFromDomain(yDomain, getLastItem(yPoints).value);

      return {
        position: textY,
        value: textY,
        label: text.value
      };
    });

    const obj = {};

    getFilledSlots(slots, points).forEach((slot) => {
      obj[slot.label] = slot.position;
    });

    return obj;
  }, [entries]);

  return (
    <Graphic {...extraProps}>
      <Graphic.Title title={title} />

      {/* Entries Evolution + Career */}
      {entries.map((entry) => {
        const { yPoints, ...pathData } = entry.path;
        const path = buildPath(xPoints, yPoints, { yDomain });
        let lastPointY = filledSlots[entry.text.value];

        return (
          <Graphic.Entry
            key={entry.text.value}
            highlight={entry.highlight}
            pathData={{ path, ...pathData }}
            textData={{ translateY: lastPointY, ...entry.text }}
            onTextClick={() => onCareerClickHandler(entry.text.value)}
          />
        );
      })}

      <Graphic.Measure measures={measures} legend={legend} />
      <Graphic.Footer sources={sources} />
    </Graphic>
  );
};

const { shape, arrayOf, number, string } = PropTypes;

DistributionGraphic.propTypes = {
  data: shape({
    entries: arrayOf(
      shape({
        text: shape({
          children: string,
          transform: string,
          className: string
        }),
        path: shape({
          className: string,
          data: arrayOf(
            shape({
              date: string,
              value: number
            })
          )
        })
      })
    ),
    xPoints: PropTypes.any
  })
};

export default DistributionGraphic;
