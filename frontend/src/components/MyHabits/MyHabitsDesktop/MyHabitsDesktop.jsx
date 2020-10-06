import React from "react";
import styled from "styled-components";

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

const MyHabitsDesktop = () => {
  return (
    <GridContainer>
      <NavContainer>
        <Title>Consistency</Title>
      </NavContainer>
      <MainContainer>
        <HeaderContainer>
          <HeaderItem>My Habits</HeaderItem>
          <HeaderItem>History</HeaderItem>
          <HeaderItem>Hi Taha</HeaderItem>
        </HeaderContainer>
      </MainContainer>
    </GridContainer>
  );
};

export default MyHabitsDesktop;
