import instance from "../lib/axios";
import { loginForm } from "../types/dataType";

// 유저 로그인 API
export async function loginUser(userData: loginForm) {
  try {
    const res = await instance.post(`/login`, {
      username: userData.name,
      password: userData.password,
    });

    if (res.status === 200) {
      const token = res.data.result.token;
      if (token) {
        // 토큰 저장
        localStorage.setItem("token", token);
        return res.data.result;
      }
    }
  } catch (err: any) {
    const { status, data } = err.response;

    // 상태 코드에 따른 에러 메시지 처리
    if (status === 400) {
      if (data.code === "01") {
        throw new Error("입력 정보가 유효하지 않습니다.");
      } else if (data.code === "02") {
        throw new Error("로그인 요청 정보가 잘못되었습니다.");
      }
    } else if (status === 403 && data.code === "01") {
      throw new Error("비밀번호가 일치하지 않습니다.");
    } else if (status === 404 && data.code === "00") {
      throw new Error("유효하지 않은 경로입니다.");
    } else {
      throw new Error("서버 오류가 발생했습니다.");
    }
  }
}
