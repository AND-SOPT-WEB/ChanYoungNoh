import "./App.css";
import styled from "@emotion/styled";
import Card from "./components/ProfileCard";
import { members } from "../utils/data";

function App() {
  return (
    <>
      <h1>3주차 세미나 실습 - React</h1>
      <CardContainer>
        {members.map((member) => {
          return (
            <Card
              key={member.id}
              name={member.name}
              englishName={member.englishName}
              github={member.github}
            ></Card>
          );
        })}
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default App;
