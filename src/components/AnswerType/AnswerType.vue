<template>
  <div class="answer-type">
    <div class="select-type">
      <div class="title">答案類型:</div>
      <q-select
        v-model="answerType"
        :options="options" label="答案類型"
        label-color="primary" outlined
        @input="changeAnswerType([answerType,index])">
      </q-select>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      answerType: '單選',
      options: ['單選', '多選', '是非']
    }
  },
  methods: {
    ...mapMutations(['changeAnswerType'])
  }
}
</script>
<style lang="stylus" scoped>
@import './answerType.styl'
</style>
