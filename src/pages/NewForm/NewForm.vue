<template>
    <div class="new">
      <div class="testName">
        <q-input
          outlined
          v-model="examName"
          label="考題名稱："
        ></q-input>
      </div>
      <div class="set" v-for="(question, index) in questions.questionList" :key="index">
        <div class="question-index">
          <div>Question {{index + 1}}
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
             <question :index="index"></question>
              <div class="answer-title">答案區</div>
              <div class="answer-part">
                <answer-type :index="index"></answer-type>
                <setting :index="index"></setting>
              </div>
              <selection :index="index" :answerType="question.answerType"></selection>
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
import { mapMutations } from 'vuex'
import { addQuesionToFirebase, addQuestionImageToFirebase } from 'src/backend/index'
export default {
  name: 'PageIndex',
  computed: {
    questions () {
      return this.$store.state.exam
    },
    examName: {
      get () {
        return this.questions.examName
      },
      set (value) {
        this.changeExamName(value)
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
    Question,
    AnswerType,
    Setting,
    Selection
  },
  methods: {
    ...mapMutations(['addQuestion', 'changeExpnaded', 'changeExamName']),
    async saveForm () {
      // save
      // console.log(this.questions)
      const test = await addQuesionToFirebase()
      await addQuestionImageToFirebase()
      console.log('test: ', test)
      // clear quesiontList
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
