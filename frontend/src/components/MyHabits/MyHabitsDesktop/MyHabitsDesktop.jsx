import React from "react";
import styled from "styled-components";
import Goals from "components/Goals";
import { logoutUser } from "components/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const GridContainer = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-areas:
    "nav"
    "main";
  grid-template-columns: 30% 70%;
  grid-template-rows: 1fr;
`;
const NavContainer = styled.div`
  grid-area: "nav";
  padding-top: 10px;
  padding-left: 100px;
  background-color: #e3e3e3;
`;
const MainContainer = styled.div`
  grid-area: "main";
  padding-top: 10px;
  padding-right: 100px;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 100px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const HeaderItem = styled.div`
  padding-right: 50px;
  :last-child {
    padding: 0;
  }
  font-size: 22px;
`;

const SignoutButton = styled.button`
  background-color: #9da631;
  border: none;
  border-radius: 2px;
  padding: 10px 12px 10px 12px;
  color: white;
  :hover {
    cursor: pointer;
  }
`;

const MyHabitsDesktop = () => {
  const userState = useSelector((state) => state.user);
  const { loggedInUser } = userState;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <GridContainer>
      <NavContainer>
        <Title>Consistency</Title>
        <Goals />
      </NavContainer>
      <MainContainer>
        <HeaderContainer>
          <HeaderItem>My Habits</HeaderItem>
          <HeaderItem>History</HeaderItem>
          <HeaderItem>Hi {loggedInUser && loggedInUser.firstname}</HeaderItem>
          <HeaderItem>
            {loggedInUser && (
              <SignoutButton onClick={() => handleLogout()}>
                Sign Out
              </SignoutButton>
            )}
          </HeaderItem>
        </HeaderContainer>
      </MainContainer>
    </GridContainer>
  );
};

export default MyHabitsDesktop;
