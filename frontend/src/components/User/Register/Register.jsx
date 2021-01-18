import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "components/User/UserSlice";
import { useDispatch } from "react-redux";

const PageContainer = styled.div`
  padding-top: 10px;
`;

const PageTitle = styled.div`
  font-size: 30px;
  padding-bottom: 10px;
  padding-left: 100px;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.div`
  font-size: 30px;
  padding-bottom: 10px;
`;

const FormContainer = styled.div`
  justify-content: flex-start;
  width: 14%;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 5px;
    border: 2px solid #e3e3e3;
    :focus {
      outline: 2px solid #9da631;
      border: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
const SubmitButton = styled.div`
  background-color: #9da631;
  border: none;
  border-radius: 2px;
  padding: 8px 10px 8px 10px;
  color: white;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  :focus {
    outline: none;
    border: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9da631;
  font-weight: bold;
`;

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleUserInfoChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(registerUser(userInfo));
  };

  return (
    <PageContainer>
      <PageTitle>Consistency</PageTitle>
      <RegisterContainer>
        <FormTitle>Register</FormTitle>
        <FormContainer>
          <InputSection>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              maxLength="25"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              maxLength="25"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              maxLength="50"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              placeholder="Confirm Password"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Register
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
        <div>
          Already have an account?{" "}
          <StyledLink to="/signin">Login Here</StyledLink>
        </div>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;
