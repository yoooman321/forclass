<template>
  <div class="ranking">
    <div v-if="myResult">
      <img class="result-img" :src="correct">
      <div class="result-text">恭喜答對了，繼續加油!</div>
      <div class="result-text">
        <span>
          答對題數
        </span>
        <span class="score-text">
          + {{ score }}
          <span class="score-animation">
          + {{ score }}
        </span>
        </span>
      </div>
    </div>
    <div v-else>
      <img class="result-img" :src="wrong">
      <div class="result-text">可惜答錯了，再接再厲!</div>
    </div>
  </div>
</template>
<script>
import correct from 'src/assets/images/student_correct.png'
import wrong from 'src/assets/images/student_wrong.png'
export default {
  props: {
    myResult: {
      type: Boolean
    }
  },
  data () {
    return {
      correct,
      wrong,
      score: 1
    }
  },
  created () {
    if (this.myResult) this.$emit('setAddScore', 1)
  }
}
</script>
<style lang="stylus" scoped>
@keyframes addScore
  0%
    opacity 0
    top -3px
    left 0px
  1%
    opacity 1
    top -3px
    left 0px
  100%
    top calc(50vh - 80px)
    left 30vw
.ranking
  text-align center
  .result-img
    margin-top 5vh
    height 25vh
  .result-text
    margin-top 5vh
    position relative
    font-weight bold
    font-size 1.5rem
    .score-text
      position relative
      .score-animation
        position absolute
        width 50px
        left -9px
        top -3px
        animation-name addScore
        animation-delay .5s
        animation-duration 1.5s
        z-index 10000
</style>
