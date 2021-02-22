import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { signinUser, resetSigninState } from "components/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const PageContainer = styled.div`
  padding-top: 10px;
`;

const PageTitle = styled.div`
  font-size: 30px;
  padding-bottom: 10px;
  padding-left: 100px;
`;

const SigninContainer = styled.div`
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

const ErrorSection = styled.div`
  color: red;
`;

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const userState = useSelector((state) => state.user);
  const { error } = userState.signinState;
  const { loggedInUser } = userState;

  const handleUserInfoChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signinUser(userInfo));
  };

  const history = useHistory();

  useEffect(() => {
    if (loggedInUser) {
      // redirect
      history.push("/habits");
    }
  }, [loggedInUser, history]);

  const findError = (sectionName) => {
    const errorObj = error.find((err) => err.param === sectionName);
    return errorObj ? errorObj.msg : null;
  };

  const handleResetState = () => {
    dispatch(resetSigninState());
  };

  return (
    <PageContainer>
      <PageTitle>Consistency</PageTitle>
      <SigninContainer>
        <FormTitle>Sign-in</FormTitle>
        {error && <ErrorSection>{findError("userNotFound")}</ErrorSection>}
        <FormContainer>
          <InputSection>
            <label htmlFor="email">Email</label>
            {error && <ErrorSection>{findError("email")}</ErrorSection>}
            <input
              type="text"
              id="email"
              placeholder="Email"
              maxLength="100"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <InputSection>
            <label htmlFor="password">Password</label>
            {error && <ErrorSection>{findError("password")}</ErrorSection>}
            <input
              type="password"
              id="password"
              placeholder="Password"
              maxLength="128"
              onChange={handleUserInfoChange}
            />
          </InputSection>
          <ButtonContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>
              Sign-in
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
        <div>
          Don't have an account?{" "}
          <StyledLink to="/register" onClick={handleResetState}>
            Register Here
          </StyledLink>
        </div>
      </SigninContainer>
    </PageContainer>
  );
};

export default Signin;
