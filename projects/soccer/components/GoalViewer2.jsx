import * as React from "react";
import PropTypes from "prop-types";
import {
  Paragraph,
  SoccerContainer,
  ChartTitle,
  Subtitle,
  Title,
  GridInformation,
  SmallParagraph,
  URLContainer,
  Button,
  Form,
  Input
} from "../soccer.style";
import { SoccerField } from "./SoccerField";

export const GoalViewer = ({ goal, idx, onSave, setGoalIdx }) => {
  const [innerGoal, setInnerGoal] = React.useState(goal);
  const [field, setField] = React.useState("received");
  const [search, setSearch] = React.useState("");
  const jsonData = JSON.stringify(innerGoal, undefined, 2);
  const information = ["received", "shot"];
  React.useEffect(() => {
    setInnerGoal(goal);
    setField("received");
  }, [goal]);

  const onChange = React.useCallback(
    (coords) => {
      setInnerGoal({
        ...innerGoal,
        [field]: coords
      });
      setField("shot");
    },
    [field, innerGoal]
  );

  const onInputChange = React.useCallback(
    (value) => {
      setInnerGoal({
        ...innerGoal,
        url: value
      });
    },
    [innerGoal]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoalIdx(parseInt(search) - 1);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <SoccerContainer>
      <div style={{ gridArea: "field" }}>
        <SoccerField onClick={(coords) => onChange(coords)} />
      </div>
      <div>
        {innerGoal && (
          <>
            <Title>
              #{parseInt(idx) + 1} | {innerGoal.Date}
            </Title>
            <Subtitle style={{ textAlign: "start" }}>Minute {innerGoal.Minute}</Subtitle>
            <Paragraph>
              <b>{innerGoal["Home team"]}</b> vs. {innerGoal["Away team"]}
            </Paragraph>
            <Paragraph>
              Final game result for FC Barcelona: <b>{innerGoal["Final Game Result"]}</b>
            </Paragraph>
            <GridInformation>
              {information.map((info) => (
                <div key={info}>
                  <ChartTitle>{info}:</ChartTitle>
                  {innerGoal[info] ? (
                    <>
                      {innerGoal[info].map((goal) => (
                        <SmallParagraph key={goal}>{goal}</SmallParagraph>
                      ))}
                    </>
                  ) : (
                    <SmallParagraph style={{ fontStyle: "italic" }}>
                      Missing information
                    </SmallParagraph>
                  )}
                </div>
              ))}
            </GridInformation>
          </>
        )}
        <URLContainer>
          <label htmlFor={"url"}>URL: </label>
          <input
            name="url"
            style={{ width: "55%" }}
            onChange={(event) => onInputChange(event.target.value)}
            value={innerGoal.url}></input>
        </URLContainer>
        <Button onClick={() => onSave(innerGoal, idx)}>Next</Button>
        <Form onSubmit={handleSubmit}>
          <label>
            or search for goal #
            <Input onChange={handleSearch} value={search} type="number" id="search" name="search" />
          </label>
        </Form>
      </div>
    </SoccerContainer>
  );
};

GoalViewer.propTypes = {
  goal: PropTypes.any,
  idx: PropTypes.number,
  onSave: PropTypes.func,
  setGoalIdx: PropTypes.func
};
