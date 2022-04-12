import React, { useState, useCallback, useEffect, Fragment } from "react";
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
import GoalInfo from "./GoalInfo";

export const information = ["received", "shot", "goal"];
export const getNextInformation = (info, goBack = false) => {
  const index = information.indexOf(info);
  if (index === -1) return information[0]
  if (goBack) {
    if (index === 0) return information[information.length - 1]
    return information[index - 1]
  } else {
    if (index === information.length - 1) return information[0]
    return information[index + 1]
  }
}
export const GoalViewer = () => {
  const [goal, setGoal] = useState({});
  const [secretWord, setSecretWord] = useState("laArepaEsVenezolana26");
  const [field, setField] = useState("received");
  const [searchGoal, setSearchGoal] = useState("");
  const [goalRecords, setGoalRecords] = useState([]);

  const getGoal = async (endpoint, tok = null) => {
    if (!secretWord) {
      alert("Please enter a valid secret word");
    }
    if (secretWord) {
      const token = tok ?? jwt.sign({ payload: {} }, secretWord);
      await fetch(`http://localhost:8000/${endpoint}`, {
        method: "GET",
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
  const getGoalById = async (goalId) => {
    if(goalId < 1 || goalId > goalRecords.length) {
      alert("Can't find goal with id: " + goalId);
    } else {
      getGoal(`world/getId/${goalId}`)
    }
  }
  const updateGoal = async ({id, shot, received, goal}) => {
    setGoalRecords(records => {
      return records.map(record => {
        if (record.id === id) {
          return {
            ...record,
            shot,
            received,
            goal,
          };
        }
        return record;
      });
    })
  };
  const onSaveGoal = async (attrs) => {
    if (!secretWord) {
      alert("Please enter a valid secret word");
    }
    if (secretWord) {
      const updatedGoal = {
        ...goal,
        ...attrs
      }
      const token = jwt.sign({
        payload: updatedGoal
      }, secretWord);
      await fetch(`http://localhost:8000/world/update/${goal.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(updatedGoal)
      })
        .then((response) => response.json())
        .catch(() => {
          alert("Error: please contact administrator");
        });
      updateGoal(updatedGoal);
      await getGoal("world/latest-to-fill", token);
    }
  };

  useEffect(() => {
    async function getGoals() {
      if (!secretWord) {
        alert("Please enter a valid secret word");
      }
      if (secretWord) {
        const token = jwt.sign({ payload: {} }, secretWord);
        await fetch(`http://localhost:8000/world/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && Object.keys(data).length > 0) {
              setGoalRecords(data);
            }
          })
          .catch(() => {
            alert("Error: please contact administrator");
          });
      }
    }
    getGoals();
    getGoal('world/latest-to-fill');
  }, [])
  return (
    <Fragment>
      <div style={{ gridArea: "field" }}>
        <SoccerField onSave={(coords) => onSaveGoal(coords)} onGetGoal={getGoalById} setField={setField} field={field} goal={goal} recordedGoals={goalRecords} />
      </div>
      <div style={{ gridArea: "data", maxWidth: 400 }}>
        {Object.keys(goal).length && (
          <GoalInfo goal={goal} />
        )}
        <LabelContainer>
          <label htmlFor={"word-secret"}>
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
              getGoal(searchGoal ? `world/getId/${searchGoal}` : "world/latest-to-fill")
            }>
            {searchGoal ? "Search" : "Get latest to fill"}
          </ButtonGetLatest>
          <Form>
            <LabelSearch htmlFor={"search"}>
              or search for goal #
              <Input
                onChange={({ target: { value } }) => {
                  setSearchGoal(value)
                  getGoal(`world/getId/${value}`)
                }}
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
