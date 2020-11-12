<template>
  <div>
    <game-info :id="id"></game-info>
    <play-list></play-list>
    <q-btn class="btn" size="lg" color="deep-purple-10" @click="play">start it</q-btn>
  </div>
</template>
<script>
import GameInfo from 'src/components/Lobby/GameInfo'
import PlayList from 'src/components/Lobby/PlayList'
// import { getCurrentExamData } from 'src/backend/index'
// import { mapMutations } from 'vuex'
export default {
  props: ['id'],
  components: {
    GameInfo,
    PlayList
  },
  methods: {
    play () {
      // this.$store.dispatch('changecurrentQuestiont')
      this.$bus.$emit('saveCurrentQuestionToVuex')
      this.$store.dispatch('changePage', { examID: this.id, studentPage: 'animation-transition', teacherPage: 'animation-transition' })
      // this.$store.commit('changeTeacherPage', 'animation-transition')
    }
  }
}
</script>
<style scoped>
.btn {
  position: absolute;
  top: 14vh;
  right: 2vw;
}
</style>
