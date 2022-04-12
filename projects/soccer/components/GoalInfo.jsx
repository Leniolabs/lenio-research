import {
    Paragraph,
    SmallParagraph,
    Subtitle,
    Title,
} from "../soccer.style";
import { CountryFlag } from 'utils/getCountryInfo';
import YoutubeViewer from "@components/YoutubeViewer";
const getGoalType = (type) => {
    switch (type) {
        case "W":
            return "Own Goal";
        case "P":
            return "Penalty";
        case "G":
        default:
            return "Goal";
    }
}
const WorldCupVideoIds = {
    '1998': 'mZG8bXRMo44',
    '2002': 'FmclgfjVyrg',
    '2006': 'Qtlcbodym4w',
    '2010': 'vnUbVx-TSVE',
    '2014': '5vXKNj4K0W4',
}
const GoalInfo = ({ goal }) => {
    return (<>
        <Title>
            <SmallParagraph style={{ margin: 0 }}>{goal['Datetime']}</SmallParagraph>
            {goal['Home Team Name']} vs {goal["Away Team Name"]}
        </Title>
        <Subtitle>
            <CountryFlag countryName={goal['Home Team Name']} />
            &nbsp;{goal['Home Team Goals']} - {goal["Away Team Goals"]}&nbsp;
            <CountryFlag countryName={goal['Away Team Name']} />
        </Subtitle>
        <Paragraph>Type: {getGoalType(goal["GoalType"])}</Paragraph>
        <Paragraph>Stage: {goal["Stage"]}</Paragraph>
        <Paragraph>
            Stadium: <b>{goal["Stadium"]}, {goal['City']}</b>
        </Paragraph>

        {goal['Win Conditions'] && goal['Win Conditions'] !== ' ' && <Paragraph>Win Condition: {goal['Win Conditions']}</Paragraph>}
        <YoutubeViewer videoId={WorldCupVideoIds[goal['Year']]} start={goal['videoStart']} end={goal['videoEnd']} />
        <Paragraph>
            URL:&nbsp;
            <a href={`https://youtu.be/${WorldCupVideoIds[goal['Year']]}`} rel="noopener noreferrer" target="_blank">
                https://youtu.be/{WorldCupVideoIds[goal['Year']]}
            </a>
        </Paragraph>
    </>)
}
export default GoalInfo