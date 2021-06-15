import { useState, useEffect, useCallback } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import {
  Center,
  LabelCompanies,
  TimelineContainer,
  SelectorContainer,
  LineContainer,
} from "../timeline.style";
import data from "../timeline.data";
import { CustomSelect } from "@components/select/select";
import { getCompaniesOptions, getAllPublications, getPublicationDates } from "./utils";
import dayjs from "dayjs";

const SELECT_WIDTH = 270;

const initialPublications = getAllPublications(data);
const initialDates = getPublicationDates(initialPublications);
console.log(`initialPublications`, initialPublications);

export const Timeline = () => {
  const companiesOptions = getCompaniesOptions(data);

  const [timelineData, setTimelineData] = useState({
    value: 0,
    previous: 0
  });
  const [values, setValues] = useState(initialDates);
  const [companyPublications, setCompanyPublications] = useState(initialPublications);
  const [publication, setPublication] = useState({});
  const [selectedOption, setSelectedOption] = useState(companiesOptions[0]);
  const [selectedCompany, setSelectedCompany] = useState("");

  let formatedDated = publication?.dateAt && dayjs(publication.dateAt).format("-MMM D, YYYY");

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
  }, [companyPublications]);

  useEffect(() => {
    newPublications();
  }, [companyPublications, selectedCompany]);

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
  return (
    <div>
      <SelectorContainer>
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
          />
        </LineContainer>
        <Center>
          {publication?.company && <h3>{publication?.company}</h3>}
          {/* <time>{formatedDated}</time> */}
          <h4>{publication?.title}</h4>
          <p>{publication?.content}</p>
        </Center>
      </TimelineContainer>
    </div>
  );
};
