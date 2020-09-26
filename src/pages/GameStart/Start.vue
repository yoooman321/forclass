<template>
  <div>

    <!-- <audio autoplay loop :src="music" ref="au" muted> -->
      <!-- <source :src="music" type="audio/mpeg"> -->
    <!-- </audio> -->
    <div class="start" v-if="started">
      <question-part></question-part>
      <timer class="timer"></timer>
      <answers-part></answers-part>
      <transition name="slide">
        <statistics class="statistics" v-if="timeout"></statistics>
      </transition>
      <transition name="slide">
        <rank v-if="ranktime" class="rank"></rank>
      </transition>
    </div>
    <lobby v-if="lobby" :id="id" @playAudio = "play"></lobby>
    <animation-transition v-if="transitions"></animation-transition>
  </div>
</template>
<script>
import Timer from '../../components/Games/Timer/Timer'
import QuestionPart from '../../components/Games/QuestionPart/QuestionPart'
import AnswersPart from '../../components/Games/AnswersPart/AnswersPart'
import Statistics from '../../components/Games/Statistics/Statistics'
import Rank from '../../components/Games/Rank/Rank'
import music from '../../assets/Tin_Spirit.mp3'
import counted from '../../assets/counted.mp3'
import Lobby from './Lobby'
import AnimationTransition from './AnimationTransition'
export default {
  data () {
    return {
      bgColor: ['#FEEFE5', '#DDE7C7', '#FF8CC6', '#FEF9FF', '#C8EAD3', '#BAD7F2', '#FFA5AB', '#FFC857'],
      timeout: false,
      ranktime: false,
      music,
      id: this.$route.params.id,
      started: false,
      lobby: false,
      transitions: true,
      counted,
      backGroundSound: new Audio(music)
    }
  },
  components: {
    QuestionPart,
    Timer,
    AnswersPart,
    Statistics,
    Rank,
    Lobby,
    AnimationTransition
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
    }
  },
  mounted () {
    const self = this
    setTimeout(() => {
      self.timeout = true
    }, 2000)
    setTimeout(() => {
      this.ranktime = true
    }, 1000)
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
</style>
