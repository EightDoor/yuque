import { UserInfo } from "@/types/yuque/user";
import { reqGet } from "./request";

const Business = {
  // 获取用户信息
   getUserInfo:() => {
    return reqGet<UserInfo>('user').then((res) => {
      return res.data;
    });
  }
}
export default Business