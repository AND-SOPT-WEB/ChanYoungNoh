import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userHobby } from "../utils/userHobby";

const useMyHobby = () => {
  const [myHobby, setMyHobby] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyHobby = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/");
        return;
      }

      try {
        const hobby = await userHobby();
        setMyHobby(hobby);
      } catch (err: any) {
        alert(err.message);

        // 토큰이 유효하지 않을 경우 로그아웃 처리
        if (err.message.includes("token")) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fetchMyHobby();
  }, [navigate]);

  return myHobby;
};

export default useMyHobby;
