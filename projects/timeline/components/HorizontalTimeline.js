import { useState, useEffect, useCallback, useRef } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { motion } from "framer-motion";
import {
  Center,
  LabelCompanies,
  TimelineContainer,
  SelectorContainer,
  LineContainer,
  PlayBtn
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

  const startTimeline = () => {
    setIsPlaying(true);
    nextDate();
    const timelineInterval = setInterval(() => {
      nextDate();
    }, 4000);
    intervalRef.current = timelineInterval;
  };

  const stopTimeLine = () => {
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
    const newPublication = companyPublications.find(
      (company) => company.id == timelineData.value + 1
    );
    setPublication(newPublication);
    const { calendar } = newPublication;
    if (calendar) {
      const graphicData = mapDatesToGraphic(calendar);
      setGraphicData(graphicData);
    }
  }, [companyPublications, timelineData.value]);

  const onChangeCallback = useCallback((option) => {
    setSelectedCompany(option.label);
    setSelectedOption(option);
  }, []);

  const nextDate = () => {
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
    if (isPlaying) {
      stopTimeLine();
    } else {
      startTimeline();
    }
  };
  // console.log(`graphicData`, graphicData);
  return (
    <div>
      <SelectorContainer>
        <PlayBtn onClick={onPlayOrStop}> {isPlaying ? "⏹️ Stop" : "▶️ Play"}</PlayBtn>
        <LabelCompanies>Companies</LabelCompanies>
        <CustomSelect
          width={SELECT_WIDTH}
          options={companiesOptions}
          selectedOption={selectedOption}
          onChange={onChangeCallback}></CustomSelect>
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
        <Center>
          <motion.div
            key={`${publication?.company}-${publication?.title}-${values[timelineData.value]}`}
            animate={{ x: timelineData.value >= timelineData.previous ? [500, 0] : [-500, 0] }}>
            {publication?.company && <h3>{publication?.company}</h3>}
            <h4>{publication?.title}</h4>
            <p>{publication?.content}</p>
          </motion.div>
        </Center>
        {graphicData.length > 1 && (
          <>
            <LineGraphic data={graphicData} selectedDate={values[timelineData.value]}></LineGraphic>
            <LineGraphicText></LineGraphicText>
          </>
        )}
      </TimelineContainer>
    </div>
  );
};
