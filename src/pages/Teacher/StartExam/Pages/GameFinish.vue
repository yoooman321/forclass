<template>
  <div class="ranking">
    <h3 class="title">最終結果</h3>
    <rank></rank>
    <div class="btn">
       <q-btn color="primary" label="結束" size="xl" @click="next"></q-btn>
    </div>
  </div>
</template>
<script>
import Rank from 'src/components/Games/Rank/Rank'
import { deleteExam, deleteQuestion } from 'src/backend/index'
export default {
  props: ['questionIndex', 'id'],
  methods: {
    next () {
      deleteExam(this.id)
      deleteQuestion(this.id)
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
}
.btn {
  margin-top: 2vh;
  text-align: center;
}
</style>
