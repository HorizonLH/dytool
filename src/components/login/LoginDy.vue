<template>
  <div v-if="!openDialog">
    <span>当前未登陆，点击</span>
    <!-- <el-link type="primary" class="login-font" @click="">登陆</el-link> -->
    <n-button text @click="open">登陆</n-button>
  </div>
  <n-result v-if="openDialog" title="请扫码" :description="codeText">
    <template #default>
      <div style="width: 20%;left: 40%; position: absolute; bottom: 20px;">

        <n-progress 
          type="line"
          :status="precessStatus"
          :percentage="persent"
          :indicator-placement="'inside'"
          :stroke-width="2"
          processing/>
      </div>
      <div>
          <canvas id="canvas"></canvas>
      </div>
      <!-- <p>{{ codeText }}</p> -->
      <span>
          <n-button @click="getLoginCode">刷新二维码</n-button>
          <n-button @click="confirmCode">确认扫码</n-button>
      </span>
    </template>
  </n-result>
  <!-- <n-modal title="二维码登录" v-model:show="openDialog">
    </template>

  </n-modal> -->
</template>

<script>
import {
  toRefs,
  getCurrentInstance,
  reactive,
  computed,
  watch
} from "vue";
import { 
    useMessage,
    NButton,
    NResult,
    NProgress,
    NGrid,
    NGridItem
    } from "naive-ui";
import QrCode from "qrcode";
export default {
  components: {  NButton, NResult,NProgress,NGrid,NGridItem },

  setup(props, context) {
    // const { title } = toRefs(props);
    const messageToast = useMessage()
    // console.log(title.value);
    const { appContext : { config: { globalProperties:gp } } } = getCurrentInstance()
    let state = reactive({
      code: "",
      codeTime: 300,
      codeText: "",
      minSecond: 60,
      openDialog: false,
      precessStatus: 'default'
    });

    let persent = computed(() => {
      // console.log(Math.round((300 - state.codeTime) / 300))
      return Math.round((300 - state.codeTime) / 300 * 100)
    })

    watch(persent, (newValue) => {
      // console.log(newValue)
      if(newValue <= 50) {
        state.precessStatus = 'default'
      }
      if(newValue > 50) {
        state.precessStatus = 'warning'
      } 
      if(newValue > 90) {
        state.precessStatus = 'error'
      }
    })

    let countdown = new Object();

    function getLoginCode() {
      closeDialog()
      gp.$http.post("/api/dyapi/generateCode").then((res) => {
        state.code = res.data.code;
        createQrCode(res.data.url);
        countdown = setInterval(() => {
          calculateCodeTime();
        }, 1000);
        // console.log(res);
      });
    }

    function createQrCode(text) {
      // console.log(text);
      QrCode.toCanvas(
        document.getElementById("canvas"),
        text,
        {
          width: 123,
          height: 123,
          correctLevel: 0,
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    function calculateCodeTime() {
      state.codeTime--;
      if (state.codeTime <= 0) {
        clearInterval(countdown);
        state.codeText = "二维码已失效";
        state.codeTime = 300;
        // console.log("清除倒计时");
        return;
      }
      let min = "";
      let second;
      if (Math.floor(state.codeTime / 60) > 0) {
        min = Math.floor(state.codeTime / 60) + "分钟";
      }
      if (state.minSecond > 0) {
        state.minSecond--;
        second = state.minSecond + "秒";
      }
      if (state.minSecond == 0) {
        state.minSecond = 60;
      }
      state.codeText = "登陆二维码将在" + min + second + "后失效";
      // console.log(state.codeText);
      // console.log(state.codeTime);
    }

    function closeDialog(done) {
      clearInterval(countdown);
      state.codeTime = 300;
      state.minSecond = 60;
      state.codeText = "";
    }

    function open() {
      getLoginCode();
      state.openDialog = true;
      messageToast.success("success")
    }

    function confirmCode() {
      gp.$http
        .post("/api/dyapi/check/login", {
          code: state.code,
        })
        .then((res) => {
          const { code, message } = res;
          if (code != 0) {
            // console.log(message);
            messageToast.warning(message);
          } else {
            messageToast.success(message);
          }
        }).catch(err => {
          console.log(err);
        });
    }


    return {
      ...toRefs(state),
      persent,
      getLoginCode,
      createQrCode,
      open,
      closeDialog,
      confirmCode,
    };
  },
};
</script>

<style>
</style>