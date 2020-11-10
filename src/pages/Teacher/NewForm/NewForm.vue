<template>
    <div class="new">
      <div class="testName">
        <q-input
          ref="examName"
          outlined
          v-model="examName"
          label="考題名稱："
          :rules="[val => val || '請輸入考題名稱']"
        ></q-input>
      </div>
      <div v-for="(question, index) in questions.questionList" :key="'aa'+index">
        <question-set @getValidate="getValidate" :index="index" :question="question"></question-set>
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
    ...mapMutations(['addQuestion', 'changeExamName', 'resetQuestion']),
    saveForm () {
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
      // add firebase api
      this.avoidDoubleClick = false
    },
    resetForm () {
      this.$bus.$emit('reset')
      this.resetQuestion()
    },
    getValidate (check) {
      if (check) this.validateCheck = true
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import './newForm.styl'
</style>
