<template>
<!-- 圖片部分尚未存入 （待查） -->
  <div class="question-part">
    <div class="title">
      <q-input
        ref="title"
        outlined
        v-model="title"
        label="問題："
        :rules="[val => val && val.length > 0 || '請輸入問題']"
        @blur="questionTitleChange([title, index])"
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
import { mapMutations } from 'vuex'
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    validateCheck: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '',
      img: null
    }
  },
  watch: {
    validateCheck () {
      this.$refs.title.validate()
      this.$emit('returnQuestionValidate', this.$refs.title.hasError)
    }
  },
  methods: {
    ...mapMutations(['questionTitleChange']),
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
