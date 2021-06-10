/* eslint-disable jsx-a11y/no-onchange */
import * as React from "react";
import Head from "next/head";
import HorizontalTimeline from "react-horizontal-timeline";
import { Center, LabelCompanies } from "./timeline.style";
import data from "./timeline.data";
import { dateDefaults, publicationDefault } from "./initial.data";

export const Index = () => {
  const [timelineData, setTimelineData] = React.useState({
    value: 0,
    previous: 0
  });
  const [values, setValues] = React.useState(dateDefaults);
  const [contentDetail, setContentDetail] = React.useState("");
  const [linkDetail, setLinkDetail] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [companyPublications, setCompanyPublications] = React.useState(publicationDefault);
  const [idDateOnTimeline, setIdDateOnTimeline] = React.useState("1");

  const companyNames = data.map((item) => {
    const { company, key } = item;
    return { company, key };
  });

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
      const { link, content, id } = pub;

      if (id === idDateOnTimeline) {
        setContentDetail(content);
        setLinkDetail(link);
      }
    });
  };

  React.useEffect(() => {
    getPublicationDates();
    setTimelineData({ value: 0, previous: 0 });
  }, [companyPublications]);

  React.useEffect(() => {
    getPublications();
  }, [companyPublications, selectedCompany]);

  React.useEffect(() => {
    getPublicationContentAndLink();
  }, [companyPublications, idDateOnTimeline]);

  return (
    <>
      <Head></Head>
      <div>
        <LabelCompanies>Companies</LabelCompanies>
        <br />
        <select
          value={companyNames.company}
          onChange={(e) => {
            setSelectedCompany(e.target.value);
          }}>
          {companyNames &&
            companyNames.map(({ company, key }) => (
              <option value={company} key={key}>
                {company}
              </option>
            ))}
        </select>
        {/* Bounding box for the Timeline */}
        <div style={{ width: "80%", height: "530px", margin: "0 auto" }}>
          <HorizontalTimeline
            index={timelineData.value}
            indexClick={(index) => {
              setTimelineData({ value: index, previous: timelineData.value });
              setIdDateOnTimeline(JSON.stringify(index + 1));
            }}
            values={values}
            style={{ marginTop: "90px", background: "#f8f8f8" }}
            minEventPadding={150}
          />
          <Center>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h2>{selectedCompany}</h2>
            </div>
            <br />
            <p>{contentDetail && contentDetail}</p>
            {linkDetail && (
              <a style={{ zIndex: "1000" }} href={linkDetail && linkDetail}>
                More info
              </a>
            )}
          </Center>
        </div>
      </div>
    </>
  );
};

export default Index;
