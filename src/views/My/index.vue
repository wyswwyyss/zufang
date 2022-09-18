<template>
  <div>
    <div class="beforeLogin" v-if="!isLogin">
      <div class="My-title">
        <img
          style="width: 100%"
          src="http://liufusong.top:8080/img/profile/bg.png"
          alt=""
        />
        <div class="My-info">
          <div class="My-myIcon">
            <img
              src="http://liufusong.top:8080/img/profile/avatar.png"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
          <div class="My-name">游客</div>
          <router-link class="toLogin" to="/Layout/Login">去登录</router-link>
        </div>
      </div>
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="underway-o" text="看房记录" />
        <van-grid-item icon="vip-card-o" text="成为房主" />
        <van-grid-item icon="user-o" text="个人资料" />
        <van-grid-item icon="exchange" text="联系我们" />
      </van-grid>
    </div>
    <div class="Logined" v-else>
      <div class="My-title">
        <img
          style="width: 100%"
          :src="`http://liufusong.top:8080${userInfo.avatar}`"
          alt=""
        />
        <div class="My-info">
          <div class="My-myIcon">
            <img
              src="http://liufusong.top:8080/img/profile/avatar.png"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
          <div class="My-name">{{ userInfo.nickname }}</div>
          <p class="editUser">编辑个人资料></p>
          <button class="toLogin" @click="logout">退出登录</button>
        </div>
      </div>
      <van-grid :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="underway-o" text="看房记录" />
        <van-grid-item icon="vip-card-o" text="成为房主" />
        <van-grid-item icon="user-o" text="个人资料" />
        <van-grid-item icon="exchange" text="联系我们" />
      </van-grid>
    </div>

    <div class="My_ad">
      <img
        src="http://liufusong.top:8080/img/profile/join.png"
        alt=""
        class="ad_img"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { userUpdate } from '@/api'
export default {
  data() {
    return {
      userInfo: []
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['user'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['setUser']),
    async logout() {
      await this.$dialog.confirm({
        title: '好客租房',
        message: '是否确认退出该账号'
      })
      this.$store.commit('setUser', {})
    },
    async getUserInfo() {
      try {
        if (this.isLogin) {
          const token = this.$store.state.user.token
          // console.log(this.$store.state.user)
          const { data } = await userUpdate(token)
          // console.log(data)
          this.userInfo = data.body
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败,请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style>
.My-title {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  min-height: 300px;
  position: relative;
  margin-bottom: 15px;
  /* border: 0 !important; */
}
.My-info {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-family: 'MicrosoftYaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: absolute;
  background: #fff;
  width: 85%;
  height: 55%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 3px #ddd;
  margin: 50px auto 0;
  padding: 0 20px;
  text-align: center;
  font-size: 13px;
  margin-bottom: -5px;
  z-index: 2;
}
.My-myIcon {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-family: 'MicrosoftYaHei';
  color: #333;
  text-align: center;
  font-size: 13px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  transform: translateY(-50%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  border: 5px solid #f5f5f5;
  display: inline-block;
  box-shadow: 0 2px 2px #bdbdbd;
}
.My-name {
  margin-top: -20px;
  margin-bottom: 20px;
}
.toLogin {
  display: block;
  outline: 0 none;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  font-size: 13px;
  height: 47px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
  color: #fff;
  background-color: #21b97a;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 70px;
  height: 30px;
  margin:auto ;
}
.van-grid-item__content::after {
  z-index: 1;
  border-width: 0 !important;
}
.My_ad {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
  color: #333;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: center;
  margin-top: 8px;
}
.ad_img {
  margin-top: 15px;
  width: 90%;
}
.van-hairline--top::after {
  border-top-width: 0 !important;
}
.editUser {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  font-family: 'MicrosoftYaHei';
  text-align: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #999;
  font-size: 12px;
  margin-top: 20px;
}
</style>
