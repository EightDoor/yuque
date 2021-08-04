
const {ipcMain} =  require('electron')
const sign = require("./sign")
const constant = require('../../src/utils/constant.js');


// 渲染进程和主进程通信
const eventListenInit  = ()=>{
  ipcMain.on(constant.SIGN, function(event, arg) {
    console.log(event, arg)
    const result = sign(arg)
    event.sender.send(constant.SIGN, result)
  })  
}



module.exports = {eventListenInit}

