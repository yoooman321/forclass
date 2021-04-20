<template>
  <div class="question">
    <div class="top">
      <question-part :title="currentQuestion.questionTitle"></question-part>
    </div>
    <div class="middle" :class="{'short-answer-type': isShortAnswer}">
      <player-answer-list class="middle__playerList" v-if="!isShortAnswer"></player-answer-list>
      <img class="middle__img" :src="currentQuestion.imageUrl" v-if="currentQuestion.imageUrl">
      <div class="middle-left">
        <timer class="timer" :time="currentQuestion.settings.limitedTime"></timer>
        <div class="button">
          <q-btn v-if="staticFlag" color="secondary" :label="!isShortAnswer ? '目前戰況' : '下一題'" size="xl" @click="next" :class="{'short-answer-btn': !isShortAnswer}"></q-btn>
        </div>
      </div>
    </div>
    <div class="bottom">
      <answers-part :options="currentQuestion.options" v-if="!isShortAnswer"></answers-part>
    </div>
    <div class="word-cloud">
      <word-cloud v-if="isShortAnswer"></word-cloud>
    </div>
    <transition name="slide">
      <statistics class="statistics" v-if="staticFlag && !isShortAnswer" :playerInfo="playerInfo" :optionAmount="currentQuestion.options.length"></statistics>
    </transition>
  </div>
</template>
<script>
import Timer from 'src/components/Games/Timer/Timer'
import QuestionPart from 'src/components/Games/QuestionPart/QuestionPart'
import AnswersPart from 'src/components/Games/AnswersPart/AnswersPart'
import Statistics from 'src/components/Games/Statistics/Statistics'
import PlayerAnswerList from 'src/components/Games/Rank/PlayerAnswerList'
import WordCloud from 'src/components/Games/AnswersPart/WordCloud'
import music from 'src/assets/music/crrect_answer3.mp3'
export default {
  props: {
    questionIndex: {
      type: Number
    },
    playerInfo: {
      type: Array
    }
  },
  data () {
    return {
      bgColor: ['#FEEFE5', '#DDE7C7', '#FF8CC6', '#FEF9FF', '#C8EAD3', '#BAD7F2', '#FFA5AB', '#FFC857'],
      ranktime: false,
      id: this.$route.params.id,
      started: false,
      lobby: false,
      transitions: true,
      currentQuestion: this.$store.state.currentQuestion,
      music,
      isShortAnswer: undefined
    }
  },
  computed: {
    timeOut () {
      return this.$store.state.timesOut
    },
    staticFlag () {
      return this.$store.state.showStatic
    }
  },
  watch: {
    timeOut () {
      if (this.timeOut && !this.isShortAnswer) this.$store.dispatch('changePage', { examID: this.id, studentPage: 'ranking', teacherPage: 'question' })
      else this.$store.dispatch('changePage', { examID: this.id, studentPage: 'times-up', teacherPage: 'question' })
    },
    staticFlag () {
      if (this.staticFlag) {
        const audio = new Audio(this.music)
        audio.play()
      }
    }
  },
  components: {
    QuestionPart,
    Timer,
    AnswersPart,
    Statistics,
    PlayerAnswerList,
    WordCloud
    // Rank
  },
  methods: {
    randomBGColor () {
      return Math.floor(Math.random() * Math.floor(this.bgColor.length))
    },
    play () {
      this.lobby = false
      this.started = true
    },
    stopPlay () {
      setTimeout(() => {
        this.backGroundSound.pause()
      }, 4000)
    },
    next () {
      this.$store.dispatch('changeTimeOutFlag', false)
      this.$store.commit('cleanPlayerAnswerList')
      const isNotFinal = this.questionIndex < this.$store.state.currentExam.questionList.length
      if (this.isShortAnswer && isNotFinal) {
        this.$bus.$emit('saveCurrentQuestionToVuex')
        this.$store.dispatch('changePage', { examID: this.id, studentPage: 'animation-transition', teacherPage: 'animation-transition' })
      } else if (isNotFinal) {
        this.$store.dispatch('changePage', { examID: this.id, studentPage: 'ranking', teacherPage: 'ranking' })
      } else {
        this.$bus.$emit('saveCurrentQuestionToVuex')
      }
      // this.$bus.$emit('playBackgroundMusic')
    }
  },
  created () {
    this.isShortAnswer = this.currentQuestion.answerType === '問答'
  }
}
</script>
<style scoped>
.top {
  height: 25vh;
  text-align: center;
  margin: 0 2vw;
}
.middle {
  height: 30vh;
  display: flex;
  width: 98vw;
  justify-content: space-between;
  padding: 0 0 1vh;
  margin: 0 1vw;
  align-items: center;
}
.short-answer-type {
  justify-content: flex-end;
}
.middle-left {
  max-width: 20vw;
}
.middle__playerList {
  width: 30%;
  height: 100%;
}
.middle__img {
  width: auto;
  max-width: 40%;
  height: 100%;
}
.statistics {
  position: absolute;
  z-index: 3;
  top: 15vh;
  left: 20vw;
}
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  transition: opacity 1s;
  animation: slide-in 1.5s ease-out forwards;
}
.word-cloud {
  position: absolute;
  top: 26vh;
}
@keyframes slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
