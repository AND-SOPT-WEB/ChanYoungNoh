import { useState } from "react";
import styled from "@emotion/styled";

const ProfileCard = ({ name, englishName, github }) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <CardContainer>
        <h2>{name}</h2>
        <div>{englishName}</div>
        <div>{github}</div>
        <div>
          {count}
          <LikeButton onClick={() => setCount((count) => count + 1)}>
            Like
          </LikeButton>
        </div>
      </CardContainer>
    </>
  );
};

const CardContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  border-radius: 10px;
  font-weight: 500;
`;

const LikeButton = styled.button`
  padding: 2%;
  margin: 10px 0 10px 10px;
  background-color: lightblue;
  color: white;
`;

export default ProfileCard;
