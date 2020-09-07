<template>
  <div>

    <!-- <audio autoplay loop :src="music" ref="au" muted> -->
      <!-- <source :src="music" type="audio/mpeg"> -->
    <!-- </audio> -->
    <div v-if="started" class="start">
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
  </div>
</template>
<script>
import Timer from '../../components/Games/Timer/Timer'
import QuestionPart from '../../components/Games/QuestionPart/QuestionPart'
import AnswersPart from '../../components/Games/AnswersPart/AnswersPart'
import Statistics from '../../components/Games/Statistics/Statistics'
import Rank from '../../components/Games/Rank/Rank'
import music from '../../assets/Tin_Spirit.mp3'
import Lobby from './Lobby'
export default {
  data () {
    return {
      bgColor: ['#FEEFE5', '#DDE7C7', '#FF8CC6', '#FEF9FF', '#C8EAD3', '#BAD7F2', '#FFA5AB', '#FFC857'],
      timeout: false,
      ranktime: false,
      music,
      id: this.$route.params.id,
      started: false,
      lobby: true
    }
  },
  components: {
    QuestionPart,
    Timer,
    AnswersPart,
    Statistics,
    Rank,
    Lobby
  },
  methods: {
    randomBGColor () {
      console.log('ttt')
      return Math.floor(Math.random() * Math.floor(this.bgColor.length))
    },
    // handleCanplay () {
    //   this.$nextTick(() => {
    //     this.$refs.au.play()
    //   })
    // }
    play () {
      this.lobby = false
      this.started = true
      const myAudio = new Audio(this.music)
      myAudio.play()
    }
  },
  mounted () {
    // console.log('mm', this.music)
    // const myAudio = new Audio(this.music)
    // myAudio.play()
    // this.handleCanplay()
    const self = this
    setTimeout(() => {
      self.timeout = true
    }, 2000)
    setTimeout(() => {
      this.ranktime = true
    }, 1000)
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
