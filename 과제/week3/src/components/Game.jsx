import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Modal from "./SuccessModal";
import generateUniqueRandomArray from "../utils/generateUniqueRandomArray";

const GameContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  gap: 0.5rem;
  margin-top: 2rem;
`;

const NumberButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.theme.color.darkgreen};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  &:active {
    opacity: 0.6;
  }
`;

const Placeholder = styled.div`
  width: 3rem;
  height: 3rem;
  visibility: hidden;
`;

const levels = {
  level1: { size: 3, maxNum: 18 },
  level2: { size: 4, maxNum: 32 },
  level3: { size: 5, maxNum: 50 },
};

const Game = ({ level, time, setTime, running, setRunning }) => {
  const [frontNum, setFrontNum] = useState([]);
  const [backNum, setBackNum] = useState([]);
  const [nextNum, setNextNum] = useState(1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    resetGame();
  }, [level]); // level이 변경될 때마다 게임 리셋

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => setTime((prev) => prev + 0.01), 10);
    } else if (time > 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const resetGame = () => {
    const { size, maxNum } = levels[level];
    const halfMax = Math.floor(maxNum / 2);

    const initialFrontNum = generateUniqueRandomArray(1, halfMax, size * size);
    const initialBackNum = generateUniqueRandomArray(
      halfMax + 1,
      maxNum,
      size * size
    );

    setFrontNum(initialFrontNum);
    setBackNum(initialBackNum);
    setNextNum(1);
    setTime(0);
    setRunning(false);
    setFinished(false);
  };

  const handleNumberClick = (num, index) => {
    if (num === nextNum) {
      if (num === 1) setRunning(true);
      if (num === levels[level].maxNum) {
        setRunning(false);
        setFinished(true);
        saveGameData();
      } else {
        setNextNum(num + 1);

        setFrontNum((prev) =>
          prev.map((n, i) => {
            if (i === index) {
              return num > Math.floor(levels[level].maxNum / 2)
                ? ""
                : backNum[index];
            }
            return n;
          })
        );
      }
    }
  };

  const saveGameData = () => {
    const now = new Date();
    const playTime = time.toFixed(2);
    const gameData = {
      date: now.toLocaleString(),
      level,
      playTime,
    };
    const savedData = JSON.parse(localStorage.getItem("rankingData")) || [];
    savedData.push(gameData);
    localStorage.setItem("rankingData", JSON.stringify(savedData));
  };

  return (
    <GameContainer>
      <h2>다음 숫자: {nextNum}</h2>
      <GridContainer size={levels[level].size}>
        {frontNum.map((num, index) =>
          num === "" ? (
            <Placeholder key={index} />
          ) : (
            <NumberButton
              key={index}
              onClick={() => handleNumberClick(num, index)}
            >
              {num}
            </NumberButton>
          )
        )}
      </GridContainer>
      {finished && (
        <Modal onClose={resetGame}>
          <b>게임 끝!</b> 기록: {time.toFixed(2)}초
        </Modal>
      )}
    </GameContainer>
  );
};

export default Game;
