import axios from "../lib/axios";

// 유저 취미 조회 (로그인 필요)
export async function userHobby() {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`/user/my-hobby`, {
      headers: { token },
    });
    return res.data;
  } catch (err: any) {
    const { status, data } = err.response;
    if (status === 401 && data.code === "00") {
      throw new Error("header 에 token 이 없습니다.");
    } else if (status === 403 && data.code === "00") {
      throw new Error("token 이 유효하지 않습니다.");
    } else if (status === 404 && data.code === "00") {
      throw new Error("유효하지 않은 경로입니다.");
    } else {
      throw new Error("서버 오류가 발생했습니다.");
    }
  }
}