import { useState } from "react";
import styled from "@emotion/styled";

// 로컬 스토리지에서 랭킹 데이터 불러오기 및 정렬
const getSortedData = () => {
  const savedData = JSON.parse(localStorage.getItem("rankingData")) || [];
  // 데이터 평탄화 및 정렬
  savedData.level = {
    level1: 1,
    level2: 2,
    level3: 3,
  };
  return savedData.flat().sort((a, b) => {
    // 높은 레벨부터 정렬 (숫자 비교)
    const levelComparison = parseInt(b.level) - parseInt(a.level);

    // 같은 레벨인 경우 플레이 시간이 짧은 것부터 정렬
    if (levelComparison !== 0) {
      return levelComparison;
    } else {
      return parseFloat(a.playTime) - parseFloat(b.playTime);
    }
  });
};

const Ranking = () => {
  const [data, setData] = useState(getSortedData());

  // 초기화 버튼 클릭 시 랭킹 데이터 삭제
  const handleReset = () => {
    localStorage.removeItem("rankingData");
    setData([]);
  };

  return (
    <RankingContainer>
      <RankingContent>
        <TitleRow>
          <Title>랭킹</Title>
          <ResetButton onClick={handleReset}>🔄 초기화</ResetButton>
        </TitleRow>
        <Table>
          <thead>
            <tr>
              <TableHeader>타임스탬프</TableHeader>
              <TableHeader>레벨</TableHeader>
              <TableHeader>플레이 시간</TableHeader>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((entry, index) => (
                <TableRow key={index}>
                  <TableData>{entry.date}</TableData>
                  <TableData>Level {entry.level.slice(-1)}</TableData>
                  <TableData>{entry.playTime} 초</TableData>
                </TableRow>
              ))
            ) : (
              <TableRow></TableRow>
            )}
          </tbody>
        </Table>
      </RankingContent>
    </RankingContainer>
  );
};

const RankingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`;

const RankingContent = styled.div`
  background-color: white;
  width: 40rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.b`
  font-size: ${(props) => props.theme.fonts.lg};
  text-align: center;
  grid-column: 2;
`;

const ResetButton = styled.button`
  background-color: ${(props) => props.theme.color.gray};
  padding: 0.6rem 0.8rem;
  border: 0.5px solid black;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-self: end;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid green;
`;

const TableHeader = styled.th`
  background-color: ${(props) => props.theme.color.green};
  color: white;
  text-align: left;
  padding: 0.75rem;
  border: 1px solid green;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: ${(props) => props.theme.color.lightgreen};
  }
  border: 1px solid green;
`;

const TableData = styled.td`
  padding: 0.75rem;
  text-align: left;
  border: 1px solid green;
`;

export default Ranking;
