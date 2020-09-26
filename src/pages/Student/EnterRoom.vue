<template>
  <div class="play-page">
    <div class="welcome-img">
      <img :src="welcome" />
    </div>
    <div class="username-text">
      請輸入您的暱稱（最長6個字）
      <div class="input-field">
        <q-input bg-color="white" filled v-model="name" label="暱稱"></q-input>
      </div>
      <div class="input-field">
        <q-btn color="black" label="進入遊戲" @click="enterGame()"></q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import welcome from '../../assets/welcome.png'
export default {
  props: ['nickName'],
  data () {
    return {
      id: this.$route.params.id,
      name: '',
      welcome
    }
  },
  methods: {
    enterGame () {
      this.$emit('setNickName', this.name)
    }
  }

}
</script>
<style scoped>
.welcome-img {
  text-align: center;
  padding-top: 5vh;
}
.welcome-img > img {
  width: 60vw;
  max-height: 30vh;
}
.play-page {
  /* width: 100vw; */
  /* height: 100vh; */
  /* background-color: #B1EDE8; */
}
.username-text {
  font-size: 1.2rem;
  text-align: center;
  padding-top: 10vh;
}
.input-field {
  margin: 5% 10%;
}
</style>
