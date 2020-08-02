<template>
  <!-- <q-page class="flex flex-center"> -->
    <div class="new">
      <div class="set" v-for="(question, index) in questionList" :key="index">
        <question :index="question.index" @changeTitle = "questionTitleChange"></question>
        <div class="answer-title">答案區</div>
        <div class="answer-part">
          <answer-type :index="question.index" @changeAnswerType = "changeAnswerType"></answer-type>
          <setting :index="question.index" @changeLimitedTime = "changeLimitedTime"></setting>
        </div>
        <selection :index="question.index" :answerType="question.answerType"></selection>
      </div>
      <q-btn icon="add_box" outline color="primary" class="full-width" label="新增問題" size='lg' @click="addQuestion()"></q-btn>
    </div>
  <!-- </q-page> -->
</template>

<script>
import Question from '../../components/Question/Question'
import AnswerType from '../../components/AnswerType/AnswerType'
import Setting from '../../components/Setting/Setting'
import Selection from '../../components/Selection/Selection'
export default {
  name: 'PageIndex',
  data () {
    return {
      qustionIndex: 1,
      questionList: [
        {
          index: 1,
          questionTitle: '',
          settings: {
            limitedTime: 20
          },
          answerType: '單選'
        }
      ]
    }
  },
  components: {
    Question,
    AnswerType,
    Setting,
    Selection
  },
  methods: {
    addQuestion () {
      this.qustionIndex++
      this.questionList.push({
        index: this.qustionIndex,
        questionTitle: '',
        settings: {
          times: 20
        },
        answerType: '單選'
      })
    },
    questionTitleChange (updateTitle, index) {
      this.questionList[index - 1].questionTitle = updateTitle
    },
    changeAnswerType (answerType, index) {
      this.questionList[index - 1].answerType = answerType
    },
    changeLimitedTime (limitedTime, index) {
      this.questionList[index - 1].settings.limitedTime = limitedTime
      console.log('quesiotn:', this.questionList)
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './newForm.styl'
</style>
