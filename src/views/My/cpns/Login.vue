<template>
  <div class="box">
    <van-nav-bar
      title="账号登录"
      left-arrow
      class="navbar"
      @click-left="goBack"
    />
    <van-form @submit="onSubmit">
      <van-field
        name="账号"
        v-model="userinfo.username"
        placeholder="请输入账号"
        :rules="mobileRules"
      />
      <van-field
        name="密码"
        type="password"
        v-model="userinfo.password"
        placeholder="请输入密码"
        :rules="codeRules"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="submit_btn"
          >登录</van-button
        >
      </div>
    </van-form>
    <a href="#/Layout/Register" style="display: inline-block; margin: 40px"
      >还没有账号，去注册</a
    >
  </div>
</template>

<script>
import { codeRules, mobileRules } from './rule'
import { login } from '@/api/user'
export default {
  data() {
    return {
      userinfo: {
        username: '',
        password: ''
      },
      codeRules,
      mobileRules
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async onSubmit() {
      const user = this.userinfo
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        // console.log('成功', data)

        this.$store.commit('setUser', data.body)
        if (data.status === 400) {
          this.$toast.fail('登录失败,账号或密码错误')
        }
        if (data.status === 200) {
          this.$toast.success('登录成功')
          setTimeout(() => {
            this.$router.push('/Layout/My')
          }, 2000)
        }
        // }
      } catch (err) {
        console.log('shibai', err)
      }
    }
  }
}
</script>

<style scoped>
.box {
  text-align: center;
}
.navbar {
  margin-bottom: 10px;
}
:deep(.van-nav-bar__content) {
  height: 45px;
  color: #fff;
  background-color: #21b97a !important;
}
:deep(.van-nav-bar__title) {
  color: #fff !important;
}
:deep(.van-icon) {
  color: #fff !important;
}
.van-field__value {
  line-height: 70px;
  font-size: 16px;
}
.submit_btn {
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: sans-serif;
  margin: 20px auto;
  text-transform: none;
  display: block;
  outline: 0 none;
  padding: 0;
  text-align: center;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  color: #fff;
  background-color: #1cb676;
  border: 1px solid #1cb676;
  border-radius: 2px;
  width: 90%;
}
</style>
