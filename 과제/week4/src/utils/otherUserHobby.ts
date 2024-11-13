import instance from "../lib/axios";

// 다른 유저의 취미 조회
export async function otherUserHobby(no: number) {
  const token = localStorage.getItem("token");

  try {
    const res = await instance.get(`/user/${no}/hobby`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return res.data;
  } catch (err: any) {
    const { status, data } = err.response;
    if (status === 404) {
      if (data.code === "00") throw new Error("유효하지 않은 경로입니다.");
      if (data.code === "01") throw new Error("입력된 취미가 없습니다");
    } else {
      throw new Error("서버 오류가 발생했습니다.");
    }
  }
}
