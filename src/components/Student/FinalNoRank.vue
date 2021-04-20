<template>
  <div class="no-rank-list">
    <img :src="thankImg" class="thanks-image">
  </div>
</template>
<script>
import { db } from 'src/boot/serverConnection'
import Thank from 'src/assets/images/thank_you.png'
export default {
  data () {
    return {
      thankImg: Thank
    }
  },
  created () {
    this.deletePlayerInfo()
    this.$store.commit('changestudentHeaderTitle', '結束遊戲')
  },
  methods: {
    deletePlayerInfo () {
      const playerID = localStorage.getItem('playerID')
      db.collection('player').doc(String(playerID)).delete()
      localStorage.removeItem('playerID')
    }
  }
}
</script>
<style scoped>
.no-rank-list {
  text-align: center;
  padding-top: 10vh;
}
.thanks-image {
  width: 70vw;
}
</style>
