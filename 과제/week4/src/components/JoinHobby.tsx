import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hobby = () => {
  const [hobby, setHobby] = useState("");
  const navigate = useNavigate();

  // 입력 값 변경 시 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobby(e.target.value);
  };

  // JoinBtn 클릭 시 페이지 이동
  const handleBtnClick = () => {
    if (hobby !== "") {
      localStorage.setItem("hobby", hobby);

      navigate("/");
    }
  };

  // 로그인 링크 클릭 시 페이지 이동
  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <JoinWrap>
      <JoinBox>
        <h2>회원가입</h2>
        <h4>취미</h4>
        <Input
          id="hobby"
          placeholder="취미를 입력해주세요"
          onChange={handleChange}
          value={hobby}
        />
        {/* 입력값이 존재할 때만 버튼 색상 변경 */}
        <JoinBtn isFilled={hobby !== ""} onClick={handleBtnClick}>
          회원가입
        </JoinBtn>
        <p>
          이미 회원이신가요? <a onClick={handleLoginClick}>로그인</a>
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

interface JoinBtnProps {
  isFilled: boolean;
}

const JoinBtn = styled.button<JoinBtnProps>`
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

export default Hobby;
