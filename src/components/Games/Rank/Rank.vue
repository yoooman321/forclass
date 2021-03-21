<template>
  <div class="ranking-list">
      <div class="topTen">
        <div class="topTen-title">前十名榜單</div>
        <div class="member member-topTen" v-for="(tt, index) in topTenPlayers" :key="tt.playerName">
          <div class="rank-text">
            <div>
              <img class="crwonImg" v-if="index === 0" :src="GoldCrown" />
              <img class="crwonImg" v-if="index === 1" :src="SliverCrown" />
              <img class="crwonImg" v-if="index === 2" :src="BronzeCrown" />
              第{{ index+1 }} 名：
            </div>
          </div>
          <div> {{ tt.playerName }} </div>
        </div>
      </div>
      <div class="otherRank">
        <div class="member member-otherRank" v-for="(aa, index) in players" :key="aa.playerName+index">
          <div class="rank-text">
            <div>第 {{index + 11}} 名 :</div>
          </div>
          <div>{{aa.playerName}}</div>
        </div>
      </div>
    </div>
</template>
<script>
import GoldCrown from 'src/assets/goldCrown.png'
import SliverCrown from 'src/assets/SliverCrown.png'
import BronzeCrown from 'src/assets/bronzeCrown.png'
export default {
  props: {
    topTenPlayers: {
      type: Array,
      default: () => []
    },
    players: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      GoldCrown,
      SliverCrown,
      BronzeCrown
    }
  }
}
</script>
<style scoped>
.topTen {
  border-radius: 5px;
  padding: 20px 10px 10px;
  border: 2px dashed gray;
  font-size: 1.5em;
  display: inline-block;
  width: 20vw;
  height: 70vh;
}
.ranking-list {
  padding: 0 2%;
  height: 70vh;
  display: flex;
  /* align-items: flex-start; */
}
.member {
  display: flex;
  justify-content: space-around;
  /* position: relative; */
  margin-bottom: 2px;
  font-size: 1.5rem;
  /* min-height: 10%; */
}
.crwonImg {
  max-width: 40px;
  transform: rotate(325deg);
  -ms-transform: rotate(325deg);
  -moz-transform: rotate(325deg);
  -webkit-transform: rotate(325deg);
  -o-transform: rotate(325deg);
  position: absolute;
  left: -35px;
  top: -12px;
}
.rank-text {
  position: relative;
  height: 10%;
}
.otherRank {
  padding: 20px 10px 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  height: 70vh;
  width: 80vw;
}
.member-otherRank {
  /* margin-left: 20px; */
  max-width: 15vw;
}
.member-topTen {
  height: 8%;
}
.topTen-title {
  text-align: center;
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 2rem;
}
</style>
