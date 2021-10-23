import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Paragraph,
  ChartTitle,
  Subtitle,
  Title,
  GridInformation,
  SmallParagraph,
  Button,
  Input,
  GetContainer,
  ButtonGetLatest,
  LabelSearch,
  LabelContainer,
  Form
} from "../soccer.style";
import { SoccerField } from "./SoccerField";
import jwt from "jsonwebtoken";

export const GoalViewer = () => {
  const [goal, setGoal] = useState({});

  const [secretWord, setSecretWord] = useState("");
  const [field, setField] = useState("received");
  const [searchGoal, setSearchGoal] = useState("");

  const information = ["received", "shot"];

  const getGoal = async (endpoint, method, body = {}) => {
    if (!secretWord) {
      alert("Please enter a valid secret word");
    }
    if (secretWord) {
      const token = jwt.sign({ payload: body }, secretWord);
      await fetch(`${process.env.NEXT_PUBLIC_SOCCER_URL_API}/${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setGoal(data);
            setField(information[0]);
          }
        })
        .catch(() => {
          alert("Error: please contact administrator");
        });
    }
  };

  const onSaveGoal = async () => {
    if (!secretWord) {
      alert("Please enter a valid secret word");
    }
    if (secretWord) {
      const token = jwt.sign({ payload: goal }, secretWord);
      await fetch(`${process.env.NEXT_PUBLIC_SOCCER_URL_API}/messi/update/${goal.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(goal)
      })
        .then((response) => response.json())
        .then(() => {
          getGoal("messi/latest-to-fill");
        })
        .catch(() => {
          alert("Error: please contact administrator");
        });
    }
  };

  const onClickField = useCallback(
    (coords) => {
      setGoal({
        ...goal,
        [field]: coords
      });
      setField("shot");
    },
    [field, goal]
  );

  return (
    <Fragment>
      <div style={{ gridArea: "field" }}>
        <SoccerField onClick={(coords) => onClickField(coords)} field={field} goal={goal} />
      </div>
      <div style={{ gridArea: "data", maxWidth: 400 }}>
        {goal && (
          <>
            <Title>
              #{goal.id ? `${goal.id} |` : "No info"} {goal.Date}
            </Title>
            <Subtitle style={{ textAlign: "start" }}>Minute {goal.Minute}</Subtitle>
            <Paragraph>vs: {goal["Team"]}</Paragraph>
            <Paragraph>Status Game: {goal["PartialStatus"]}</Paragraph>
            <Paragraph>Assist by: {goal["Assist"]}</Paragraph>
            <Paragraph>Type of goal: {goal["Type of goal"]}</Paragraph>
            <Paragraph>Tournament: {goal["Tournament"]}</Paragraph>
            <Paragraph>
              Final game result for FC Barcelona: <b>{goal["Final Result"]}</b>
            </Paragraph>
            <GridInformation>
              {information.map((info) => (
                <div key={info}>
                  <input
                    type="radio"
                    id={info}
                    name={info}
                    checked={info === field}
                    onChange={() => setField(info)}
                  />
                  <ChartTitle onClick={() => setField(info)}>{info}:</ChartTitle>
                  {goal[info] ? (
                    <>
                      {goal[info].map((goal) => (
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
        <Paragraph>
          {`URL: `}
          <a href="https://youtu.be/a1-iff3lh2U" rel="noopener noreferrer" target="_blank">
            https://youtu.be/a1-iff3lh2U
          </a>
        </Paragraph>
        <LabelContainer>
          <label htmlFor={"secret word"}>
            Enter secret word:
            <Input
              onChange={({ target: { value } }) => {
                setSecretWord(value);
              }}
              value={secretWord}
              type="text"
              id="word-secret"
              name="word-secret"
            />
          </label>
        </LabelContainer>
        <GetContainer>
          <ButtonGetLatest
            onClick={() =>
              getGoal(searchGoal ? `messi/getId/${searchGoal}` : "messi/latest-to-fill")
            }>
            {searchGoal ? "Search" : "Get latest to fill"}
          </ButtonGetLatest>
          <Form>
            <LabelSearch htmlFor={"search goal"}>
              or search for goal #
              <Input
                onChange={({ target: { value } }) => setSearchGoal(value)}
                value={searchGoal}
                type="number"
                id="search"
                name="search"
              />
            </LabelSearch>
          </Form>
        </GetContainer>

        <GridInformation>
          <Button onClick={() => onSaveGoal(goal)} disabled={Object.keys(goal).length === 0}>
            Save & Next To Fill
          </Button>
        </GridInformation>
      </div>
    </Fragment>
  );
};

GoalViewer.propTypes = {
  goal: PropTypes.any,
  idx: PropTypes.number,
  onSave: PropTypes.func,
  setGoalIdx: PropTypes.func,
  setSecret: PropTypes.func,
  secret: PropTypes.any
};
