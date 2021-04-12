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
  const [focusedItem, setFocusedItem] = React.useState(ItemData.find((d) => d.story === 2));
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
    const [start, end] = getNewDomain(Story[storyIdx]);
    setStartItem(start);
    setEndItem(end);
    setFocusedItem(ItemData.find((d) => d.story === Story[storyIdx].focus));
    if (Story[storyIdx].domain) {
      setDomain(Story[storyIdx].domain);
    } else {
      setDomain([start.distance * 0.99, end.distance * 1.05]);
    }
  }, [storyIdx]);

  return (
    <section className="chart-wrapper">
      <div id="portal-root"></div>
      <svg
        ref={svgRef}
        overflow="visible"
        height={600}
        width={clientSize[0] - 18}
        viewBox={`0 0 ${clientSize[0]} 600`}
        fill="#233042">
        <rect x="0" y="0" width={clientSize[0] + 18 } height={600} fill="#233042"></rect>
        <circle fill="#FFCA30" cx="-50" cy="300" r="100"/>
        <DistanceMarker
          scale={scale}
          point1={earth.distance}
          point2={focusedItem.distance}></DistanceMarker>
        {ItemData.map((item) => {
          return (
            <Scaler
              key={`icon-${item.name}`}
              scale={scale}
              position={item.distance}
              diameter={item.diameter}>
              <item.component />
            </Scaler>
          );
        })}
        <TextTooltip svg={svgRef} positionX={scale(focusedItem.distance)} positionY={40}>
          {focusedItem.tooltip ? <focusedItem.tooltip /> : "No Tooltip Data yet"}
        </TextTooltip>
        <Controls x={clientSize[0] - 100} y={380} onBack={onBack} onForward={onForward}></Controls>
      </svg>
      <div className="row-container">
        <SectionTitle><span>12 April</span>Space Flight Day</SectionTitle>
        <h3>The beginning of the space era for mankind</h3>
        <p>12 April 1961 was the date of the first human space flight. This historic event opened the way for space exploration for the benefit of all humanity. The United Nations family strives continuously to utilize the unique benefits of outer space for the betterment of all humankind. The General Assembly has expressed its deep conviction of the common interest of mankind in promoting and expanding the exploration and use of outer space, as the province of all mankind, for peaceful purposes and to extend any benefits derived to all states.</p>
        <p>Text from <a href="https://www.un.org/en/observances/human-spaceflight-day" target="_blank">United Nations</a></p>

        {!seeMore ? (
          <a href="/data.json">
            <button className="btn download-btn">Download Data</button>
          </a>
        ) : (
          <Link href="/vaccinations">
            <a>
              <button className="btn download-btn">See more</button>
            </a>
          </Link>
        )}
      </div>
    </section>
  );
};

Index.propTypes = {
  seeMore: PropTypes.bool
};

export default Index;
