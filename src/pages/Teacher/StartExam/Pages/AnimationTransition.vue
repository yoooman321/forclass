<template>
  <div class="animation-transition">
        <div class="animate__animated animate__slideInRight">
          <div class="title ">Question {{ questionIndex }}</div>
          <div class="context"> {{ questionTitle }}</div>
        </div>
        <div v-if="showTitle" class="counted">{{counter}}</div>
  </div>
</template>
<script>
import { updateCurrentQuestion } from 'src/backend/index'
export default {
  data () {
    return {
      showTitle: false,
      counter: 3,
      timer: null,
      questionTitle: this.$store.state.currentQuestion.questionTitle
    }
  },
  props: ['id', 'questionIndex'],
  mounted () {
    setTimeout(() => {
      this.showTitle = true
      this.counting()
    }, 4000)
  },
  methods: {
    counting () {
      this.timer = setInterval(() => {
        this.counter--
      }, 1000)
    },
    changeState () {
      setTimeout(() => {
        updateCurrentQuestion(this.id, this.$store.state.currentQuestion)
        this.$store.dispatch('changePage', { examID: this.id, studentPage: 'answer', teacherPage: 'question' })
        // this.$store.commit('changeTeacherPage', 'question')
      }, 1000)
    }
  },
  watch: {
    counter (val) {
      if (val === 0) {
        clearInterval(this.timer)
        this.counter = 'GO!'
        this.changeState()
      }
    }
  }
}
</script>
<style scoped>
.animation-transition {
  height: 100vh;
  width: 100vw;
  background: url('../../../../assets/bg.png');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}
.title {
  text-align: center;
  padding-top: 5vh;
  font-size: 7vw;
  font-weight: bold;
}
.animate__animated.animate__slideInRight {
  animation-duration: 2s;
  animation-delay: 1s;
}
.context {
  text-align: center;
  font-size: 2rem;
  padding: 0 3vw;
  /* word-break:  */
}
.counted {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 5.5vw;
  left: 0;
  top: 40%;
  font-weight: bold;
  opacity: 0;
  animation: zoom 1s ease-in-out 4;
}
@keyframes zoom{
  0% {
    transform: scale(1.0);
    opacity: 0;
  }
  5% {
    transform: scale(1.0);
    opacity: 100%;
  }
  49% {
    transform: scale(1.0);
    opacity: 100%;
  }
  100% {
    transform: scale(4.0);
    opacity: 0;
  }
}
</style>
