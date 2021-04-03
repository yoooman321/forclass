<template>
  <div class="ranking">
    <h3 class="title">最終結果</h3>
    <rank :rank="rankList"></rank>
  </div>
</template>
<script>
import Rank from 'src/components/Games/Rank/Rank'
import { deleteCurrentExam, deleteQuestion } from 'src/backend/index'
export default {
  props: {
    rankList: {
      type: Object
    }
  },
  data () {
    return {
      id: this.$route.params.id
    }
  },
  created () {
    deleteCurrentExam(this.id)
    deleteQuestion(this.id)
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
