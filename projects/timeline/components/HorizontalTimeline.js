import { useState, useEffect } from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import {
  Center,
  LabelCompanies,
  TimelineContainer,
  SelectorContainer,
  LineContainer
} from "../timeline.style";
import data from "../timeline.data";
import { dateDefaults, publicationDefault } from "../initial.data";
import { CustomSelect } from "@components/select/select";
import { getCompaniesOptions } from "./utils";
import dayjs from "dayjs";

const SELECT_WIDTH = 270;

export const Timeline = () => {
  const companiesOptions = getCompaniesOptions(data);
  const [timelineData, setTimelineData] = useState({
    value: 0,
    previous: 0
  });
  const [values, setValues] = useState(dateDefaults);
  const [publication, setPublication] = useState({});
  const [companyPublications, setCompanyPublications] = useState(publicationDefault);
  const [idDateOnTimeline, setIdDateOnTimeline] = useState("1");
  const [selectedOption, setSelectedOption] = useState(companiesOptions[0]);
  const [selectedCompany, setSelectedCompany] = useState(companiesOptions[0].label);

  const formatedDated = publication?.dateAt && dayjs(publication.dateAt).format("-MMM D, YYYY");
  const getPublications = () => {
    data.map((item) => {
      const { company, publications } = item;
      if (selectedCompany === company) {
        setCompanyPublications(publications);
      }
    });
  };

  const getPublicationDates = () => {
    setValues(
      companyPublications.map((item) => {
        return item.dateAt;
      })
    );
  };

  const getPublicationContentAndLink = () => {
    companyPublications.map((pub) => {
      if (pub.id === idDateOnTimeline) {
        setPublication(pub);
      }
    });
  };

  useEffect(() => {
    getPublicationDates();
    setTimelineData({ value: 0, previous: 0 });
  }, [companyPublications]);

  useEffect(() => {
    getPublications();
  }, [companyPublications, selectedCompany]);

  useEffect(() => {
    getPublicationContentAndLink();
  }, [companyPublications, idDateOnTimeline]);

  const onChangeCallback = React.useCallback((option) => {
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
              setIdDateOnTimeline(JSON.stringify(index + 1));
            }}
            isTouchEnabled
            values={values}
          />
        </LineContainer>
        <Center>
          <h2>{selectedCompany}</h2>
          <time>{formatedDated}</time>
          <p>{publication?.content}</p>
        </Center>
      </TimelineContainer>
    </div>
  );
};
