import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "./GoalsSlice";

const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 45px;
`;
const GoalsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
`;
const TitleSection = styled.div`
  text-transform: uppercase;
  letter-spacing: 8px;
  font-size: 30px;
`;
const AddGoalButton = styled.div`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  img {
    max-width: 16px;
    margin-right: 8px;
  }
`;
const GoalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
  :last-child {
    margin-bottom: 0;
  }
`;
const Name = styled.div`
  text-transform: uppercase;
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  img {
    max-width: 20px;
    margin-right: 8px;
    :last-child {
      margin: 0;
    }
  }
`;

const Goals = () => {
  const dispatch = useDispatch();

  const goalState = useSelector((state) => state.goals);
  const { goalsList, loading, error } = goalState;

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <GoalsContainer>
      {error && <div>Error fetching goals</div>}
      {loading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <>
          <GoalsHeader>
            <TitleSection>goals</TitleSection>
            <AddGoalButton>
              <img src="images/add.png" alt="add-goal-btn" />
              add a goal
            </AddGoalButton>
          </GoalsHeader>
          {goalsList &&
            goalsList.map((goal, indx) => (
              <GoalRow key={`goal-number-` + indx}>
                <Name>{goal.name}</Name>
                <Action>
                  <img src="images/edit.png" alt="edit-btn" />
                  <img src="images/delete.png" alt="delete-btn" />
                </Action>
              </GoalRow>
            ))}
        </>
      )}
    </GoalsContainer>
  );
};

export default Goals;
