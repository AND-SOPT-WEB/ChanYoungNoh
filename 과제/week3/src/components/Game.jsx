import styled from "@emotion/styled";
import "../styles/Game.css";
import { useState, useEffect } from "react";
import Modal from "./SuccessModal";

const levels = {
  level1: { size: 3, maxNum: 18 },
  level2: { size: 4, maxNum: 32 },
  level3: { size: 5, maxNum: 50 },
};

const Game = ({ level, setLevel, time, setTime, running, setRunning }) => {
  const [frontNum, setFrontNum] = useState([]);
  const [backNum, setBackNum] = useState([]);
  const [nextNum, setNextNum] = useState(1);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    resetGame();
  }, [level]);

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

    // 앞면: 1부터 중간 숫자까지의 랜덤 배열
    const initialFrontNum = generateUniqueRandomArray(1, halfMax, size * size);
    // 뒷면: 중간 숫자부터 마지막 숫자까지의 랜덤 배열
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

  const generateUniqueRandomArray = (min, max, length) => {
    const set = new Set();
    while (set.size < length) {
      set.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(set);
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

        // 중간 숫자 이후 숫자 빈 문자열로 변경
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
    const gameData = [
      {
        date: now.toLocaleString(),
        level,
        playTime,
      },
    ];
    // 기존 게임 기록 데이터 불러오기
    const savedData = JSON.parse(localStorage.getItem("rankingData")) || [];
    // 새로운 게임 기록 데이터 추가
    savedData.push(gameData);

    // 수정된 기록 데이터를 다시 localStorage에 저장
    localStorage.setItem("rankingData", JSON.stringify(savedData));
  };

  return (
    <GameContainer>
      <h2>다음 숫자: {nextNum}</h2>
      <GridContainer size={levels[level].size}>
        {frontNum.map((num, index) => (
          <NumberButton
            key={index}
            onClick={() => handleNumberClick(num, index)}
            hidden={num === ""} // 숫자가 빈 문자열이면 버튼을 숨김
          >
            {num}
          </NumberButton>
        ))}
      </GridContainer>
      {finished && (
        <Modal onClose={resetGame}>
          <b>게임 끝!</b> 기록: {time.toFixed(2)}초
        </Modal>
      )}
    </GameContainer>
  );
};

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
  display: ${(props) => (props.hidden ? "none" : "inline-block")};
`;

export default Game;
