<template>
  <div class="ranking" :class="{'no-rank': rankDisabledFlag}">
    <div v-if="!rankDisabledFlag" class="need-rank-list">
      <h3 class="title">最終結果</h3>
      <rank :rank="rankList"></rank>
    </div>
    <div v-else class="no-need-rank-list">
      <img :src="thankImg" class="thanks-image">
    </div>
  </div>
</template>
<script>
import Rank from 'src/components/Games/Rank/Rank'
import { deleteCurrentExam, deleteQuestion, deleteRankList, deleteWhichPage } from 'src/backend/index'
import Thank from 'src/assets/images/thank_you.png'
export default {
  props: {
    rankList: {
      type: Object
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      rankDisabledFlag: this.$store.state.currentExam.rankDisabledFlag,
      thankImg: Thank
    }
  },
  created () {
    deleteCurrentExam(this.id)
    deleteQuestion(this.id)
    deleteRankList(this.id)
    deleteWhichPage(this.id)
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
  background-image: url('../../../../assets/images/rankingBG.jpg');
  background-size: 100vw 100vh;
  background-repeat: repeat;
  position: relative;
  overflow: hidden;
}
.no-rank {
  background-image: url('../../../../assets/images/no_rank_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
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
.thanks-image {
  width: 40vw;
}
.no-need-rank-list {
  text-align: center;
  padding-top: 10vh;
}
</style>
