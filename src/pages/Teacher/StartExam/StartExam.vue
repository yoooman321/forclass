<template>
  <div>
    <component :is="whichPage" :id="id" :questionIndex="questionIndex" :playerInfo="playerInfo" :rankList="rankList"></component>
  </div>
</template>
<script>
import Lobby from './Pages/Lobby'
import AnimationTransition from './Pages/AnimationTransition'
import Question from './Pages/Question'
import GameFinish from './Pages/GameFinish'
import Ranking from './Pages/Ranking'
import { getCurrentExamData, setCurrentQuestion, getPlayerInfo, alignRankList } from 'src/backend/index'
import { db } from 'src/boot/serverConnection'
import { mapMutations } from 'vuex'
import { deleteCurrentExam, deleteQuestion, deleteRankList } from 'src/backend/index.js'
export default {
  components: {
    Lobby,
    AnimationTransition,
    Question,
    GameFinish,
    Ranking
  },
  data () {
    return {
      id: this.$route.params.id,
      examData: {},
      questionIndex: 0,
      titleImageUrl: '',
      playerInfo: [],
      previosIndex: -1,
      rankList: {}
    }
  },
  computed: {
    whichPage () {
      return this.$store.state.teatcherPage
    }
  },
  mounted () {
    // this.watchPlayerAnswer()
    this.$bus.$on('saveCurrentQuestionToVuex', () => {
      this.saveCurrentQuestionToVuex()
    })
  },
  created () {
    this.setCurrentExamToVuex()
    setCurrentQuestion(this.id, {})
    window.addEventListener('beforeunload', this.deleteFireBase)
  },
  watch: {
    '$store.state.timesOut' () {
      const timeOut = this.$store.state.timesOut
      if (timeOut) {
        this.getPlayerInfo()
      }
    }
  },
  methods: {
    ...mapMutations(['saveCurrentExam', 'savecurrentQuestion']),
    async setCurrentExamToVuex () {
      this.examData = await getCurrentExamData(this.id)
      this.saveCurrentExam(this.examData)
    },
    async saveCurrentQuestionToVuex () {
      if (this.questionIndex < this.examData.questionList.length) {
        this.savecurrentQuestion(this.questionIndex)
        // if (this.$store.state.currentQuestion.questionTitleImage) {
        //   this.titleImageUrl = await getImageUrl('questions', this.$store.state.currentQuestion.questionTitleImage)
        //   this.$store.commit('updateTitleImage', this.titleImageUrl)
        // }
        this.previosIndex = this.questionIndex
        // this.watchPlayerAnswer()
        console.log('play: ', this.playerInfo)
        this.playerInfo = []
        this.questionIndex++
        return
      }
      this.$store.dispatch('changePage', { examID: this.id, studentPage: 'final', teacherPage: 'game-finish' })
    },
    async getPlayerInfo () {
      this.playerInfo = await getPlayerInfo()
      this.rankList = await alignRankList(this.playerInfo, this.id)
    },
    watchPlayerAnswer () {
      // const playerInfo = []
      const player = db.collection('player')
      player.where('questionIndex', '==', this.questionIndex).orderBy('answerTime').onSnapshot((ele) => {
        ele.forEach(data => {
        })
      // if (!this.playerlist.includes(data.data().playerName)) this.playerlist.push(data.data().playerName)
      })
      // player.orderBy('answerTime', 'asc').onSnapshot(res => {
      //   res.forEach(data => {
      //     if (!this.playerInfo.includes(data.data().playerName)) this.playerInfo.push(data.data())
      //     console.log('ele: ', data.data())
      //   })
      // })
    },
    deleteFireBase () {
      deleteCurrentExam(this.id)
      deleteQuestion(this.id)
      deleteRankList(this.id)
    },
    unsubscribe () {
      // const playerRef = db.collection('player')
      // playerRef.where('questionIndex', '==', this.previosIndex).orderBy('answerTime', 'asc').onSnapshot(res => {
      // console.log('noo: ', this.previosIndex)
      // })
    }
  }
}
</script>
