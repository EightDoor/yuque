import dayjs from 'dayjs';

const utils = {

  /**
   * 生成随机数
   * @param length 长度
   * @returns
   */
   randomString: (length: number)=> {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i)
      result += str[Math.floor(Math.random() * str.length)];
    return result;
  },

  /**
   * 格式化时间
   * @param val 值
   * @param format
   */
  formatTime:(val: string | number, format?: string)=>{
     return dayjs(val).format(format ?? "YYYY-MM-DD HH:mm:ss")
  }
}

export default utils;
