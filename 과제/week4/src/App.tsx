import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import JoinPage from "./pages/joinPage";
import Password from "./pages/passwordPage";
import HobbyPage from "./pages/Hobby";
import MyPage from "./pages/myPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/join/password",
    element: <Password />,
  },
  {
    path: "/join/hobby",
    element: <HobbyPage />,
  },
  {
    path: "/myPage",
    element: <MyPage />,
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
