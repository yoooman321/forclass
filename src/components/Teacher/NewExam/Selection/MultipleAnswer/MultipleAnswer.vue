<template>
  <div class="multi-answer">
    <div class="option-row" v-for="(option, selectionIndex) in options" :key="`${selectionIndex}-${option}`">
      <q-select
        :value="option.type"
        class="type-select"
        :options="types"
        label="選項類型"
        outlined
        @input="e => changeSelectionType(selectionIndex, e)"
         />
      <q-item tag="label" v-ripple class="option">
        <q-item-section avatar>
          <q-checkbox :value="option.isAnswer" color="teal" @input="e => changeOptionisAnswer(selectionIndex, e)"/>
        </q-item-section>
        <q-item-section>
          <q-file
            v-if="option.type === types[1]"
            :value="option.file"
            label="請上傳檔案 (限 jpg, png)"
            :filter="checkFileType"
            @input="e => changeOptionFile(selectionIndex, e)"
            @rejected="onRejected">
            <template v-slot:prepend>
              <q-icon name="attach_file"></q-icon>
            </template>
          </q-file>
          <q-input v-else :value="option.value" :dense="true" @input="e => changeOptionValue(selectionIndex, e)">
            <template v-slot:prepend>
              <q-icon name="keyboard_arrow_right"></q-icon>
            </template>
          </q-input>
        </q-item-section>
        <q-btn round color="grey-9" icon="close" @click="deleteOption([index, selectionIndex])"></q-btn>
      </q-item>
    </div>
    <q-btn flat class="full-width" color="teal" label="新增選項" @click="add"></q-btn>
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
      types: ['文字', '圖片']
    }
  },
  computed: {
    options: {
      get () {
        return this.$store.state.exam.questionList[this.index].options
      }
    }
  },
  methods: {
    ...mapMutations(['addOption', 'deleteOption']),
    add () {
      const options = { value: '', isAnswer: false, type: '文字', file: null }
      this.addOption([this.index, options])
    },
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg')
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: '請上傳副檔名為 jpg, jpeg, png 的圖片.'
      })
    },
    changeSelectionType (index, e) {
      this.$store.dispatch('changeSelectionType', { questionIndex: this.index, selectionIndex: index, value: e })
    },
    changeOptionisAnswer (index, e) {
      this.$store.dispatch('changeOptionMultiAnswer', { questionIndex: this.index, selectionIndex: index, value: e })
    },
    changeOptionFile (index, e) {
      this.$store.dispatch('changeOptionFile', { questionIndex: this.index, selectionIndex: index, value: e })
    },
    changeOptionValue (index, e) {
      this.$store.dispatch('changeOptionValue', { questionIndex: this.index, selectionIndex: index, value: e })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './MultipleAnswer.styl';
</style>
