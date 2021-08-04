const secretId = 'Hmnl6ZCx3xlxuyOslcBsEFb3vpBI0knNr4cRyvsy'
const crypto = require("crypto")

function sign(query) {
  const signString = [
    'client_id', 'code', 'response_type', 'scope', 'timestamp',
  ].map(key => `${key}=${encodeURIComponent(query[key] || '')}`).join('&');
  return crypto.createHmac('sha1', secretId)
    .update(signString)
    .digest()
    .toString('base64');
}


module.exports = sign