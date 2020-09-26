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
export default {
  data () {
    return {
      score: 100,
      rank: 4,
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
  }
}
</script>
<style scoped>
.final-result {
  padding-top: 10vh;
  background-color: #009FB7;
  height: calc(100vh - 100px);
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
}
.title {
  font-size: 2rem;
  -webkit-text-fill-color: white;
  -webkit-text-stroke: 1px black;
  /* color: #FED766; */
}
.content {
  margin-top:5vh;
}
img {
  margin-top: 5vh;
  max-height: 30vh;
  width: auto;
}
</style>
