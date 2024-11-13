import { useEffect, useState } from "react";
import { userHobby } from "../utils/userHobby";

const useMyHobby = () => {
  const [myHobby, setMyHobby] = useState<string>("");

  useEffect(() => {
    const fetchMyHobby = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await userHobby();
          setMyHobby(res.hobby);
        } catch (err) {
          console.error(
            "사용자의 취미를 불러오는 중 오류가 발생했습니다.",
            err
          );
        }
      }
    };

    fetchMyHobby();
  }, []);

  return myHobby;
};

export default useMyHobby;
