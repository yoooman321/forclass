<template>
  <div class="question-part">
    <div class="question-index">Question {{index}}</div>
    <div class="title">
      <q-input
      outlined
      v-model="title"
      label="問題："
      @blur="changeTitle"
    ></q-input>
    </div>
    <div class="question-image">
      <q-file v-model="img" label="插入問題圖片（選填）" outlined :filter="checkFileType" @rejected="onRejected">
        <template v-slot:prepend>
          <q-icon name="attach_file"></q-icon>
        </template>
      </q-file>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      title: '',
      img: null
    }
  },
  watch: {
    img () {
      console.log('img: ', this.img)
    }
  },
  methods: {
    changeTitle () {
      this.$emit('changeTitle', this.title, this.index)
    },
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg')
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: '請上傳副檔名為 .png 或 .jpg 的檔案'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './question.styl'
</style>
