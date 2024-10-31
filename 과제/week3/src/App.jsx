import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Ranking from "./components/Ranking";

function App() {
  const [menu, setMenu] = useState("game");
  const [level, setLevel] = useState("level1");
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  return (
    <div className="App">
      <Header
        menu={menu}
        setMenu={setMenu}
        level={level}
        setLevel={setLevel}
        time={time}
      />
      {menu === "game" && (
        <Game
          level={level}
          setLevel={setLevel}
          time={time}
          setTime={setTime}
          running={running}
          setRunning={setRunning}
        />
      )}
      {menu === "ranking" && <Ranking />}
    </div>
  );
}

export default App;
