<template>
  <div class="set">
    <q-btn class="deleteQuestion-btn" round color="grey-9" icon="close" @click="confirm = true"></q-btn>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          確定要刪除此問題？
        </q-card-section>
        <q-card-section class="row items-center">
          <q-btn class="dialog-btn" label="確定" color="red" v-close-popup style="margin: 0 5px;" @click="deleteIt"></q-btn>
          <q-btn class="dialog-btn" label="取消" color="primary" v-close-popup style="margin: 0 5px;"></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="question-index">
      <div>Question {{ index + 1}}
        <span v-if="!expanded" class="question-title"> - {{ questionTitle }}</span>
      </div>
       <q-btn
          color="primary"
          round
          flat
          size="lg"
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="changeExpnaded()"
        ></q-btn>
    </div>
    <q-slide-transition>
      <div v-show="expanded">
        <div class="question-part">
          <div class="title">
            <q-input
              ref="title"
              outlined
              v-model="questionTitle"
              label="問題："
              :rules="[val => val && val.length > 0 || '請輸入問題']"
          ></q-input>
          </div>
          <div class="question-image">
            <q-file v-model="questionTitleImage" label="插入問題圖片（選填）" outlined :filter="checkFileType" @rejected="onRejected">
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
                  :rules="[val => val && val >= 5 || '秒數至少5秒' ]"
                ></q-input>
              </div>
          </div>
        <div class="answer-selection">
          <div class="selection-title">答案選項: (請勾選正確答案)</div>
          <component :is="answer" :index="index"></component>
        </div>
      </div>
    </q-slide-transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import SingleAnswer from 'src/components/Teacher/NewExam/Selection/SingleAnswer/SingleAnswer'
import MultipleAnswer from 'src/components/Teacher/NewExam/Selection/MultipleAnswer/MultipleAnswer'
import TrueFalse from 'src/components/Teacher/NewExam/Selection/TrueFalse/TrueFalse'
export default {
  props: {
    index: {
      type: Number
    }
  },
  computed: {
    ...mapState([
      'exam'
    ]),
    questionTitle: {
      get () {
        return this.exam.questionList[this.index].questionTitle
      },
      set (value) {
        this.setQuesiontList([value, this.index, 'questionTitle'])
      }
    },
    questionTitleImage: {
      get () {
        return this.exam.questionList[this.index].questionTitleImage
      },
      set (value) {
        this.setQuesiontList([value, this.index, 'questionTitleImage'])
      }
    },
    answerType: {
      get () {
        return this.exam.questionList[this.index].answerType
      },
      set (value) {
        this.setQuesiontList([value, this.index, 'answerType'])
        this.getAnswerTypeComponent()
      }
    },
    limitedTime: {
      get () {
        return this.exam.questionList[this.index].settings.limitedTime
      },
      set (value) {
        this.setQuesiontList([Number(value), this.index, 'limitedTime'])
      }
    }
  },
  data () {
    return {
      expanded: true,
      options: ['單選', '多選', '是非'],
      answer: 'single-answer',
      confirm: false
    }
  },
  components: {
    SingleAnswer,
    MultipleAnswer,
    TrueFalse
  },
  created () {
    this.getAnswerTypeComponent()
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
    ...mapMutations(['setQuesiontList', 'changeQuestionTitle', 'deleteQuestion']),
    checkFileType (files) {
      return files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg')
    },
    changeExpnaded () {
      this.expanded = !this.expanded
    },
    onRejected () {
      this.$q.notify({
        type: 'negative',
        message: '請上傳副檔名為 .png 或 .jpg 的檔案'
      })
    },
    getAnswerTypeComponent () {
      switch (this.answerType) {
        case '是非':
          this.answer = 'true-false'
          break
        case '多選':
          this.answer = 'multiple-answer'
          break
        case '單選':
          this.answer = 'single-answer'
          break
        default:
          this.answer = 'single-answer'
      }
    },
    deleteIt () {
      this.deleteQuestion([this.index])
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './questionSet.styl'
</style>
