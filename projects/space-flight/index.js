import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTracking } from "analytics/context";
import { useWindowSize } from "utils/useWindowSize";
import { Scaler } from "./Scaler";
import { scaleLinear } from "d3-scale";
import { Controls } from "./Controls";
import { TextTooltip } from "./TextScroller";
import { DistanceMarker } from "./DistanceMarker";
import { ItemData } from "./data";
import { Story } from "./story";
import { Stars } from "./Stars";

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  span {
    font-size: 1.2rem;
    display: block;
    color: #ff7d31;
    text-align: center;
  }
`;

const SectionSubTitle = styled.h3`
  font-size: 1.4rem;
  text-align: center;
`;

const TextDisclaimer = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  margin: 1rem;
  text-align: right;
`;

const getNewDomain = (story) => {
  const elemStart = ItemData.find((d) => d.story === story.start);
  const elemEnd = ItemData.find((d) => d.story === story.end);

  if (elemStart.distance < elemEnd.distance) {
    return [elemStart, elemEnd];
  }
  return [elemEnd, elemStart];
};

export const Index = ({ seeMore = false }) => {
  const { logEvent } = useTracking();
  const clientSize = useWindowSize();
  const [domain, setDomain] = React.useState([0, 1]);
  const [earth] = React.useState(ItemData.find((d) => d.name === "Earth"));
  const svgRef = React.useRef();
  const scale = React.useMemo(() => {
    return scaleLinear().range([0, clientSize[0]]).domain(domain);
  }, [domain, clientSize]);

  const [storyIdx, setStoryIdx] = React.useState(0);
  const [storyStep, setStoryStep] = React.useState(Story[0]);
  const [focusedItem, setFocusedItem] = React.useState(ItemData.find((d) => d.story === 11));
  const [, setStartItem] = React.useState(ItemData.find((d) => d.story === 1));
  const [, setEndItem] = React.useState(ItemData.find((d) => d.story === 2));

  React.useEffect(() => {
    console.log("clientsize", clientSize);
  }, [clientSize]);

  const onBack = React.useCallback(() => {
    logEvent({
      category: "SpaceFlight",
      action: "onBack"
    });
    if (storyIdx > 0) {
      setStoryIdx(storyIdx - 1);
    }
  }, [domain]);

  const onForward = React.useCallback(() => {
    logEvent({
      category: "SpaceFlight",
      action: "onForward"
    });
    if (storyIdx < Story.length - 1) {
      setStoryIdx(storyIdx + 1);
    }
  }, [domain]);

  React.useEffect(() => {
    setStoryStep(Story[storyIdx]);
    const [start, end] = getNewDomain(Story[storyIdx]);
    if (Story[storyIdx].domain) {
      setDomain(Story[storyIdx].domain);
    } else {
      setDomain([start.distance * 0.99, end.distance * 1.05]);
    }
    setStartItem(start);
    setEndItem(end);
    setFocusedItem(ItemData.find((d) => d.story === Story[storyIdx].focus));
  }, [storyIdx]);

  return (
    <section className="chart-wrapper">
      <div id="portal-root"></div>
      <svg
        ref={svgRef}
        overflow="visible"
        className="main-svg-space"
        height={600}
        width={clientSize[0] - 18}
        viewBox={`0 0 ${clientSize[0]} 600`}
        fill="#233042">
        <clipPath id="clip">
          <rect x="0" y="-300" width={clientSize[0] + 18} height={900} fill="#233042"></rect>
        </clipPath>
        <rect x="0" y="-20" width={clientSize[0] + 20} height={640} fill="#233042"></rect>
        <circle clipPath="url(#clip)" fill="#3A4859" cx="0" cy="300" r="500" opacity=".5" />
        <Stars scale={scale} />
        <DistanceMarker
          scale={scale}
          earthPosition={earth.distance}
          point2={focusedItem.distance}
          width={clientSize[0]}
        />
        {ItemData.map((item) => {
          if (item.type === "spaceship" && item.story !== focusedItem.story) {
            return null;
          }
          return (
            <Scaler
              key={`icon-${item.name}`}
              scale={scale}
              position={item.distance}
              scaleRadius={item.type === "star"}
              halfSize={storyIdx > 8}
              diameter={item.diameter}>
              <item.component />
            </Scaler>
          );
        })}
        <TextTooltip svg={svgRef} width={clientSize[0] - 60}>
          {storyStep.tooltip ? storyStep.tooltip : "No Tooltip Data yet"}
        </TextTooltip>
        <Controls x={clientSize[0] - 100} y={580} onBack={onBack} onForward={onForward}></Controls>
      </svg>
      <TextDisclaimer>* object sizes are not to scale</TextDisclaimer>
      <div className="row-container">
        <SectionTitle>
          <span>12 April</span>International Day of Human Space Flight
        </SectionTitle>
        <SectionSubTitle>The beginning of the space era for humananity</SectionSubTitle>
        <p>
          12 April 1961 was the date of the first human space flight. This historic event opened the
          way for space exploration for the benefit of all humanity. The United Nations family
          strives continuously to utilize the unique benefits of outer space for the betterment of
          all humankind. The General Assembly has expressed its deep conviction of the common
          interest of mankind in promoting and expanding the exploration and use of outer space, as
          the province of all mankind, for peaceful purposes and to extend any benefits derived to
          all states.
        </p>
        <p>
          Text from{" "}
          <a
            href="https://www.un.org/en/observances/human-spaceflight-day"
            rel="noreferrer"
            target="_blank">
            United Nations
          </a>
        </p>

      </div>
    </section>
  );
};

Index.propTypes = {
  seeMore: PropTypes.bool
};

export default Index;
