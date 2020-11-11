<template>
  <div>
    <!-- <audio autoplay loop :src="music" ref="au" muted> -->
      <!-- <source :src="music" type="audio/mpeg"> -->
    <!-- </audio> -->
      <question-part :title="currentQuestion.questionTitle"></question-part>
      <timer class="timer" :time="currentQuestion.settings.limitedTime"></timer>
      <answers-part :options="currentQuestion.options"></answers-part>
      <transition name="slide">
        <statistics class="statistics" v-if="timeOut"></statistics>
      </transition>
      <div class="button">
        <q-btn v-if="timeOut" color="secondary" label="目前戰況" size="xl" @click="next"></q-btn>
     </div>
      <!-- <transition name="slide">
        <rank v-if="ranktime" class="rank"></rank>
      </transition> -->
  </div>
</template>
<script>
import Timer from 'src/components/Games/Timer/Timer'
import QuestionPart from 'src/components/Games/QuestionPart/QuestionPart'
import AnswersPart from 'src/components/Games/AnswersPart/AnswersPart'
import Statistics from 'src/components/Games/Statistics/Statistics'
// import Rank from 'src/components/Games/Rank/Rank'
import music from 'src/assets/Tin_Spirit.mp3'
import counted from 'src/assets/counted.mp3'
// import Lobby from './Lobby'
// import AnimationTransition from './AnimationTransition'
export default {
  props: ['questionIndex'],
  data () {
    return {
      bgColor: ['#FEEFE5', '#DDE7C7', '#FF8CC6', '#FEF9FF', '#C8EAD3', '#BAD7F2', '#FFA5AB', '#FFC857'],
      ranktime: false,
      music,
      id: this.$route.params.id,
      started: false,
      lobby: false,
      transitions: true,
      counted,
      backGroundSound: new Audio(music),
      currentQuestion: this.$store.state.currentQuestion
    }
  },
  computed: {
    timeOut () {
      return this.$store.state.timesOut
    }
  },
  components: {
    QuestionPart,
    Timer,
    AnswersPart,
    Statistics
    // Rank
    // Lobby,
    // AnimationTransition
  },
  methods: {
    randomBGColor () {
      console.log('ttt')
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
      if (this.questionIndex < this.$store.state.currentExam.questionList.length) {
        this.$store.commit('changeTeacherPage', 'ranking')
      } else {
        this.$bus.$emit('saveCurrentQuestionToVuex')
      }
      // this.$bus.$emit('playBackgroundMusic')
    }
  },
  mounted () {
    this.imgUrl = this.titleImageUrl
    console.log('props: ', this.titleImageUrl)
  },
  created () {
    this.$bus.$on('playCountedSound', () => {
      setTimeout(() => {
        const myAudio = new Audio(this.counted)
        myAudio.play()
        this.stopPlay()
      }, 3200)
    })
    this.$bus.$on('playBackgroundMusic', () => {
      this.started = false
      this.lobby = false
      this.transitions = true
      // setTimeout(() => {
      //   this.transitions = false
      //   this.started = true
      // }, 3000)
      // this.backGroundSound.play()
    })
    this.$bus.$on('changeState', () => {
      this.started = true
      this.transitions = false
    })
  },
  beforeDestroy () {
    this.$bus.$off('playCountedSound')
    this.$bus.$off('playBackgroundMusic')
  }
}
</script>
<style scoped>
.start {
  height: 100vh;
  background-color: #FFFDFD;
}
.timer {
  position: absolute;
  right: 5vw;
  top: 5vh;
}
.statistics {
  position: absolute;
  z-index: 3;
  top: 10vh;
  left: 20vw;
}
.rank {
  position: absolute;
  top: 12vh;
  left: 2vw;
}
.slide-enter {
  /* transform: translateY(20px); */
  opacity: 0;
}
.slide-enter-active {
  /* transition: opacity 1s; */
  transition: opacity 1s;
  animation: slide-in 1.5s ease-out forwards;
}
@keyframes slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
.button {
  position: absolute;
  top: 25vh;
  right: 3vw;
}
</style>
