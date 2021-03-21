<template>
  <div class="ranking">
    <h3 class="title">目前戰況</h3>
      <rank :topTenPlayers="topTenPlayers" :test="players"></rank>
    <div class="btn">
       <q-btn color="primary" label="下一題" size="xl" @click="next"></q-btn>
    </div>
  </div>
</template>
<script>
import Rank from 'src/components/Games/Rank/Rank'
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
      id: this.$route.params.id,
      topTenPlayers: []
    }
  },
  computed: {
    players () {
      return this.playerInfo
    }
  },
  created () {
    this.orderPlayerByScore()
    this.spiceTopTenPlayers()
  },
  methods: {
    orderPlayerByScore () {
      this.players.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0))
    },
    next () {
      this.$bus.$emit('saveCurrentQuestionToVuex')
      this.$store.dispatch('changePage', { examID: this.id, studentPage: 'animation-transition', teacherPage: 'animation-transition' })
    },
    spiceTopTenPlayers () {
      this.topTenPlayers = this.players.length > 10 ? this.players.splice(0, 10) : this.players.splice(0, this.players.length)
    }
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
  background: url('../../../../assets/rankingBG.jpg');
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
