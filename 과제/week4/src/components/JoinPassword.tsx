import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // 비밀번호 입력 값 변경 시 상태 업데이트
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 비밀번호 확인 입력 값 변경 시 상태 업데이트
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  //두 입력값이 모두 채워져 있고 일치할 때만 버튼 활성화
  const isButtonEnabled =
    password !== "" && confirmPassword !== "" && password === confirmPassword;

  const handleNextClick = () => {
    if (isButtonEnabled) {
      navigate("/join/hobby");
    }
  };

  // 로그인 링크 클릭 시 페이지 이동
  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <PasswordWrap>
      <PasswordBox>
        <h2>회원가입</h2>
        <h4>비밀번호</h4>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handlePasswordChange}
          value={password}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
        />
        {/* 입력값이 모두 채워지고 일치할 때만 버튼 활성화 */}
        <NextBtn isFilled={isButtonEnabled} onClick={handleNextClick}>
          다음
        </NextBtn>
        <p>
          이미 회원이신가요? <a onClick={handleLoginClick}>로그인</a>
        </p>
      </PasswordBox>
    </PasswordWrap>
  );
};

const PasswordWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  h4 {
    font-size: ${(props) => props.theme.fonts.md};
    font-weight: 500;
    align-self: flex-start;
  }
  p {
    font-size: ${(props) => props.theme.fonts.sm};
    font-weight: 500;
  }
  a {
    font-size: ${(props) => props.theme.fonts.sm};
    color: ${(props) => props.theme.colors.fontBrown};
    font-weight: 500;
    cursor: pointer;
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

interface NextBtnProps {
  isFilled: boolean;
}

const NextBtn = styled.button<NextBtnProps>`
  width: 100%;
  padding: 0.8rem;
  background-color: ${(props) =>
    props.isFilled
      ? props.theme.colors.lightGreen
      : props.theme.colors.buttonGray};
  color: white;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fonts.sm};
  transition: background-color 0.3s ease;
  cursor: ${(props) => (props.isFilled ? "pointer" : "default")};
`;

export default JoinPassword;
