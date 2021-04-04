<template>
  <div class="multi-answer">
    <div class="option-row" v-for="(option, index) in options" :key="`${index}-${option}`">
      <q-select
        v-model="option.type"
        class="type-select"
        :options="types"
        label="選項類型"
        outlined
         />
      <q-item tag="label" v-ripple class="option">
        <q-item-section avatar>
          <q-checkbox v-model="option.isAnswer" color="teal" @input="setOptions()"/>
        </q-item-section>
        <q-item-section>
          <q-file
            v-if="option.type === types[1]"
            v-model="option.file"
            label="請上傳檔案 (限 jpg, png)"
            :filter="checkFileType"
            @input="setOptions()"
            @rejected="onRejected">
            <template v-slot:prepend>
              <q-icon name="attach_file"></q-icon>
            </template>
          </q-file>
          <q-input v-else v-model="option.value" :dense="true" @input="setOptions()">
            <template v-slot:prepend>
              <q-icon name="keyboard_arrow_right"></q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </div>
    <q-btn flat class="full-width" color="teal" label="新增選項" @click="AddOption"></q-btn>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    questionIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      types: ['文字', '圖片'],
      options: [
        { value: '', isAnswer: false, type: '文字', file: null },
        { value: '', isAnswer: false, type: '文字', file: null },
        { value: '', isAnswer: false, type: '文字', file: null },
        { value: '', isAnswer: false, type: '文字', file: null }]
    }
  },
  methods: {
    ...mapMutations(['changeOptions']),
    setOptions () {
      this.changeOptions([this.options, this.questionIndex])
    },
    AddOption () {
      this.options = [...this.options, { value: '', isAnswer: false, type: '文字', file: null }]
      this.setOptions()
    },
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg')
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: '請上傳副檔名為 jpg, jpeg, png 的圖片.'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './MultipleAnswer.styl';
</style>
