import Config from '@/config/config';
import store from '@/utils/store';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import Constant from './constant';

const instant = axios.create({
  baseURL: Config.baseUrl,
});

// 请求拦截器
instant.interceptors.request.use(async (config) => {
  // access_token是否存在
  const r = await store.get(Constant.ACCESSTOKEN);
  if (r) {
    const obj = {
      'X-Auth-Token': r,
    };
    config.headers = Object.assign(obj, config.headers);
  }
  return config;
});

// 响应拦截器
instant.interceptors.response.use(
  (response) => {
    console.log(response, 'response');
    if (response.status == 200) {
      //
    } else if (response.status === 401) {
      // 登录过期，跳转登录页面
      window.location.href = '/login';
    }
    return response;
  },
  async function (err) {
    console.log(err);
    if(err.indexOf("401")) {
      await store.set(Constant.ACCESSTOKEN, null,);
      window.location.href = '/login';
    }else {
      ElMessage.error(JSON.stringify(err))
    }

  }
);

const reqGet = <T>(
  url: string,
  params?: { [key: string]: any }
): Promise<T> => {
  return instant.get(url, params).then((res) => {
    return res.data;
  });
};

const reqPut = <T>(url: string, body?: Record<string, any>) :Promise<T>=>{
  return instant.put(url, body).then(res=>{
    return res.data;
  })
}

const reqPost = <T>(url: string, body?: Record<string, any>):Promise<T> =>{
  return instant.post(url, body).then(res=>{
    return res.data;
  })
}

export { reqGet, reqPut, reqPost };
