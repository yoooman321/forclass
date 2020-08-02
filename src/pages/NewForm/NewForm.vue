<template>
    <div class="new">
      <div class="set" v-for="(question, index) in questionList" :key="index">
        <div class="question-index">
          <div>Question {{question.index}}
            <span v-if="!question.expanded" class="question-title"> - {{ question.questionTitle }}</span>
          </div>
          <q-btn
            color="primary"
            round
            flat
            size="lg"
            :icon="question.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="question.expanded = !question.expanded"
          ></q-btn>
        </div>
         <q-slide-transition>
           <div v-show="question.expanded">
             <question :index="question.index" @changeTitle = "questionTitleChange"></question>
              <div class="answer-title">答案區</div>
              <div class="answer-part">
                <answer-type :index="question.index" @changeAnswerType = "changeAnswerType"></answer-type>
                <setting :index="question.index" @changeLimitedTime = "changeLimitedTime"></setting>
              </div>
              <selection :index="question.index" :answerType="question.answerType"></selection>
           </div>
         </q-slide-transition>
      </div>
        <q-btn icon="add_box" outline color="primary" class="full-width button" label="新增問題" size='lg' @click="addQuestion()"></q-btn>
      <div class="button">
        <q-btn fill color="primary" label="儲存" class="saveButton" size='lg' @click="saveForm()"></q-btn>
        <q-btn fill color="primary" label="重置" size='lg' class="resetButton" @click="resetForm()"></q-btn>
      </div>
    </div>
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
          answerType: '單選',
          expanded: true
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
        answerType: '單選',
        expanded: true
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
    },
    saveForm () {
      // save
    },
    resetForm () {
      // reset
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './newForm.styl'
</style>
