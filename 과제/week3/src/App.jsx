import "./App.css";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [menu, setMenu] = useState("game");
  
  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
    </>
  );
}

export default App;
