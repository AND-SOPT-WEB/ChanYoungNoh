import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../utils/updateUser";

const useMyInfo = () => {
  const [password, setPassword] = useState("");
  const [newHobby, setNewHobby] = useState("");
  const navigate = useNavigate();

  const handleUpdateInfo = async () => {
    if (!password && !newHobby) {
      alert("비밀번호 또는 취미를 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        if (password && newHobby) {
          await updateUser(token, { password, hobby: newHobby });
          alert("비밀번호와 취미가 모두 변경되었습니다.");
        } else if (password) {
          await updateUser(token, { password });
          alert("비밀번호가 변경되었습니다.");
        } else if (newHobby) {
          await updateUser(token, { hobby: newHobby });
          alert("취미가 변경되었습니다.");
        }

        setPassword("");
        setNewHobby("");
      } catch (err) {
        alert("정보 수정 중 오류가 발생했습니다.");
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return {
    password,
    newHobby,
    setPassword,
    setNewHobby,
    handleUpdateInfo,
  };
};

export default useMyInfo;
