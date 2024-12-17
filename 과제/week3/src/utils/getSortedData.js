// 로컬 스토리지에서 랭킹 데이터 불러오기 및 정렬
const getSortedData = () => {
  const savedData = JSON.parse(localStorage.getItem("rankingData")) || [];
  const flatData = savedData.flat();

  // 레벨 및 플레이 시간 기준 정렬
  flatData.sort((a, b) => {
    const levelOrder = { level1: 1, level2: 2, level3: 3 };

    // 높은 레벨이 위쪽으로 정렬되도록
    const levelComparison = levelOrder[b.level] - levelOrder[a.level];

    // 같은 레벨일 경우 플레이 시간 오름차순으로 정렬
    if (levelComparison !== 0) {
      return levelComparison;
    } else {
      return parseFloat(a.playTime) - parseFloat(b.playTime);
    }
  });

  return flatData;
};

export default getSortedData;
