import styled from "styled-components";

const Login = () => {
  return (
    <LoginWrap>
      <LoginBox>
        <p>로그인</p>
        <Input placeholder="아이디" />
        <Input type="password" placeholder="비밀번호" />
        <LoginBtn>로그인</LoginBtn>
        <SignupLink>회원가입</SignupLink>
      </LoginBox>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  p {
    margin-bottom: 1.5rem;
    font-size: ${(props) => props.theme.fonts.lg};
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 91%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fonts.sm};
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: ${(props) => props.theme.colors.lightGreen};
  color: white;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fonts.sm};
  &:hover {
    background-color: ${(props) => props.theme.colors.brown};
  }
`;

const SignupLink = styled.a`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.fontGray};
  font-size: ${(props) => props.theme.fonts.sm};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: black;
  }
`;

export default Login;
