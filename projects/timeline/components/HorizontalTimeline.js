/* eslint-disable jsx-a11y/no-onchange */
import * as React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { Center } from "../timeline.style";
import data from "../timeline.data";

export const HTimeLine = () => {
  const [test, setTest] = React.useState({
    value: 0,
    previous: 0
  });
  const [values, setValues] = React.useState(["2011/12/04", "2020/06/03"]);
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [companyPublications, setCompanyPublications] = React.useState([]);

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

  React.useEffect(() => {
    getPublications();
  }, [companyPublications, selectedCompany]);

  return (
    <>
      <div style={{ height: "400px", background: "#AfAfAF" }}>
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
