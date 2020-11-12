<template>
  <div>
    <component :is="whichPage" :id="id" :questionIndex="questionIndex" :playerInfo="playerInfo"></component>
  </div>
</template>
<script>
import Lobby from './Pages/Lobby'
import AnimationTransition from './Pages/AnimationTransition'
import Question from './Pages/Question'
import GameFinish from './Pages/GameFinish'
import Ranking from './Pages/Ranking'
import { getCurrentExamData, setCurrentQuestion, getImageUrl, getPlayerInfo } from 'src/backend/index'
import { mapMutations } from 'vuex'
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
      playerInfo: []
    }
  },
  computed: {
    whichPage () {
      return this.$store.state.teatcherPage
    }
  },
  mounted () {
    this.setCurrentExamToVuex()
    setCurrentQuestion(this.id, {})
    this.$bus.$on('saveCurrentQuestionToVuex', () => {
      this.saveCurrentQuestionToVuex()
    })
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
        if (this.$store.state.currentQuestion.questionTitleImage) {
          this.titleImageUrl = await getImageUrl('questions', this.$store.state.currentQuestion.questionTitleImage)
          this.$store.commit('updateTitleImage', this.titleImageUrl)
        }
        this.questionIndex++
        return
      }
      this.$store.dispatch('changePage', { examID: this.id, studentPage: 'final', teacherPage: 'game-finish' })
    },
    async getPlayerInfo () {
      this.playerInfo = await getPlayerInfo()
    }
  }
}
</script>
