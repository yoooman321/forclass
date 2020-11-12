<template>
  <div class="set">
    <div class="question-index">
      <div>Question {{ index + 1}}
        <span v-if="!question.expanded" class="question-title"> - {{ question.questionTitle }}</span>
      </div>
       <q-btn
          color="primary"
          round
          flat
          size="lg"
          :icon="question.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="changeExpnaded(index)"
        ></q-btn>
    </div>
    <q-slide-transition>
      <div v-show="question.expanded">
        <div class="question-part">
          <div class="title">
            <q-input
              ref="title"
              outlined
              v-model="questionTitle"
              label="問題："
              :rules="[val => val && val.length > 0 || '請輸入問題']"
              @input="setQuesiontObject('questionTitle', questionTitle)"
          ></q-input>
          </div>
          <div class="question-image">
            <q-file v-model="questionTitleImage" label="插入問題圖片（選填）" outlined :filter="checkFileType" @rejected="onRejected" @input="setQuesiontObject('questionTitleImage', questionTitleImage)">
              <template v-slot:prepend>
                <q-icon name="attach_file"></q-icon>
              </template>
            </q-file>
          </div>
        </div>
        <div class="answer-title">答案區</div>
          <div class="answer-part">
            <div class="answer-type">
              <div class="title">答案類型:</div>
              <q-select
                v-model="answerType"
                :options="options" label="答案類型"
                label-color="primary" outlined
                @input="setQuesiontObject('answerType',answerType)"
              >
              </q-select>
            </div>
             <div class="setting-part">
                <div class="title">答題設定：</div>
                <q-input
                  ref="limitedTime"
                  outlined
                  v-model="limitedTime"
                  label="答題秒數"
                  suffix="秒"
                  type="number"
                  @input="setQuesiontObject('limitedTime',limitedTime)"
                  :rules="[val => val && val >= 5 || '秒數至少5秒' ]"
                ></q-input>
              </div>
          </div>
        <selection :index="index" :answerType="answerType"></selection>
      </div>
    </q-slide-transition>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import Selection from 'src/components/Teacher/NewExam/Selection/Selection'
export default {
  props: {
    index: {
      type: Number
    },
    question: {
      type: Object
    }
  },
  data () {
    return {
      questionTitle: this.question.questionTitle,
      questionTitleImage: this.question.questionTitleImage,
      answerType: this.question.answerType,
      options: ['單選', '多選', '是非'],
      limitedTime: this.question.settings.limitedTime
    }
  },
  components: {
    Selection
  },
  created () {
    this.$bus.$on('reset', () => {
      this.questionTitle = ''
      this.questionTitleImage = null
      this.answerType = '單選'
      this.limitedTime = 20
      this.$refs.title.resetValidation()
    })
    this.$bus.$on('validateCheck', () => {
      this.$refs.title.validate()
      this.$refs.limitedTime.validate()
      const check = this.$refs.title.hasError || this.$refs.limitedTime.hasError
      this.$emit('getValidate', check)
    })
  },
  beforeDestroy () {
    this.$bus.$off('reset')
  },
  methods: {
    ...mapMutations(['changeExpnaded', 'setQuesiontList']),
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg')
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: '請上傳副檔名為 .png 或 .jpg 的檔案'
      })
    },
    setQuesiontObject (name, value) {
      this.setQuesiontList([value, this.index, name])
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './questionSet.styl'
</style>
