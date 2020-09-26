<template>
  <div class="waiting-room">
    <div class="img-part">
      <img :src="time" />
    </div>
    <div class="context">
      {{ nickName }} 同學您好，
      <br>
      請靜待遊戲開始。
    </div>
  </div>
</template>
<script>
import time from 'src/assets/time.png'
export default {
  props: ['nickName'],
  data () {
    return {
      time
    }
  }
}
</script>
<style scoped>
.waiting-room {
  /* width: 100vw; */
  /* height: 100vh; */
}
.img-part {
  text-align: center;
  padding-top: 20%;
}
.img-part > img {
  height: 20vh;
  /* margin: 20% 30%; */
}
.context {
  padding-top: 10%;
  text-align: center;
  font-size: 1.2rem;
}
</style>
