import Config from "@/config/config";
import store from '@/utils/store';
import axios from "axios";
import Constant from "./constant";


const instant = axios.create({
  baseURL: Config.baseUrl,
})

// 请求拦截器
instant.interceptors.request.use(async (config)=>{
  // access_token是否存在
  const r = await  store.get(Constant.ACCESSTOKEN);
  if(r) {
    const obj = {
      "X-Auth-Token": r,
    };
    config.headers = Object.assign(obj, config.headers)
  }
  return config;
})

// 响应拦截器
instant.interceptors.response.use((response)=>{
  if(response.status == 200) {

  }else if(response.status === 401) {
    // 登录过期，跳转登录页面
    window.location.href = '/login';
  }
  return response;
})

const reqGet = <T>(url: string, params?: {[key: string]: any}): Promise<T> =>{
  return instant.get(url, params).then(res=>{
    return res.data;
  });
}

export { reqGet };
