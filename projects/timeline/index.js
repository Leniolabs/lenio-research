/* eslint-disable jsx-a11y/no-onchange */
import * as React from "react";
import Head from "next/head";
import HorizontalTimeline from "react-horizontal-timeline";
import { Center } from "./timeline.style";
import data from "./timeline.data";

export const Index = () => {
  const [test, setTest] = React.useState({
    value: 0,
    previous: 0
  });
  const [values, setValues] = React.useState(["2011/12/04", "2020/06/03"]);
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [companyPublications, setCompanyPublications] = React.useState([]);

  console.log("%c data === >>>", "background: cyan; color: black;", data);

  const companyNames = data.map((item) => {
    const { company, key } = item;
    return { company, key };
  });

  const getPublications = () => {
    data.map((item) => {
      const { company, publications } = item;
      console.log(`company, selectedCompany`, `${company} - ${selectedCompany}`);
      if (selectedCompany === company) {
        setCompanyPublications(publications);
      }
    });
  };

  // const getPublicationsDetails = () => {
  //   companyPublications.map((item) => {
  //     const { content, dateAt, link } = item;
  //     console.log("%c dateAt === >>>", "background: red; color: white;", dateAt);
  //     setValues([...dateAt]);
  //   });
  // };

  React.useEffect(() => {
    getPublications();
  }, [companyPublications, selectedCompany]);

  // React.useEffect(() => {
  //   getPublicationsDetails();
  // }, [values, selectedCompany]);

  // console.log(
  //   "%c companyPublications === >>>",
  //   "background: yellow; color: black;",
  //   companyPublications
  // );

  return (
    <>
      <Head></Head>
      <div>
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
        <div style={{ width: "80%", height: "350px", margin: "0 auto" }}>
          <HorizontalTimeline
            index={test.value}
            indexClick={(index) => {
              setTest({ value: index, previous: test.value });
            }}
            values={values}
          />
        </div>
        <Center>
          <h2>{selectedCompany}</h2>
        </Center>
      </div>
    </>
  );
};

export default Index;
