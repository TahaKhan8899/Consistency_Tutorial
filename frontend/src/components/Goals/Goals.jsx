import React from "react";
import styled from "styled-components";

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
  const AllGoals = [
    { id: 0, name: "lose weight" },
    { id: 1, name: "goal 1" },
    { id: 2, name: "goal 2" },
    { id: 3, name: "goal 3" },
  ];
  return (
    <GoalsContainer>
      <GoalsHeader>
        <TitleSection>goals</TitleSection>
        <AddGoalButton>
          <img src="images/add.png" alt="add-goal-btn" />
          add a goal
        </AddGoalButton>
      </GoalsHeader>
      {AllGoals.map((goal, indx) => (
        <GoalRow key={`goal-number-` + indx}>
          <Name>{goal.name}</Name>
          <Action>
            <img src="images/edit.png" alt="edit-btn" />
            <img src="images/delete.png" alt="delete-btn" />
          </Action>
        </GoalRow>
      ))}
    </GoalsContainer>
  );
};

export default Goals;
