import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postUser } from "../utils/postUser";

const Join = () => {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    hobby: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 입력 값 변경 시 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setError("");
  };

  const validateUsername = (username: string) => {
    if (username.trim() === "") {
      return "사용자 이름을 입력해주세요.";
    }
    if (username.length > 8) {
      return "사용자 이름은 8자 이하여야 합니다.";
    }
    return "";
  };

  const validatePassword = () => {
    const { password, confirmPassword } = inputValue;
    if (password === "" || confirmPassword === "")
      return "비밀번호를 입력해주세요.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return "";
  };

  // NextBtn 클릭 시 페이지 이동
  const handleNextClick = async () => {
    if (step === 1) {
      const validationError = validateUsername(inputValue.username);
      if (validationError) return setError(validationError);
      localStorage.setItem("username", inputValue.username);
      setStep(step + 1);
    } else if (step === 2) {
      const validationError = validatePassword();
      if (validationError) return setError(validationError);
      localStorage.setItem("password", inputValue.password);
      setStep(step + 1);
    } else if (step === 3) {
      if (inputValue.hobby === "") return setError("취미를 입력해주세요.");
      localStorage.setItem("hobby", inputValue.hobby);

      try {
        const response = await postUser({
          name: inputValue.username,
          password: inputValue.password,
          hobby: inputValue.hobby,
          passwordCheck: inputValue.confirmPassword,
        });
        const memberNo = response.no;

        alert(`회원가입 성공! 회원번호: ${memberNo}`);
        navigate("/");
      } catch (err: any) {
        console.log(error);
        alert(err.message);
      }
    }
  };

  return (
    <JoinWrap>
      <JoinBox>
        <h2>회원가입</h2>

        {step === 1 && (
          <>
            <h4>이름</h4>
            <Input
              name="username"
              placeholder="사용자 이름을 입력해주세요"
              onChange={handleChange}
              value={inputValue.username}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h4>비밀번호</h4>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
              value={inputValue.password}
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleChange}
              value={inputValue.confirmPassword}
            />
          </>
        )}

        {step === 3 && (
          <>
            <h4>취미</h4>
            <Input
              name="hobby"
              placeholder="취미를 입력해주세요"
              onChange={handleChange}
              value={inputValue.hobby}
            />
          </>
        )}

        <Error>{error}</Error>
        <NextBtn
          isFilled={
            inputValue[
              step === 1 ? "username" : step === 2 ? "password" : "hobby"
            ] !== ""
          }
          onClick={handleNextClick}
        >
          {step < 3 ? "다음" : "회원가입"}
        </NextBtn>
        <p>
          이미 회원이신가요? <a onClick={() => navigate("/")}>로그인</a>
        </p>
      </JoinBox>
    </JoinWrap>
  );
};

const JoinWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const JoinBox = styled.div`
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

const Error = styled.div`
  color: red;
  font-size: ${(props) => props.theme.fonts.sm};
  margin-bottom: 1rem;
`;

interface NextBtnProps {
  isFilled: boolean;
}

const NextBtn = styled.button<NextBtnProps>`
  width: 100%;
  padding: 0.8rem;
  background-color: ${({ isFilled, theme }) =>
    isFilled ? theme.colors.lightGreen : theme.colors.buttonGray};
  color: white;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fonts.sm};
  transition: background-color 0.3s ease;
  cursor: ${({ isFilled }) => (isFilled ? "pointer" : "default")};
`;

export default Join;
