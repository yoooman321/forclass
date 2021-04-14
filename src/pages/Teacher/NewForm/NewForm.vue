<template>
    <div class="new">
      <div class="testName">
        <q-input
          ref="examName"
          outlined
          v-model="examName"
          label="考題名稱："
          :rules="[val => val && val.length > 0 || '請輸入考題名稱']"
        ></q-input>
      </div>
      <div v-for="(question, index) in questions.questionList" :key="'aa'+index">
        <question-set @getValidate="getValidate" :index="index" ></question-set>
      </div>
        <q-btn icon="add_box" outline color="primary" class="full-width button" label="新增問題" size='lg' @click="addQuestion()"></q-btn>
      <div class="button">
        <q-btn fill color="primary" label="儲存" class="saveButton" size='lg' @click="saveForm()"></q-btn>
        <q-btn fill color="primary" label="重置" size='lg' class="resetButton" @click="resetForm"></q-btn>
      </div>
    </div>
</template>

<script>
import QuestionSet from 'src/components/Teacher/NewExam/QuestionSet/QuestionSet'
import { mapMutations } from 'vuex'
import { getFinalQuestionList, addQuesionToFirebase } from 'src/backend/index'
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
      validateCheck: false,
      avoidDoubleClick: false
    }
  },
  components: {
    QuestionSet
  },
  methods: {
    ...mapMutations(['addQuestion', 'changeExamName', 'resetQuestion', 'resetVuexExam']),
    async saveForm () {
      if (this.avoidDoubleClick) return
      this.validateCheck = false
      this.$bus.$emit('validateCheck')
      this.$refs.examName.validate()
      if (this.validateCheck || this.$refs.examName.hasError) {
        this.$q.notify({
          type: 'negative',
          message: '有欄位有錯誤，請檢查!!',
          icon: 'warning',
          position: 'top-right'
        })
        return
      }
      // 驗證過後:
      this.$q.loading.show({ message: '新增中，請稍等...' })
      const finalQuestionList = await getFinalQuestionList()
      const finalExam = this.clearUselessData(JSON.parse(JSON.stringify(this.questions)), finalQuestionList)
      const newID = Math.floor(Math.random() * 1000000)
      await addQuesionToFirebase(finalExam, newID)
      this.$q.loading.hide()
      this.$q.notify({
        type: 'positive',
        message: '新增成功！',
        position: 'top-right'
      })
      this.avoidDoubleClick = false
      this.resetVuexExam()
      this.$router.push('/old')
    },
    resetForm () {
      this.$bus.$emit('reset')
      this.resetQuestion()
    },
    getValidate (check) {
      if (check) this.validateCheck = true
    },
    clearUselessData (question, finalQuestionList) {
      question.questionList.forEach((ele, index) => {
        const titleImageName = finalQuestionList[index].questionTitleImage?.name
        titleImageName ? ele.questionTitleImage = [{ name: titleImageName }] : ele.questionTitleImage = null
        ele.options.forEach((item, itemIndex) => {
          const optionImageName = finalQuestionList[index].options[itemIndex]?.file?.name
          optionImageName ? item.file = [{ name: optionImageName }] : item.file = null
        })
      })
      return question
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './newForm.styl'
</style>
