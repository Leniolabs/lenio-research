import * as React from "react";
import PropTypes from "prop-types";
import {
  DistributionContainer,
  DistributionFooter,
  DistributionMeasures,
  DistributionTitle,
  CareerEntry
} from "./graphic-fragments";
import { buildPath, GraphicConstants, getVerticalPointFromPercentage, getLastItem } from "../utils";
import { generateSlots, getFilledSlots } from "../slotUtils";

const { BOTTOM_LIMIT, TOP_LIMIT } = GraphicConstants;

// Number of slots. The less resolution you set, the possibilities of text clashing grow
const SLOT_RESOLUTION = 105;

const DistributionGraphic = ({ data, ...extraProps }) => {
  const {
    measures,
    measures: { xPoints },
    entries
  } = data;

  const filledSlots = React.useMemo(() => {
    const slots = generateSlots({
      bottomLimit: BOTTOM_LIMIT,
      topLimit: TOP_LIMIT,
      numOfSlots: SLOT_RESOLUTION
    });

    const points = entries.map(({ path: { yPoints }, text }) => {
      const textY = getVerticalPointFromPercentage(getLastItem(yPoints).value);

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
    <DistributionContainer {...extraProps}>
      <DistributionTitle />

      {/* Entries Evolution + Career */}
      {entries.map((entry) => {
        const { yPoints, ...pathData } = entry.path;
        const path = buildPath(xPoints, yPoints);
        let lastPointY = filledSlots[entry.text.value];

        return (
          <CareerEntry
            key={entry.text.value}
            highlight={entry.highlight}
            pathData={{ path, ...pathData }}
            textData={{ translateY: lastPointY, ...entry.text }}
            onClick={(e) => console.log(e.currentTarget.closest("g"))}
          />
        );
      })}

      <DistributionMeasures measures={measures} />
      <DistributionFooter />
    </DistributionContainer>
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
