import styled from "@emotion/styled";
import "../styles/Header.css";

const Header = ({ menu, setMenu, level, setLevel, time }) => {
  return (
    <HeaderContainer>
      <h2>1 to 50</h2>
      <MenuContainer>
        <Menu active={menu === "game"} onClick={() => setMenu("game")}>
          게임
        </Menu>
        <Menu active={menu === "ranking"} onClick={() => setMenu("ranking")}>
          랭킹
        </Menu>
      </MenuContainer>

      {menu === "game" && (
        <RightContainer>
          <select
            className="level"
            id="level"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            <option value="level1">Level 1</option>
            <option value="level2">Level 2</option>
            <option value="level3">Level 3</option>
          </select>
          <Timer>{time.toFixed(2)}</Timer>{" "}
        </RightContainer>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  align-items: center;
  background-color: ${(props) => props.theme.color.darkgreen};
  color: white;
`;

const MenuContainer = styled.nav`
  display: flex;
  gap: 0.4rem;
`;

const Menu = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? props.theme.color.green : props.theme.color.darkgreen};
`;

const RightContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-left: auto;
`;

const Timer = styled.div`
  display: flex;
  padding: 0.5rem;
  color: white;
  width: 30px; 
`;

export default Header;
