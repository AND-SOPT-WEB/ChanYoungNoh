import instance from "../lib/axios";
import { passwordForm } from "../types/dataType";

// 사용자 회원가입
export async function postUser(formData: passwordForm) {
  try {
    const res = await instance.post(`/user`, {
      username: formData.name,
      password: formData.password,
      hobby: formData.hobby,
    });
    return res.data.result;
  } catch (err: any) {
    const { status, data } = err.response;
    if (status === 400) {
      if (data.code === "00") throw new Error("입력 정보가 유효하지 않습니다.");
      if (data.code === "01")
        throw new Error(
          "사용자 이름 혹은 비밀번호 혹은 취미가 8자를 초과했습니다."
        );
    } else if (status === 404) {
      throw new Error("유효하지 않은 경로입니다.");
    } else if (status === 409 && data.code === "00") {
      throw new Error("사용자 이름이 중복됩니다.");
    } else {
      throw new Error("서버 오류가 발생했습니다.");
    }
  }
}
