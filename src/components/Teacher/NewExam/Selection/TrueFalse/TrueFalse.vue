<template>
  <div class="true-false">
    <q-item
      v-for="(option, i) in options"
      :key="`item-${i}`"
      clickable
      v-ripple
      :active="option.isAnswer === true"
      @click="onClick(i)"
      active-class="active"
    >
      <q-item-section side>
        <q-icon v-if="option.value !== 'X'" name="radio_button_unchecked"></q-icon>
        <q-icon v-else name="close"></q-icon>
      </q-item-section>
    </q-item>
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
      options: [{
        value: 'O',
        isAnswer: false
      },
      {
        value: 'X',
        isAnswer: false
      }]
    }
  },
  methods: {
    ...mapMutations(['changeOptions']),
    onClick (index) {
      this.options.forEach((o, i) => {
        o.isAnswer = i === index
      })
      this.changeOptions([JSON.parse(JSON.stringify(this.options)), this.index])
    }
  },
  created () {
    if (this.$route.params.id && this.$store.state.exam.questionList[this.index].options.length === 2) this.options = JSON.parse(JSON.stringify(this.$store.state.exam.questionList[this.index].options))
  }
}
</script>
<style lang="stylus" scoped>
@import './trueFalse.styl';
</style>
