<template>
  <div>
    <div class="answerSelection">
      <div
        v-for="(option, index) in currentQuestion.options"
        :key="index"
        :style="{backgroundColor: answerOptions[index].bgColor}"
        class="answers"
        @click="chooseAnswer(index)"
      >
        <div>{{ answerOptions[index].number }}</div>
        <q-icon v-if="myAnswer.includes(index)" class="material-icons text-black done" style="font-size: 5rem;">
          done
        </q-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { sendAnswer } from 'src/backend/index'
export default {
  props: {
    waitForTimeOut: {
      type: Boolean,
      default: false
    },
    currentQuestion: {
      type: Object
    },
    myScore: {
      type: Number
    }
  },
  data () {
    return {
      answerOptions: this.$store.state.optionListSetting,
      myAnswer: [],
      corret: true,
      score: 0,
      playerID: localStorage.getItem('playerID'),
      studentQuestionIndex: this.$store.state.studentQuestionIndex
    }
  },
  methods: {
    chooseAnswer (index) {
      const elements = document.getElementsByClassName('answers')
      if (this.currentQuestion.answerType === '單選' || this.currentQuestion.answerType === '是非') {
        if (this.myAnswer.length < 1) {
          this.myAnswer.push(index)
          elements[index].style.border = '3px outset #805B0C'
          elements[index].style.opacity = '0.7'
          this.$emit('setAnswerButtonDisabled')
          return
        }
        const notAnswer = elements[this.myAnswer[0]]
        notAnswer.style.border = 'none'
        notAnswer.style.opacity = '1'
        elements[index].style.border = '3px outset #805B0C'
        elements[index].style.opacity = '0.7'
        this.myAnswer.splice(0, 1)
        this.myAnswer.push(index)
        this.$emit('setAnswerButtonDisabled')
        return
      }
      if (!this.myAnswer.includes(index)) {
        elements[index].style.border = '3px outset #805B0C'
        elements[index].style.opacity = '0.7'
        this.myAnswer.push(index)
        this.$emit('setAnswerButtonDisabled')
        return
      }
      elements[index].style.border = 'none'
      elements[index].style.opacity = '1'
      const findIndex = this.myAnswer.indexOf(index)
      this.myAnswer.splice(findIndex, 1)
      this.$emit('setAnswerButtonDisabled')
    },
    getResult () {
      this.myAnswer.forEach(ele => {
        if (!this.currentQuestion.options[ele].isAnswer) this.corret = false
      })
      const option = this.currentQuestion.options.filter((item, index) => {
        return !this.myAnswer.includes(index)
      })
      const checkUnchooseAnswer = option.some(item => item.isAnswer)
      if (checkUnchooseAnswer) this.corret = false
      this.corret ? this.score = 1 : this.score = 0
      const finalScore = this.myScore + this.score
      const answerTime = new Date().getTime()
      sendAnswer(this.playerID, this.myAnswer, finalScore, answerTime, this.studentQuestionIndex)
      this.$store.commit('addStudentQuestionIndex')
      this.$emit('getResult', this.score, this.corret)
    }
  },
  watch: {
    waitForTimeOut () {
      this.$q.loading.show({
        message: '等待解答...'
      })
      this.getResult()
    }
  }
}
</script>
<style scoped>
.answerSelection {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 100px);
}
.answers {
  width: 50vw;
  position: relative;
  text-align: center;
  font-size: 2rem;
}
.not-choose-answer {
  opacity: 0.3;
}
.done {
  position: absolute;
  top: 5vh;
  left: 15vw;
}
.loading {
  height: calc(100vh - 100px);
  position: fixed;
  top: 50px;
  width: 100vw;
  background-color: white;
  opacity: .6;
}
.loading > img {
  /* height: 50%; */
  padding-top: 15vh;
  width: 100%;
}
</style>
<style>
.q-toolbar {
  height: 50px;
}
</style>
