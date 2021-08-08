import { getItem, setItem } from 'localforage';


// 存储值
const store = {
  get:(key: string)=>{
    return getItem(key)
  },
  set:(key: string, data: any)=>{
    return setItem(key, data);
  }
}

export default store;