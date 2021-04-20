<template>
  <div class="short-answer">
    無需新增任何選項
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
      options: [{ value: '', isAnswer: false, type: '文字', file: null },
        { value: '', isAnswer: false, type: '文字', file: null },
        { value: '', isAnswer: false, type: '文字', file: null },
        { value: '', isAnswer: false, type: '文字', file: null }]
    }
  },
  methods: {
    ...mapMutations(['changeOptions'])
  },
  created () {
    this.changeOptions([this.options, this.index])
  }
}
</script>
<style scoped>
.short-answer {
  color: red;
}
</style>
