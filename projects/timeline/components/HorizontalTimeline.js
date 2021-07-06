import { useState, useEffect, useCallback, useRef } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import {
  Center,
  LabelCompanies,
  TimelineContainer,
  SelectorContainer,
  LineContainer,
  PlayBtn,
  AnimationContainer,
  SourceLink
} from "../timeline.style";
import data from "../timeline.data";
import { CustomSelect } from "@components/select/select";
import { LineGraphic } from "../svg-components/LineGraphic";
import { LineGraphicText } from "../svg-components/LineGraphicText";
import {
  getCompaniesOptions,
  getAllPublications,
  getPublicationDates,
  mapDatesToGraphic
} from "./utils";
import { AnimatePresence } from "framer-motion";
import { useTracking } from "analytics/context";

const variants = {
  initial: {
    x: -150,
    opacity: 0,
    maxHeight: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    maxHeight: 1200,
    transition: { duration: 0.5 }
  },
  exit: {
    x: 150,
    opacity: 0,
    maxHeight: 0,
    transition: { duration: 0.5 }
  }
};

const SELECT_WIDTH = 270;
const initialPublications = getAllPublications(data);
const initialDates = getPublicationDates(initialPublications);

export const Timeline = () => {
  const companiesOptions = getCompaniesOptions(data);
  const intervalRef = useRef();
  const [timelineData, setTimelineData] = useState({
    value: 0,
    previous: 0
  });
  const [values, setValues] = useState(initialDates);
  const [companyPublications, setCompanyPublications] = useState(initialPublications);
  const [publication, setPublication] = useState({});
  const [selectedOption, setSelectedOption] = useState(companiesOptions[0]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [graphicData, setGraphicData] = useState([]);
  const [updatedAnimation, setUpdatedAnimation] = useState(true);
  const { logEvent } = useTracking();

  const startTimeline = () => {
    setIsPlaying(true);
    nextDate();
    const timelineInterval = setInterval(() => {
      nextDate();
    }, 4000);
    intervalRef.current = timelineInterval;
  };

  const stopTimeLine = () => {
    logEvent({
      category: "TimeLine",
      action: "stopTimeLine"
    });
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const newPublications = () => {
    data.map((item) => {
      const { company, publications } = item;
      if (selectedCompany === company) {
        setCompanyPublications(publications);
      } else if (selectedCompany === "All") {
        setCompanyPublications(initialPublications);
      }
    });
  };

  useEffect(() => {
    const newDates = getPublicationDates(companyPublications);
    setValues(newDates);
    setTimelineData({ value: 0, previous: 0 });
    if (intervalRef.current) {
      stopTimeLine();
    }
  }, [companyPublications]);

  // multiple
  useEffect(() => {
    newPublications();
  }, [selectedCompany]);

  // individual
  useEffect(() => {
    setUpdatedAnimation(false);
    const newPublication = companyPublications.find(
      (company) => company.id == timelineData.value + 1
    );
    setPublication(newPublication);
    setTimeout(() => {
      setUpdatedAnimation(true);
    }, 500);
    if (newPublication?.calendar) {
      const { calendar } = newPublication;
      if (calendar) {
        const graphicData = mapDatesToGraphic(calendar);
        setGraphicData(graphicData);
      }
    }
  }, [companyPublications, timelineData.value]);

  const onChangeCallback = useCallback((option) => {
    logEvent({
      category: "TimeLine",
      action: "onChangeCallback",
      label: option.label
    });
    setSelectedCompany(option.label);
    setSelectedOption(option);
  }, []);

  const nextDate = () => {
    logEvent({
      category: "TimeLine",
      action: "nextDate"
    });
    setTimelineData((currentSate) => {
      const nextValue = currentSate.value + 1;
      const nextState = {
        value: nextValue > companyPublications.length - 1 ? 0 : nextValue,
        previous: nextValue > companyPublications.length - 1 ? 0 : currentSate.value
      };
      return { ...nextState };
    });
  };

  const onPlayOrStop = () => {
    logEvent({
      category: "TimeLine",
      action: "onPlayOrStop"
    });
    if (isPlaying) {
      stopTimeLine();
    } else {
      startTimeline();
    }
  };

  return (
    <div>
      <SelectorContainer>
        <PlayBtn onClick={onPlayOrStop}> {isPlaying ? "⏹️ Stop" : "▶️ Play"}</PlayBtn>
        <div>
          <LabelCompanies>Companies</LabelCompanies>
          <CustomSelect
            width={SELECT_WIDTH}
            options={companiesOptions}
            selectedOption={selectedOption}
            onChange={onChangeCallback}></CustomSelect>
        </div>
      </SelectorContainer>

      <TimelineContainer>
        <LineContainer>
          <HorizontalTimeline
            labelWidth={120}
            index={timelineData.value}
            indexClick={(index) => {
              setTimelineData({ value: index, previous: timelineData.value });
            }}
            isTouchEnabled
            values={values}
            styles={{ background: "#f8f8f8", foreground: "#2c9faa", outline: "#dfdfdf" }}
          />
        </LineContainer>
        <AnimationContainer>
          <AnimatePresence>
            {updatedAnimation && (
              <Center
                key={`${publication?.company}-${publication?.title}-${values[timelineData.value]}`}
                variants={variants}
                initial={timelineData.value <= timelineData.previous ? "initial" : "exit"}
                animate="visible"
                exit={timelineData.value < timelineData.previous ? "initial" : "exit"}>
                {publication?.company && (
                  <h3>
                    {publication?.logo}
                    {publication?.company}
                  </h3>
                )}
                <h4>{publication?.title}</h4>
                <p>{publication?.content}</p>
                <SourceLink href={publication?.link}>See sourde</SourceLink>
              </Center>
            )}
          </AnimatePresence>
        </AnimationContainer>
        {graphicData.length > 1 && (
          <div>
            <LineGraphic data={graphicData} selectedDate={values[timelineData.value]}></LineGraphic>
            <LineGraphicText></LineGraphicText>
          </div>
        )}
      </TimelineContainer>
    </div>
  );
};
