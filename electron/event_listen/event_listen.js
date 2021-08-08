
const {ipcMain} =  require('electron')
const sign = require("./sign")
const { auth } = require('yuque-auth');

// 渲染进程和主进程通信
const SIGN = 'SIGN';
const eventListenInit  =  ()=>{
  ipcMain.on(SIGN, async function(event, arg) {
    const result = await authFun(arg['clientId'], arg['clientSecret'])
    event.sender.send(SIGN, result)
  })  
}

const authFun = async (clientId, clientSecret,)=>{
  return auth({
    // clientId 和 clientSevret在 oauth 应用中可查到
    clientId,
    clientSecret,
    scope: 'repo,doc',
  }).then(res => {
    console.log('get auth', res);
    return res;
    //{ access_token: 'Y1iwvwUPI4M67VjWRGHAzgq7gzB4a21EV3jOhyFf', token_type: 'bearer', scope: 'repo,doc' }
  }).catch(err => {
    console.log('error happend', err.stack);
  });
}



module.exports = {eventListenInit}

