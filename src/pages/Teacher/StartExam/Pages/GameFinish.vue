<template>
  <div class="ranking">
    <h3 class="title">最終結果</h3>
    <rank :topTenPlayers="topTenPlayers" :test="players"></rank>
  </div>
</template>
<script>
import Rank from 'src/components/Games/Rank/Rank'
import { deleteCurrentExam, deleteQuestion } from 'src/backend/index'
export default {
  props: {
    playerInfo: {
      type: Array
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      topTenPlayers: []
    }
  },
  methods: {
    orderPlayerByScore () {
      this.players.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0))
    },
    spiceTopTenPlayers () {
      this.topTenPlayers = this.players.length > 10 ? this.players.splice(0, 10) : this.players.splice(0, this.players.length)
    }
  },
  computed: {
    players () {
      return this.playerInfo
    }
  },
  created () {
    deleteCurrentExam(this.id)
    deleteQuestion(this.id)
    this.orderPlayerByScore()
    this.spiceTopTenPlayers()
  },
  components: {
    Rank
  }
}
</script>
<style scoped>
.ranking {
  height: 100vh;
  width: 100vw;
  background: url('../../../../assets/images/rankingBG.jpg');
  background-size: 100vw 100vh;
  background-repeat: repeat;
  position: relative;
  overflow: hidden;
}
.title {
  text-align: center;
  font-weight: bold;
  font-size: 2.5em;
  height: 5vh;
}
.btn {
  margin-top: 2vh;
  text-align: center;
  height: 5vh;
  box-sizing: border-box;
}
</style>
