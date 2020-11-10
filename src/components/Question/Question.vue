<template>
<!-- 圖片部分尚未存入 （待查） -->
  <div class="question-part">
    <div class="title">
      <q-input
      outlined
      v-model="title"
      label="問題："
      @blur="questionTitleChange([title, index])"
    ></q-input>
    </div>
    <div class="question-image">
      <q-img :src="path"></q-img>
      <q-btn label="test" @click="test"></q-btn>
      <q-file v-model="img" label="插入問題圖片（選填）" outlined :filter="checkFileType" @rejected="onRejected" @input="quesionTitleImageChange([img, index])">
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
    }
  },
  data () {
    return {
      title: '',
      img: null,
      files: {},
      path: ''
    }
  },
  methods: {
    ...mapMutations(['questionTitleChange', 'quesionTitleImageChange']),
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg')
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: '請上傳副檔名為 .png 或 .jpg 的檔案'
      })
    },
    test () {
      // console.log('blur', this.img)
      // console.log('img: ', this.img)
      const file = this.img
      console.log('file', file.name)
      // this.files = this.img
      const storageRef = this.$fb.storage().ref('test/' + file.name)
      storageRef.put(file)
        .then(res => {
          console.log('yes: ', res)
          // const url = this.$fb.storage().refFromURL('gs://for-class-ae5df.appspot.com/' + file.name)
          storageRef.getDownloadURL()
            .then(res => {
              this.path = res
              console.log('res: ', res)
            })
            .catch(err => {
              console.log('err: ', err)
            })
          // console.log('url: ', url)
          // console.log('stor: ', storageRef)
        })
        .catch(err => {
          console.log('err: ', err)
        })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './question.styl'
</style>
