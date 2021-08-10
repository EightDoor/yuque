<template>
  <div class="container">
    <el-button @click="login" :loading="loading" type="primary">登录语雀</el-button>
    <el-button style="margin-top: 20px" v-if="loading" @click="cancelLoading">取消登录</el-button>
  </div>
</template>

<script lang="ts">
import constant from '@/utils/constant';
import Config from '@/config/config';
import { defineComponent, ref } from 'vue';
import store from '@/utils/store';
import { useRouter } from 'vue-router';
const { ipcRenderer } = require('electron');

const Login = defineComponent({
  name: 'login',
  setup() {
    const router = useRouter();
    const loading = ref(false);
    function login() {
      const params = {
        clientId: Config.clientId,
        clientSecret: Config.clientSecret,
      };
      loading.value = true;
      ipcRenderer.send(constant.SIGN, params);
      ipcRenderer.once(constant.SIGN, async function (event: any, arg: any) {
        console.log('结果值: ' + JSON.stringify(arg));
        if (arg.access_token) {
          await store.set(constant.ACCESSTOKEN, arg.access_token);
          await router.push('/home');
        }
        loading.value = false;
      });
    }
    function cancelLoading() {
      loading.value = false;
    }
    return {
      login,
      loading,
      cancelLoading,
    };
  },
});

export default Login;
</script>

<style lang="less">
@import "./login.less";
</style>
