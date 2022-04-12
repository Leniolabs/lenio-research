import styled from "styled-components";
import PropTypes from "prop-types";

const GoalDot = styled.circle`
    opacity: ${props => props.isActive ? 1 : 0.6};
    r: ${props => props.isActive ? 7 : 5};
`
const GoalLine = styled.line`
    stroke-dasharray: ${props => props.isActive ? "5, 10" : "5, 20"};
    stroke: ${props => props.isActive ? "yellow" : "black"};
    stroke-width: ${props => props.isActive ? "5" : "2"};
    stroke-linecap: round;
    opacity: ${props => props.isActive ? .6 : 0.3};
`
const GoalRecord = ({ received, shot, goal, isActive }) => {
    return (
        <>
            {received.length > 0 && shot.length > 0 && (
                <GoalLine x1={received[0]} x2={shot[0]} y1={received[1]} y2={shot[1]} isActive={isActive}/>
            )}
            {goal.length > 0 && shot.length > 0 && (
                <GoalLine x1={goal[0]} x2={shot[0]} y1={goal[1]} y2={shot[1]} isActive={isActive}/>
            )}
            {received.length > 0 && (
                <GoalDot cx={received[0]} cy={received[1]} fill="blue" isActive={isActive} />
            )}
            {shot.length > 0 && (
                <GoalDot cx={shot[0]} cy={shot[1]} fill="red" isActive={isActive} />
            )}
            {goal.length > 0 && (
                <GoalDot cx={goal[0]} cy={goal[1]} fill="yellow" isActive={isActive} />
            )}
        </>
    )
}
GoalRecord.propTypes = {
    received: PropTypes.array,
    shot: PropTypes.array,
    goal: PropTypes.array,
    isActive: PropTypes.bool
}
GoalRecord.defaultProps = {
    received: [],
    shot: [],
    goal: [],
    isActive: false
}
export default GoalRecord;