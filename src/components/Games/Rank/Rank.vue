<template>
  <div class="rank">
    <div class="ranking-title">排行榜(答對題數)</div>
    <div class="rank-list">
      <template v-for="(number) in Object.keys(rank)">
        <div class="member" v-for="n in rank[number].length - 1" :key="n" :class="{'member-afterThree': number !== '1' && number !=='2' && number !== '3'}">
          <img class="crwonImg" v-if="number == '1'" :src="GoldCrown" />
          <img class="crwonImg" v-if="number == '2'" :src="SliverCrown" />
          <img class="crwonImg" v-if="number == '3'" :src="BronzeCrown" />
          第 {{ number }} 名： {{ rank[number][n] }} ({{ rank[number][0] }})
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import GoldCrown from 'src/assets/images/goldCrown.png'
import SliverCrown from 'src/assets/images/SliverCrown.png'
import BronzeCrown from 'src/assets/images/bronzeCrown.png'
export default {
  props: {
    rank: {
      type: Object
    }
  },
  data () {
    return {
      GoldCrown,
      SliverCrown,
      BronzeCrown
      // test: {
      //   1: ['2', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1'],
      //   2: ['3', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1', 'test1'],
      //   3: ['3', 'test1', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3', 'test3']
      // }
    }
  }
}
</script>
<style scoped>
.ranking-title {
  text-align: center;
  font-size: 1.5rem;
  color: red;
  font-weight: bold;
}
.crwonImg {
  max-width: 25px;
}
.rank{
  height: 60vh;
  padding: 0 20px
}
.rank-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 65vh;
}
.member {
  display: inline-block;
  font-size: 1rem;
}
.member-afterThree {
  padding-left: 28px;
}
</style>
