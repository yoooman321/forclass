<template>
  <div class="among-question">請先看投影機上的問題
    <br>
    <img :src="blackBoard" alt="">
  </div>
</template>
<script>
import blackBoard from 'src/assets/images/blackboard.png'
export default {
  data () {
    return {
      blackBoard
    }
  }
}
</script>
<style scoped>
.among-question {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding-top: 20vh;
}
.among-question > img {
  margin-top: 5vh;
  width: auto;
  max-height: 30vh;
}
</style>
