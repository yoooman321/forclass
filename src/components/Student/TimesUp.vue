<template>
  <div>
    <div class="img-part" >
      <img :src="time" />
    </div>
    <div class=text-part>
      時間到
    </div>
  </div>
</template>
<script>
import time from 'src/assets/images/time.png'
export default {
  data () {
    return {
      time
    }
  }
}
</script>
<style scoped>
.img-part {
  text-align: center;
  padding-top: 20%;
}
.img-part > img {
  height: 20vh;
}
.text-part {
  margin-top: 5vh;
  font-size: 3rem;
  text-align: center;
}
</style>
