<template>
  <div class="container">
    <el-button @click="login" type="primary"> 登录语雀 </el-button>
  </div>
</template>

<script lang='ts'>
const constant = require('../../utils/constant');
import Config from '@/config/config';
import { defineComponent } from 'vue';
import utils from '@/utils/index';
const { ipcRenderer } = require('electron');

const SING = 'SIGN';
const Login = defineComponent({
  name: 'login',
  setup() {
    function login() {
      const params = {
        client_id: Config.clientId,
        code: 'code',
        response_type: 'repo,doc',
        scope: utils.randomString(40),
        timestamp: Date.now(),
      };
      const url = 'https://www.yuque.com/oauth2/authorize';
      const result = window.open('http://www.baidu.com');
      ipcRenderer.send(constant.SIGN, params);
      ipcRenderer.on(constant.SIGN, function (event: any, arg: any) {
        console.log('结果值: ' + arg);
      });
      console.log(result);
    }
    return {
      login,
    };
  },
});

export default Login;
</script>

<style lang="less">
@import './login.less';
</style>