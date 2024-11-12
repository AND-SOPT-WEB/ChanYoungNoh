import axios from "../lib/axios";
import { updateUserForm } from "../types/dataType";

// 유저 정보 업데이트
export async function updateUser(userData: updateUserForm) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axios.put(
      `/user`,
      {
        password: userData.password,
        hobby: userData.hobby,
      },
      {
        headers: { token },
      }
    );
    return response.data;
  } catch (err: any) {
    const { status, data } = err.response;

    // 에러 처리
    switch (status) {
      case 400:
        if (data.code === "00") {
          throw new Error("비밀번호와 취미는 8자를 초과할 수 없습니다.");
        }
        break;
      case 401:
        if (data.code === "00") {
          throw new Error("토큰이 누락되었습니다.");
        }
        break;
      case 403:
        if (data.code === "00") {
          throw new Error("유효하지 않은 토큰입니다.");
        }
        break;
      case 404:
        if (data.code === "00") {
          throw new Error("유효하지 않은 경로입니다.");
        }
        break;
      default:
        throw new Error("서버 오류가 발생했습니다.");
    }
  }
}
