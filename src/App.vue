<template>
  <n-config-provider :theme="theme">

    <n-message-provider>
      <n-card v-if="isLogin" title="斗鱼" style="margin-bottom: 16px;">
        <n-tabs type="line">
          <n-tab-pane ne name="first" tab="个人信息">个人信息
            <login-dy/>
          </n-tab-pane>
          <n-tab-pane name="second" tab="关注列表">关注列表
            <login-dy/>
          </n-tab-pane>
          <n-tab-pane name="third" tab="礼物详情">礼物详情
            <login-dy/>
          </n-tab-pane>
        </n-tabs>
      </n-card>
      <not-login v-if="!isLogin"/>
    </n-message-provider>
    <n-global-style/>
  </n-config-provider>
</template>

<script>
import {
  NCard,
  NTabs,
  NTabPane,
  NMessageProvider,
  darkTheme,
  NConfigProvider,
  NGlobalStyle
} from 'naive-ui'
import NotLogin from './components/login/NotLogin.vue';
import LoginDy from './components/login/LoginDy.vue';
import { reactive, toRefs, onMounted } from 'vue'
export default{
  components: { NCard, NTabs, NTabPane, NotLogin, NMessageProvider, LoginDy, NConfigProvider, NGlobalStyle },
  setup() {

    

    let state = reactive({
      isLogin: true,
      theme: null
    })

    onMounted(() => {
      if(new Date().getHours()>=20 || new Date().getHours()<7){
        state.theme = darkTheme
      }else{
        state.theme = null;
      }
    })

    return {
      ...toRefs(state),
      darkTheme
    }

  }
}
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
