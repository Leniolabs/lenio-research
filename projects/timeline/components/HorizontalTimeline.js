import { useState, useEffect, useCallback } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
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
import { getCompaniesOptions, getAllPublications, getPublicationDates } from "./utils";
import dayjs from "dayjs";

const SELECT_WIDTH = 270;

const initialPublications = getAllPublications(data);
const initialDates = getPublicationDates(initialPublications);

export const Timeline = () => {
  const companiesOptions = getCompaniesOptions(data);
  let timelineInterval = null;
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

  console.log(`companyPublications`, companyPublications);

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
    return () => {
      if (timelineInterval) {
        clearInterval(timelineInterval);
      }
    };
  }, []);

  useEffect(() => {
    const newDates = getPublicationDates(companyPublications);
    setValues(newDates);
    setTimelineData({ value: 0, previous: 0 });
    if (timelineInterval) {
      clearInterval(timelineInterval);
      startTimeline();
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
  }, [companyPublications, timelineData.value]);

  const onChangeCallback = useCallback((option) => {
    setSelectedCompany(option.label);
    setSelectedOption(option);
  }, []);

  const startTimeline = () => {
    timelineInterval = setInterval(() => {
      setIsPlaying((prevV) => !prevV);
      setTimelineData((currentSate) => {
        console.log(`companyPublications.length`, companyPublications.length);
        const nextValue = currentSate.value + 1;
        const nextState = {
          value: nextValue > companyPublications.length ? 0 : nextValue,
          previous: nextValue > companyPublications.length ? 0 : currentSate.value
        };
        return { ...nextState };
      });
    }, 3000);
  };
  return (
    <div>
      <SelectorContainer>
        <PlayBtn onClick={startTimeline}> {isPlaying ? "⏹️ Stop" : "▶️ Play"}</PlayBtn>
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
          {publication?.company && <h3>{publication?.company}</h3>}
          <h4>{publication?.title}</h4>
          <p>{publication?.content}</p>
        </Center>
      </TimelineContainer>
    </div>
  );
};
