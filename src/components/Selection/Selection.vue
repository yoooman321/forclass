<template>
  <div class="answer-selection">
    <div class="answer-title">答案選項: (請勾選正確答案)</div>
    <component :is="answer"></component>
    <!-- <div v-if="answerType === '是非'"> -->
        <!-- <q-radio size="xl" v-model="answer" val="true"><div style="font-size: 30px; margin-right: 20px;">O</div></q-radio>
        <q-radio size="xl" v-model="answer" val="false"><div style="font-size: 30px;">X</div></q-radio> -->
    <!-- </div> -->
    <!-- <div v-else>
      <q-option-group
        inline
        v-model="group"
        :options="options"
        color="primary"
      >
        <q-input label="test" outlined></q-input>
      </q-option-group>
    </div>
    <div></div> -->
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
