<template>
  <div class="ranking">
    <h3 class="title">目前戰況</h3>
    <rank :rank="rankList"></rank>
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
    rankList: {
      type: Object
    }
  },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    next() {
      this.$bus.$emit('saveCurrentQuestionToVuex')
      this.$store.dispatch('changePage', {
        examID: this.id,
        studentPage: 'animation-transition',
        teacherPage: 'animation-transition'
      })
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
  background: url('../../../../assets/images/rankingBG.jpg');
  background-size: 100vw 100vh;
  background-repeat: repeat;
  position: relative;
  display: flex;
  flex-direction: column;
}
.title {
  text-align: center;
  font-weight: bold;
  font-size: 2.5em;
  margin: 0;
  padding-top: 20px;
}
.btn {
  text-align: center;
  box-sizing: border-box;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
