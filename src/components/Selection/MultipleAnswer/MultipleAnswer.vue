<template>
  <div class="multi-answer">
    <q-item tag="label" v-ripple v-for="(option, index) in options" :key="`${index}-${option}`">
      <q-item-section avatar>
        <q-checkbox v-model="option.isAnswer" color="teal" @input="addAnswer()"/>
      </q-item-section>
      <q-item-section>
        <q-input v-model="option.value" :dense="true">
          <template v-slot:prepend>
            <q-icon name="keyboard_arrow_right"></q-icon>
          </template>
        </q-input>
      </q-item-section>
    </q-item>
    <q-btn flat class="full-width" color="teal" label="新增選項" @click="AddOption"></q-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [
        { value: '', isAnswer: false },
        { value: '', isAnswer: false },
        { value: '', isAnswer: false },
        { value: '', isAnswer: false }]
    }
  },
  methods: {
    addAnswer () {
      this.$emit('setCorrectOption', this.options)
    },
    AddOption () {
      this.options = [...this.options, { value: '', isAnswer: false }]
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
