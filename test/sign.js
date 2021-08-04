const crypto = require("crypto")

// 所有的参数以字母顺序排序（ client_id , code , response_type , scope , timestamp ），将所有的参数值 URL encode，最后用 & 拼接到一起：

const clientSecret = 'Hmnl6ZCx3xlxuyOslcBsEFb3vpBI0knNr4cRyvsy';

const client_id = 'rIfCQ3OSJiQExtXjzJ3q';
const code = randomString(40);
const response_type = 'code';
const scope = 'repo,doc';
const timestamp = Date.now();


const params = {
  "client_id": client_id,
  "code": code,
  "response_type":response_type,
  "scope": scope,
  "timestamp": timestamp,
}
console.log("参数url" + params)
console.log("code: " + code);
console.log("time: " + timestamp)
const result = sign(params, clientSecret);
console.log("结果值为:" + result)

// 将拼接好的字符串，使用 sha1 加签，秘钥为 client_secret，并对加签后的结果进行 base64 编码拿到字符串，设置到 sign 参数即可。

function sign(query, secret) {
  const signString = [
    'client_id', 'code', 'response_type', 'scope', 'timestamp',
  ].map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');
  return crypto.createHmac('sha1', secret)
    .update(signString)
    .digest()
    .toString('base64');
}

// 随机数
function randomString(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) 
    result += str[Math.floor(Math.random() * str.length)];
  return result;
}
