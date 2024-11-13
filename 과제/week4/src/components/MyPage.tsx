import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { otherUserHobby } from "../utils/otherUserHobby";
import useMyHobby from "../hooks/useMyHobby";
import useMyInfo from "../hooks/useMyInfo";

const MyPage = () => {
  const [menu, setMenu] = useState("hobby");
  const [userNumber, setUserNumber] = useState("");
  const [searchHobby, setSearchHobby] = useState("");
  const {
    newPassword,
    newHobby,
    setNewPassword,
    setNewHobby,
    handleUpdateInfo,
  } = useMyInfo();
  const myHobby = useMyHobby();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!userNumber) {
      alert("사용자 번호를 입력해주세요.");
      return;
    }

    try {
      const hobby = await otherUserHobby(Number(userNumber));
      setSearchHobby(hobby || "취미를 찾을 수 없습니다.");
    } catch {
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Header>
        <Title>마이페이지</Title>
        <Nav>
          <NavItem onClick={() => setMenu("hobby")}>취미</NavItem>
          <NavItem onClick={() => setMenu("info")}>내 정보</NavItem>
        </Nav>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>

      {menu === "hobby" ? (
        <HobbyBox>
          <SectionTitle>취미</SectionTitle>
          <SubTitle>나의 취미</SubTitle>
          <HobbyText>{myHobby || "취미가 없습니다."}</HobbyText>

          <SubTitle>다른 사람들의 취미</SubTitle>
          <Input
            id="otherHobby"
            placeholder="사용자 번호"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
          />
          <SearchBtn onClick={handleSearch}>검색</SearchBtn>
          {searchHobby && (
            <ResultBox>
              {userNumber}번 사용자의 취미: {searchHobby}
            </ResultBox>
          )}
        </HobbyBox>
      ) : (
        <UserInfoBox>
          <InfoTitle>내 정보 수정하기</InfoTitle>
          <Label>새 비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Label>새 취미</Label>
          <Input
            id="newHobby"
            placeholder="새로운 취미"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
          />
          <EditBtn onClick={handleUpdateInfo}>수정하기</EditBtn>
        </UserInfoBox>
      )}
    </>
  );
};

const Header = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 2rem;
  background-color: ${(props) => props.theme.colors.header};
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fonts.lg};
  font-weight: bold;
  color: white;
  justify-self: center;
`;

const Nav = styled.nav`
  display: flex;
  padding: 0 2rem;
  gap: 1rem;
  justify-self: start;
`;

const NavItem = styled.p`
  cursor: pointer;
  color: white;
  font-size: ${(props) => props.theme.fonts.md};
  &:hover {
    font-weight: bold;
  }
`;

const LogoutButton = styled.button`
  color: white;
  font-size: ${(props) => props.theme.fonts.md};
  background: none;
  cursor: pointer;
  justify-self: end;
  &:hover {
    font-weight: bold;
  }
`;

const HobbyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 2rem auto;
  font-size: ${(props) => props.theme.fonts.md};
  font-weight: bold;

  p {
    color: ${(props) => props.theme.colors.fontBrown};
  }
`;

const SectionTitle = styled.h4`
  color: black;
  font-size: ${(props) => props.theme.fonts.lg};
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h4`
  align-self: flex-start;
  color: black;
  font-size: ${(props) => props.theme.fonts.md};
  margin-bottom: 0.5rem;
`;

const HobbyText = styled.p`
  align-self: flex-start;
  font-size: ${(props) => props.theme.fonts.sm};
  color: ${(props) => props.theme.colors.fontBrown};
`;

const SearchBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fonts.sm};
  &:hover {
    background-color: ${(props) => props.theme.colors.brown};
  }
`;

const ResultBox = styled.div`
  margin-top: 1.5rem;
  color: ${(props) => props.theme.colors.fontBrown};
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 2rem auto;
  font-size: ${(props) => props.theme.fonts.md};
  font-weight: bold;
`;

const InfoTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: ${(props) => props.theme.fonts.lg};
  font-weight: bold;
  color: black;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-bottom: 0.5rem;
  color: black;
`;

const Input = styled.input`
  width: 93%;
  padding: 1rem;

  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const EditBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: black;
  background-color: ${(props) => props.theme.colors.buttonGray};
  color: white;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fonts.sm};
  &:hover {
    background-color: black;
  }
`;

export default MyPage;
