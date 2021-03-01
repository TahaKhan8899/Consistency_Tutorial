import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "./GoalsSlice";
import { logoutUser } from "components/User/UserSlice";
import AddGoalButton from "./AddGoalButton";

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

const ErrorSection = styled.div`
  color: red;
`;

const Goals = () => {
  const dispatch = useDispatch();

  const goalState = useSelector((state) => state.goals);
  const { goalsList, loading, error } = goalState;

  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;

  useEffect(() => {
    if (loggedInUser) {
      const userInfo = { token: loggedInUser.token };
      dispatch(getGoals(userInfo));
    }
    if (error && error[0].param === "auth error") {
      dispatch(logoutUser());
    }
  }, [dispatch, loggedInUser, error]);

  return (
    <GoalsContainer>
      {error && <ErrorSection>{error[0].msg}</ErrorSection>}
      {loading === "pending" ? (
        <div>Loading...</div>
      ) : (
        <>
          <GoalsHeader>
            <TitleSection>goals</TitleSection>
            <AddGoalButton />
          </GoalsHeader>
          {goalsList &&
            goalsList.map((goal) => (
              <GoalRow key={`goal-number-` + goal.id}>
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
