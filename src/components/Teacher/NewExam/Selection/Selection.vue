<template>
  <div class="answer-selection">
    <div class="answer-title">答案選項: (請勾選正確答案)</div>
    <component :is="answer" :questionIndex="index"></component>
  </div>
</template>
<script>
import SingleAnswer from './SingleAnswer/SingleAnswer'
import MultipleAnswer from './MultipleAnswer/MultipleAnswer'
import TrueFalse from './TrueFalse/TrueFalse'
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    answerType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      answer: 'single-answer'
    }
  },
  watch: {
    answerType () {
      const answerType = this.answerType
      switch (answerType) {
        case '是非':
          this.answer = 'true-false'
          break
        case '多選':
          this.answer = 'multiple-answer'
          break
        case '單選':
          this.answer = 'single-answer'
          break
        default:
          this.answer = 'single-answer'
      }
    }
  },
  components: {
    SingleAnswer,
    MultipleAnswer,
    TrueFalse
  }
}
</script>
<style lang="stylus" scoped>
@import './selection.styl'
</style>
