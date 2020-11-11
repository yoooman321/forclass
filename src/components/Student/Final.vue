<template>
  <div class="final-result">
    <div class="title">結束出爐</div>
    <div class="content">您的分數： {{ score }}</div>
    <div class="content">您的名次： {{ rank }}</div>
    <img :src="rankImage" />
  </div>
</template>
<script>
import rankOne from 'src/assets/rankOne.png'
import rankTwo from 'src/assets/rankTwo.png'
import rankThree from 'src/assets/rankThree.png'
import rankOthers from 'src/assets/rankOthers.png'
import { db } from 'src/boot/serverConnection'
export default {
  data () {
    return {
      score: 100,
      rank: 3,
      rankOne,
      rankTwo,
      rankThree,
      rankOthers,
      rankImage: ''
    }
  },
  mounted () {
    switch (this.rank) {
      case 1:
        this.rankImage = this.rankOne
        break
      case 2:
        this.rankImage = this.rankTwo
        break
      case 3:
        this.rankImage = this.rankThree
        break
      default:
        this.rankImage = this.rankOthers
        break
    }
    this.deletePlayerInfo()
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
.final-result {
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
}
.title {
  font-size: 2rem;
  padding-top: 2vh;
  -webkit-text-fill-color: white;
  -webkit-text-stroke: 1px black;
  /* color: #FED766; */
}
.content {
  padding-top:5vh;
}
img {
  margin-top: 5vh;
  max-height: 30vh;
  width: auto;
}
</style>
